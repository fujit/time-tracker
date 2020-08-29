import React from 'react'
import { Actions } from '../reducer'
import { restart, updateName, pause } from '../actionCreators'
import { useTrackerForm } from '../utils/useTrackerForm'
import { useTrackerCalc } from '../utils/useTrackerCalc'
import * as DateUtil from '../utils/DateUtil'
import { StartIcon, PauseIcon } from './Icon'
import { Button } from './Button'
import { DecimalText } from './Number'

type Props = {
  tracker: Tracker
  inProgressId: string | undefined
  currentCount?: number
  dispatch: React.Dispatch<Actions>
  calculateCurrentCount: (currentDate: Date) => void
  pauseTimer: () => void
  openBreakdown: (tracker: Tracker) => void
}

export const TrackerItem: React.FC<Props> = (props) => {
  const [trackerName, isValid, renderTrackerForm] = useTrackerForm(props.tracker.name)
  const [calcSum] = useTrackerCalc()

  const sum = React.useMemo(() => calcSum(props.tracker.timers), [props.tracker.timers, calcSum])

  const totalTime = React.useMemo(
    () => (props.tracker.inProgress && props.currentCount ? sum + props.currentCount : sum),
    [sum, props.currentCount, props.tracker.inProgress]
  )

  const updateTrackerName = () => {
    if (isValid) {
      props.dispatch(updateName(props.tracker.id, trackerName))
    }
  }

  const restartMeasure = () => {
    if (isValid) {
      const currentDate = DateUtil.getCurrentDate()
      props.dispatch(restart(props.tracker.id, currentDate))
      props.calculateCurrentCount(currentDate)
    }
  }

  const pauseMeasure = () => {
    props.dispatch(pause(props.tracker.id))
    props.pauseTimer()
  }

  return (
    <div className="flex flex-col h-16">
      <div className="flex items-center mb-4">
        {renderTrackerForm({
          isError: !isValid,
          hasFrame: false,
          onBlur: updateTrackerName,
          className: 'mr-4',
        })}
        <Button
          className="mr-4"
          onClick={() => props.openBreakdown({ ...props.tracker, name: trackerName })}
        >
          内訳を見る
        </Button>
        <DecimalText className="w-8 mr-4" value={totalTime / 60} digits={1} unit="h" />
        {props.tracker.inProgress ? (
          <PauseIcon width={36} height={36} onClick={pauseMeasure} />
        ) : (
          <StartIcon
            width={36}
            height={36}
            onClick={restartMeasure}
            disabled={!!(props.inProgressId || !isValid)}
          />
        )}
      </div>
      {!isValid && <p className="mt-2 text-red-500">validate error</p>}
    </div>
  )
}
