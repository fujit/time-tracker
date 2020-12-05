import React, { FC, useContext } from 'react'
import { DispatchContext } from '../../utils/contexts/StoreContext'
import { restart, pause } from '../../actionCreators'
import { StartIcon, PauseIcon } from '../Icon'
import { getCurrentDate } from '../../utils/DateUtil'
import { getNextTimerId, updatePauseTimer } from '../../utils/TrackerLogic'
import { fetchPost } from '../../utils/Fetch'

type StartProps = {
  restartMeasure: () => void
  inProgressId?: string
  isValid: boolean
}

export const StartComponent: FC<StartProps> = ({ restartMeasure, inProgressId, isValid }) => (
  <button onClick={restartMeasure}>
    <StartIcon width={36} height={36} disabled={!!(inProgressId || !isValid)} />
  </button>
)

export const PauseComponent: FC<{ pauseMeasure: () => void }> = ({ pauseMeasure }) => (
  <button onClick={pauseMeasure}>
    <PauseIcon width={36} height={36} />
  </button>
)

type ContainerProps = {
  tracker: Tracker
  inProgressId?: string
  isValid: boolean
  calculateCurrentCount: (currentDate: Date) => void
  pauseTimer: () => void
}

export const TrackerControl: FC<ContainerProps> = ({
  tracker,
  inProgressId,
  isValid,
  calculateCurrentCount,
  pauseTimer,
}) => {
  const dispatch = useContext(DispatchContext)

  const restartMeasure = () => {
    if (isValid) {
      const startTime = getCurrentDate()
      const nextTimerId = getNextTimerId(tracker.timers)

      dispatch(restart(tracker.id, nextTimerId, startTime))
      calculateCurrentCount(startTime)

      fetchPost('/api/restartTracker', {
        body: JSON.stringify({
          trackerId: tracker.id,
          nextTimerId,
          startTime,
        }),
      })
    }
  }

  const pauseMeasure = () => {
    const updatedTimer = updatePauseTimer(tracker, getCurrentDate())
    if (!updatedTimer) {
      return
    }

    dispatch(pause(tracker.id, updatedTimer))
    pauseTimer()

    fetchPost('/api/pauseTracker', {
      body: JSON.stringify({
        trackerId: tracker.id,
        timerId: updatedTimer.id,
        endTime: updatedTimer.end,
        minute: updatedTimer.minute,
      }),
    })
  }

  return tracker.inProgress ? (
    <PauseComponent {...{ pauseMeasure }} />
  ) : (
    <StartComponent {...{ restartMeasure, inProgressId, isValid }} />
  )
}
