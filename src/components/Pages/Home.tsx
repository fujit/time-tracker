import * as React from 'react'
import { TrackerForm } from '../TrackerForm/TrackerForm'
import { TrackerHistory } from '../TrackerHistory/TrackerHistory'
import * as DateUtil from '../../utils/DateUtil'

type Props = {
  startCount: (name: string) => void
  restartCount: (name: string) => void
  pauseCount: (name: string) => void
  trackers: Tracker[]
  inprogress: boolean
}

type ContainerProps = {
  initialData: Tracker[]
}

const Component: React.FC<Props> = ({
  startCount,
  restartCount,
  pauseCount,
  trackers,
  inprogress,
}) => (
  <div>
    <TrackerForm inprogress={inprogress} startCount={startCount} />
    <TrackerHistory
      trackers={trackers}
      restartCount={restartCount}
      pauseCount={pauseCount}
      inprogress={inprogress}
    />
  </div>
)

export const Home: React.FC<ContainerProps> = ({ initialData }) => {
  const [start, setStart] = React.useState<Date | undefined>(undefined)
  const [trackers, setTrackers] = React.useState(initialData)

  const inprogress = React.useMemo(() => trackers.some((tracker) => tracker.inProgress), [trackers])

  const restartCount = (name: string) => {
    if (inprogress) {
      return
    }

    setStart(DateUtil.getCurrentDate())

    const target = trackers.filter((tracker) => tracker.name === name)[0]
    const newTrackers = trackers.map((tracker) =>
      tracker.name === name ? { ...target, inProgress: true } : tracker
    )

    setTrackers(newTrackers)
  }

  const startCount = (trackerName: string) => {
    const registerdName = trackers.filter((tracker) => tracker.name === trackerName)
    if (registerdName.length > 0) {
      restartCount(registerdName[0].name)
      return
    }

    const currentTracker: Tracker = {
      name: trackerName,
      inProgress: true,
      timers: [] as Timer[],
    }

    setStart(DateUtil.getCurrentDate())

    setTrackers([...trackers, currentTracker])
  }

  const pauseCount = (name: string) => {
    const targetTracker = trackers.filter((tracker) => tracker.name === name)[0]

    if (!targetTracker.inProgress) {
      return
    }

    if (!start) {
      return
    }

    const timer = {
      start,
      end: DateUtil.getCurrentDate(),
      duration: DateUtil.getTimeFromNow(start, 'minute', true),
    }

    const timers = [...targetTracker.timers, timer]

    const currentTracker = {
      ...targetTracker,
      inProgress: false,
      timers,
    }

    const newTrackers = trackers.map((tracker) =>
      tracker.name === name ? currentTracker : tracker
    )
    setTrackers(newTrackers)
  }

  return (
    <Component
      startCount={startCount}
      restartCount={restartCount}
      pauseCount={pauseCount}
      trackers={trackers}
      inprogress={inprogress}
    />
  )
}
