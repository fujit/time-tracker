import React, { useContext, useMemo, useRef } from 'react'
import { DispatchContext, StateContext } from '../utils/contexts/StoreContext'
import { restart, rename, pause } from '../actionCreators'
import { useTrackerForm } from '../utils/hooks/useTrackerForm'
import { useTrackerCalc } from '../utils/hooks/useTrackerCalc'
import { updatePauseTimer, getNextTimerId } from '../utils/TrackerLogic'
import * as DateUtil from '../utils/DateUtil'
import { fetchPost } from '../utils/Fetch'
import { StartIcon, PauseIcon } from './Icon'
import { Button } from './Button'
import { DecimalText } from './Number'
import { ForwardedInput } from './Input'
import { keycode, validate } from '../utils/Constants'

type Props = {
  tracker: Tracker
  currentCount?: number
  calculateCurrentCount: (currentDate: Date) => void
  pauseTimer: () => void
  openBreakdown: (trackerId: string) => void
  removeTracker: (trackerId: string) => void
}

export const TrackerItem: React.FC<Props> = (props) => {
  const [trackerName, isValid, changeTrackerName] = useTrackerForm(props.tracker.name)
  const calcSum = useTrackerCalc()
  const dispatch = useContext(DispatchContext)
  const state = useContext(StateContext)

  const sum = useMemo(() => calcSum(props.tracker.timers), [props.tracker.timers, calcSum])

  const totalTime = useMemo(
    () => (props.tracker.inProgress && props.currentCount ? sum + props.currentCount : sum),
    [sum, props.currentCount, props.tracker.inProgress]
  )

  const inputRef = useRef<HTMLInputElement | null>(null)
  const updateTrackerName = () => {
    if (isValid) {
      dispatch(rename(props.tracker.id, trackerName))

      fetchPost('/api/renameTracker', {
        body: JSON.stringify({ trackerId: props.tracker.id, newName: trackerName }),
      })
    }
  }

  const restartMeasure = () => {
    if (isValid) {
      const currentDate = DateUtil.getCurrentDate()
      const nextTimerId = getNextTimerId(props.tracker.timers)

      dispatch(restart(props.tracker.id, nextTimerId, currentDate))
      props.calculateCurrentCount(currentDate)

      fetchPost('/api/restartTracker', {
        body: JSON.stringify({
          trackerId: props.tracker.id,
          nextTimerId,
          startTime: currentDate,
        }),
      })
    }
  }

  const pauseMeasure = () => {
    const updatedTimer = updatePauseTimer(props.tracker, DateUtil.getCurrentDate())
    if (!updatedTimer) {
      return
    }

    dispatch(pause(props.tracker.id, updatedTimer))
    props.pauseTimer()

    fetchPost('/api/pauseTracker', {
      body: JSON.stringify({
        trackerId: props.tracker.id,
        timerId: updatedTimer.id,
        endTime: updatedTimer.end,
        minute: updatedTimer.minute,
      }),
    })
  }

  const keyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === keycode.enter) {
      if (isValid && inputRef.current) {
        inputRef.current.blur()
      }
    }
  }

  const removeTracker = () => {
    if (!props.tracker.inProgress) {
      props.removeTracker(props.tracker.id)
    }
  }

  return (
    <div className="flex flex-col h-16 mb-8">
      <div className="flex items-center hover-opacity-parent" data-testid="items">
        <ForwardedInput
          type="text"
          value={trackerName}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            changeTrackerName(event.target.value)
          }
          onBlur={updateTrackerName}
          onKeyDown={keyDown}
          className="w-2/5 mr-4 border-0"
          maxLength={validate.trackerName.length}
          isError={!isValid}
          ref={inputRef}
        />
        <div
          className="flex flex-col opacity-0 xl:flex-row lg:flex-row hover-opacity-child"
          data-testid="button-list"
        >
          <Button
            className="mr-4"
            onClick={() => props.openBreakdown(props.tracker.id)}
            data-testid="breakdown-button"
          >
            内訳を見る
          </Button>
          <Button
            className="mr-4"
            colorType="danger"
            onClick={removeTracker}
            disabled={props.tracker.inProgress}
            data-testid="remove-button"
          >
            削除する
          </Button>
        </div>
        <DecimalText className="w-8 mr-4" value={totalTime / 60} digits={1} unit="h" />
        {props.tracker.inProgress ? (
          <PauseIcon width={36} height={36} onClick={pauseMeasure} />
        ) : (
          <StartIcon
            width={36}
            height={36}
            onClick={restartMeasure}
            disabled={!!(state.inProgressId || !isValid)}
          />
        )}
      </div>
      {!isValid && (
        <p className="mt-2 text-red-500" role="alert">
          validate error
        </p>
      )}
    </div>
  )
}
