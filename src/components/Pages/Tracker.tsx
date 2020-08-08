import * as React from 'react'
import * as styles from './Tracker.scss'
import { Store } from '../../Store'
import { TrackerForm } from '../TrackerForm/TrackerForm'
import { TrackerList } from '../TrackerList/TrackerList'
import * as DateUtil from '../../utils/DateUtil'
import * as StringUtil from '../../utils/StringUtil'

type Props = {
  startCount: (trackerName: string) => void
  restartCount: (trackerId: string) => void
  pauseCount: (trackerId: string) => void
  updateTrackerName: (trackerId: string, trackerName: string) => void
  trackers: Tracker[]
  inProgress: boolean
  currentCount: number
  today: string
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
  updateTrackerName,
  trackers,
  inProgress,
  currentCount,
  today,
}) => (
  <div className={styles.home}>
    <TrackerForm inProgress={inProgress} startCount={startCount} />
    <TrackerList
      trackers={trackers}
      restartCount={restartCount}
      pauseCount={pauseCount}
      inProgress={inProgress}
      currentCount={currentCount}
      today={today}
      updateTrackerName={updateTrackerName}
    />
  </div>
)

export const Tracker: React.FC<ContainerProps> = ({ todaysTrackers, store, today }) => {
  const [trackers, setTrackers] = React.useState(todaysTrackers)
  const [currentCount, setCurrentCount] = React.useState(0)
  const [timerId, setTimerId] = React.useState(0)

  const inProgress = React.useMemo(() => trackers.some((tracker) => tracker.inProgress), [trackers])

  const calculateCurrentCount = (startTime: Date) => {
    setCurrentCount(DateUtil.getTimeFromNow(startTime, 'minute', true))
    const id = window.setInterval(() => {
      setCurrentCount(DateUtil.getTimeFromNow(startTime, 'minute', true))
    }, 1000 * 60)
    setTimerId(id)
  }

  const restartCount = (trackerId: string) => {
    if (inProgress) {
      return
    }

    const currentDate = DateUtil.getCurrentDate()
    const targetTracker = trackers.filter((tracker) => tracker.id === trackerId)[0]
    const newTrackers = trackers.map((tracker) =>
      tracker.id === trackerId
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
    const registeredTracker = trackers.filter((tracker) => tracker.name === trackerName)
    if (registeredTracker.length > 0) {
      restartCount(registeredTracker[0].name)
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

  const pauseCount = (trackerId: string) => {
    const targetTrackers = trackers.filter((tracker) => tracker.id === trackerId)

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
      tracker.id === trackerId ? currentTracker : tracker
    )
    setTrackers(newTrackers)
    store.save(today, newTrackers)
    clearInterval(timerId)
  }

  const updateTrackerName = (trackerId: string, trackerName: string) => {
    const currentTracker = store.fetchAllByDay(today)
    const newTracker = currentTracker.map((tracker) =>
      tracker.id === trackerId ? { ...tracker, name: trackerName } : tracker
    )
    store.save(today, newTracker)
  }

  React.useEffect(() => {
    if (!inProgress || timerId !== 0) {
      return
    }

    const inProgressTracker = trackers.filter((tracker) => tracker.inProgress)[0]
    const inProgressTimer = inProgressTracker.timers.filter((timer) => !timer.end)[0]

    calculateCurrentCount(inProgressTimer.start)
  }, [])

  return (
    <Component
      startCount={startCount}
      restartCount={restartCount}
      pauseCount={pauseCount}
      trackers={trackers}
      inProgress={inProgress}
      currentCount={currentCount}
      today={today}
      updateTrackerName={updateTrackerName}
    />
  )
}
