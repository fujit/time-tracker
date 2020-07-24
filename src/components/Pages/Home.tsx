import * as React from 'react'
import * as styles from './Home.scss'
import { TrackerHistory } from '../TrackerHistory/TrackerHistory'
import { TextInput } from '../Input/TextInput'
import { StartButton } from '../Button/PlayButton'
import * as DateUtil from '../../utils/DateUtil'
import { keycode } from '../../utils/Constants'

type Props = {
  startCount: () => void
  restartCount: (name: string) => void
  pauseCount: (name: string) => void
  trackers: Tracker[]
  inprogress: boolean
} & JSX.IntrinsicElements['input']

const Component: React.FC<Props> = ({
  startCount,
  restartCount,
  pauseCount,
  trackers,
  inprogress,
  ...props
}) => (
  <div>
    <div className={styles.main}>
      <TextInput {...props} />
      <StartButton
        width={42}
        height={42}
        onClick={startCount}
        className={inprogress ? 'disable' : ''}
      />
    </div>
    <TrackerHistory
      trackers={trackers}
      restartCount={restartCount}
      pauseCount={pauseCount}
      inprogress={inprogress}
    />
  </div>
)

export const Home: React.FC = () => {
  const initialData: Tracker[] = [
    {
      name: 'initial',
      inProgress: false,
      timers: [
        {
          start: new Date(),
          end: new Date(),
          duration: 62,
        },
      ],
    },
  ]
  const [trackerName, setTrackerName] = React.useState('')
  const [start, setStart] = React.useState<Date | undefined>(undefined)
  const [trackers, setTrackers] = React.useState(initialData)

  const inprogress = React.useMemo(() => trackers.some((tracker) => tracker.inProgress), [trackers])

  const changeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTrackerName(event.target.value)
  }

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

  const startCount = () => {
    if (inprogress) {
      return
    }

    // TODO: バリデーション
    if (!trackerName) {
      return
    }

    const registerdName = trackers.filter((tracker) => tracker.name === trackerName)
    if (registerdName.length > 0) {
      restartCount(registerdName[0].name)
      setTrackerName('')
      return
    }

    const currentTracker: Tracker = {
      name: trackerName,
      inProgress: true,
      timers: [] as Timer[],
    }

    setStart(DateUtil.getCurrentDate())

    setTrackers([...trackers, currentTracker])
    setTrackerName('')
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

  const keyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === keycode.enter) {
      startCount()
    }
  }

  return (
    <Component
      startCount={startCount}
      restartCount={restartCount}
      pauseCount={pauseCount}
      trackers={trackers}
      inprogress={inprogress}
      onChange={changeValue}
      onKeyDown={keyDown}
      value={trackerName}
    />
  )
}
