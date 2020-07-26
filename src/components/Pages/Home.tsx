import * as React from 'react'
import * as styles from './Home.scss'
import { Store } from '../../Store'
import { TrackerForm } from '../TrackerForm/TrackerForm'
import { TrackerHistory } from '../TrackerHistory/TrackerHistory'
import * as DateUtil from '../../utils/DateUtil'
import * as StringUtil from '../../utils/StringUtil'

type Props = {
  startCount: (name: string) => void
  restartCount: (name: string) => void
  pauseCount: (name: string) => void
  trackers: Tracker[]
  inprogress: boolean
  currentCount: number
}

type ContainerProps = {
  todaysTrackers: Tracker[]
  store: Store
  today: string
}

const Component: React.FC<Props> = ({
  startCount,
  restartCount,
  pauseCount,
  trackers,
  inprogress,
  currentCount,
}) => (
  <div className={styles.home}>
    <TrackerForm inprogress={inprogress} startCount={startCount} />
    <TrackerHistory
      trackers={trackers}
      restartCount={restartCount}
      pauseCount={pauseCount}
      inprogress={inprogress}
      currentCount={currentCount}
    />
  </div>
)

export const Home: React.FC<ContainerProps> = ({ todaysTrackers, store, today }) => {
  const [trackers, setTrackers] = React.useState(todaysTrackers)
  const [currentCount, setCurrentCount] = React.useState(0)
  const [timerId, setTimerId] = React.useState(0)

  const inprogress = React.useMemo(() => trackers.some((tracker) => tracker.inProgress), [trackers])

  const calculateCurrentCount = (startTime: Date) => {
    const id = window.setInterval(() => {
      setCurrentCount(DateUtil.getTimeFromNow(startTime, 'minute', true))
    }, 1000 * 60)
    setTimerId(id)
  }

  const restartCount = (name: string) => {
    if (inprogress) {
      return
    }

    const currentDate = DateUtil.getCurrentDate()
    const targetTracker = trackers.filter((tracker) => tracker.name === name)[0]
    const newTrackers = trackers.map((tracker) =>
      tracker.name === name
        ? {
            ...targetTracker,
            inProgress: true,
            timers: [...targetTracker.timers, { start: currentDate }],
          }
        : tracker
    )

    setTrackers(newTrackers)
    store.save(today, newTrackers)
    calculateCurrentCount(currentDate)
  }

  const startCount = (trackerName: string) => {
    const registerdTracker = trackers.filter((tracker) => tracker.name === trackerName)
    if (registerdTracker.length > 0) {
      restartCount(registerdTracker[0].name)
      return
    }

    const currentDate = DateUtil.getCurrentDate()
    const currentTracker: Tracker = {
      id: StringUtil.generateTrackerId(),
      name: trackerName,
      inProgress: true,
      day: today,
      timers: [
        {
          start: currentDate,
        },
      ],
    }

    const newTrackers = [...trackers, currentTracker]
    setTrackers(newTrackers)
    store.save(today, newTrackers)
    calculateCurrentCount(currentDate)
  }

  const pauseCount = (name: string) => {
    const targetTrackers = trackers.filter((tracker) => tracker.name === name)

    if (targetTrackers.length !== 1) {
      return
    }

    const targetTracker = targetTrackers[0]

    if (!targetTracker.inProgress) {
      return
    }

    const countingTimer = targetTracker.timers.filter((timer) => !timer.end)

    if (countingTimer.length !== 1) {
      return
    }

    const newTimer = {
      start: countingTimer[0].start,
      end: DateUtil.getCurrentDate(),
      minute: DateUtil.getTimeFromNow(countingTimer[0].start, 'minute', true),
    }

    const timers = targetTracker.timers.map((timer) =>
      timer.start === newTimer.start ? newTimer : timer
    )

    const currentTracker = {
      ...targetTracker,
      inProgress: false,
      timers,
    }

    const newTrackers = trackers.map((tracker) =>
      tracker.name === name ? currentTracker : tracker
    )
    setTrackers(newTrackers)
    store.save(today, newTrackers)
    clearInterval(timerId)
  }

  return (
    <Component
      startCount={startCount}
      restartCount={restartCount}
      pauseCount={pauseCount}
      trackers={trackers}
      inprogress={inprogress}
      currentCount={currentCount}
    />
  )
}
