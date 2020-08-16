import React from 'react'
import * as styles from './Tracker.scss'
import { reducer, initialState } from '../../reducer'
import { TrackerForm } from '../TrackerForm/TrackerForm'
import { TrackerList } from '../TrackerList/TrackerList'
import * as DateUtil from '../../utils/DateUtil'

type ContainerProps = {
  todaysTrackers: Tracker[]
  today: string
}

export const Tracker: React.FC<ContainerProps> = ({ todaysTrackers, today }) => {
  const [state, dispatch] = React.useReducer(
    reducer,
    initialState({
      trackers: todaysTrackers,
      inProgressId: todaysTrackers.find((tracker) => tracker.inProgress)?.id,
    })
  )

  const [currentCount, setCurrentCount] = React.useState(0)
  const [timerId, setTimerId] = React.useState<number | undefined>(undefined)

  const calculateCurrentCount = (currentDate: Date) => {
    setCurrentCount(DateUtil.getTimeFromNow(currentDate, 'minute', true))

    const id = window.setInterval(() => {
      setCurrentCount(DateUtil.getTimeFromNow(currentDate, 'minute', true))
    }, 10000 * 60)

    setTimerId(id)
  }

  const pauseTimer = () => {
    clearInterval(timerId)
  }

  const updateTitle = () => {
    if (state.inProgressId) {
      const inProgressTracker = state.trackers.find((tracker) => tracker.inProgress)
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      document.title = inProgressTracker!.name
    } else {
      document.title = 'time-tracker'
    }
  }

  React.useEffect(() => {
    updateTitle()
  }, [state.trackers])

  React.useEffect(() => {
    if (!state.inProgressId || timerId) {
      return
    }

    const inProgressTimer = state.trackers
      .find((tracker) => tracker.inProgress)
      ?.timers.find((timer) => !timer.end)
    if (!inProgressTimer) {
      return
    }

    calculateCurrentCount(inProgressTimer.start)
  }, [])

  return (
    <div className={styles.home}>
      <TrackerForm
        inProgressId={state.inProgressId}
        dispatch={dispatch}
        calculateCurrentCount={calculateCurrentCount}
        today={today}
      />
      <TrackerList
        trackers={state.trackers}
        inProgressId={state.inProgressId}
        currentCount={currentCount}
        dispatch={dispatch}
        calculateCurrentCount={calculateCurrentCount}
        pauseTimer={pauseTimer}
        today={today}
      />
    </div>
  )
}
