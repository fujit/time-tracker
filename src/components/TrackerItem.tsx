import React from 'react'
import { DispatchContext, StateContext } from '../utils/contexts/StoreContext'
import { restart, updateName, pause } from '../actionCreators'
import { useTrackerForm } from '../utils/hooks/useTrackerForm'
import { useTrackerCalc } from '../utils/hooks/useTrackerCalc'
import * as DateUtil from '../utils/DateUtil'
import { StartIcon, PauseIcon } from './Icon'
import { Button } from './Button'
import { DecimalText } from './Number'
import { ForwardedInput } from './Input'
import { keycode } from '../utils/Constants'

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
  const dispatch = React.useContext(DispatchContext)
  const state = React.useContext(StateContext)

  const sum = React.useMemo(() => calcSum(props.tracker.timers), [props.tracker.timers, calcSum])

  const totalTime = React.useMemo(
    () => (props.tracker.inProgress && props.currentCount ? sum + props.currentCount : sum),
    [sum, props.currentCount, props.tracker.inProgress]
  )

  const inputRef = React.useRef<HTMLInputElement | null>(null)
  const updateTrackerName = () => {
    if (isValid) {
      dispatch(updateName(props.tracker.id, trackerName))
    }
  }

  const restartMeasure = () => {
    if (isValid) {
      const currentDate = DateUtil.getCurrentDate()
      dispatch(restart(props.tracker.id, currentDate))
      props.calculateCurrentCount(currentDate)
    }
  }

  const pauseMeasure = () => {
    dispatch(pause(props.tracker.id))
    props.pauseTimer()
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
      <div className="flex items-center">
        <ForwardedInput
          type="text"
          value={trackerName}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            changeTrackerName(event.target.value)
          }
          onBlur={updateTrackerName}
          onKeyDown={keyDown}
          className="w-2/5 mr-4 border-0"
          maxLength={30}
          isError={!isValid}
          ref={inputRef}
        />
        <div className="flex flex-col xl:flex-row lg:flex-row">
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
