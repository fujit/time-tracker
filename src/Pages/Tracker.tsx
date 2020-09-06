import React from 'react'
import { reducer, initialState } from '../reducer'
import { StateContext, DispatchContext } from '../utils/contexts/StoreContext'
import { TrackerForm } from '../components/TrackerForm'
import { TrackerList } from '../components/TrackerList'
import * as DateUtil from '../utils/DateUtil'

type Props = {
  calculateCurrentCount: (startTime: Date) => void
  today: string
  currentCount: number
  pauseTimer: () => void
}

const Component: React.FC<Props> = ({ calculateCurrentCount, today, currentCount, pauseTimer }) => (
  <div className="pl-4">
    <TrackerForm calculateCurrentCount={calculateCurrentCount} today={today} />
    <TrackerList
      currentCount={currentCount}
      calculateCurrentCount={calculateCurrentCount}
      pauseTimer={pauseTimer}
      today={today}
    />
  </div>
)

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

  // title を更新
  React.useEffect(() => {
    if (state.inProgressId) {
      const inProgressTracker = state.trackers.find((tracker) => tracker.inProgress)
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      document.title = inProgressTracker!.name
    } else {
      document.title = 'timer'
    }
  }, [state.trackers, state.inProgressId])

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <Component
          calculateCurrentCount={calculateCurrentCount}
          today={today}
          currentCount={currentCount}
          pauseTimer={pauseTimer}
        />
      </DispatchContext.Provider>
    </StateContext.Provider>
  )
}
