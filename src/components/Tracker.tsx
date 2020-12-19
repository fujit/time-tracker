import React, { VFC, useState, useRef, useEffect, useReducer } from 'react'
import Head from 'next/head'
import { reducer, initialState } from '../reducer'
import { ErrorBoundary } from './ErrorBoundary'
import { StateContext, DispatchContext } from '../utils/contexts/StoreContext'
import { TrackerForm } from './TrackerForm'
import { TrackerList } from './TrackerList'
import * as DateUtil from '../utils/DateUtil'

type Props = {
  calculateCurrentCount: (startTime: Date) => void
  today: string
  currentCount: number
  pauseTimer: () => void
  title: string
}

const Component: VFC<Props> = ({
  calculateCurrentCount,
  today,
  currentCount,
  pauseTimer,
  title,
}) => (
  <>
    <Head>
      <title>{title}</title>
    </Head>
    <ErrorBoundary>
      <TrackerForm calculateCurrentCount={calculateCurrentCount} today={today} />
      <TrackerList
        currentCount={currentCount}
        calculateCurrentCount={calculateCurrentCount}
        pauseTimer={pauseTimer}
        today={today}
      />
    </ErrorBoundary>
  </>
)

type ContainerProps = {
  todaysTrackers: Tracker[]
  today: string
}

export const Tracker: VFC<ContainerProps> = ({ todaysTrackers, today }) => {
  const [state, dispatch] = useReducer(
    reducer,
    initialState({
      trackers: todaysTrackers,
      inProgressId: todaysTrackers.find((tracker) => tracker.inProgress)?.id,
    })
  )

  const [title, setTitle] = useState('time-tracker')
  const [currentCount, setCurrentCount] = useState(0)
  const intervalRef = useRef<number | undefined>(undefined)

  const calculateCurrentCount = (currentDate: Date) => {
    setCurrentCount(DateUtil.getTimeFromNow(currentDate, 'minute', true))

    const id = window.setInterval(() => {
      setCurrentCount(DateUtil.getTimeFromNow(currentDate, 'minute', true))
    }, 10000 * 60)

    intervalRef.current = id
  }

  const pauseTimer = () => {
    clearInterval(intervalRef.current)
  }

  // title を更新
  useEffect(() => {
    if (state.inProgressId) {
      const inProgressTracker = state.trackers.find((tracker) => tracker.inProgress)
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      setTitle(inProgressTracker!.name)
    } else {
      setTitle('timer')
    }
  }, [state.trackers, state.inProgressId])

  useEffect(() => {
    if (!state.inProgressId || intervalRef.current) {
      return () => clearInterval(intervalRef.current)
    }

    const inProgressTimer = state.trackers
      .find((tracker) => tracker.inProgress)
      ?.timers.find((timer) => !timer.end)
    if (!inProgressTimer) {
      return () => clearInterval(intervalRef.current)
    }

    calculateCurrentCount(inProgressTimer.start)
    return () => clearInterval(intervalRef.current)
  }, [state.inProgressId, state.trackers])

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <Component
          calculateCurrentCount={calculateCurrentCount}
          today={today}
          currentCount={currentCount}
          pauseTimer={pauseTimer}
          title={title}
        />
      </DispatchContext.Provider>
    </StateContext.Provider>
  )
}
