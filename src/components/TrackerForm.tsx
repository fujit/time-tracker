import React from 'react'
import { Actions } from '../reducer'
import { start } from '../actionCreators'
import { useTrackerForm } from '../utils/hooks/useTrackerForm'
import { keycode } from '../utils/Constants'
import * as DateUtil from '../utils/DateUtil'
import { StartIcon } from './Icon'

type Props = {
  inProgressId: string | undefined
  dispatch: React.Dispatch<Actions>
  calculateCurrentCount: (currentDate: Date) => void
  today: string
} & JSX.IntrinsicElements['input']

export const TrackerForm: React.FC<Props> = ({
  inProgressId,
  dispatch,
  calculateCurrentCount,
  today,
  ...props
}) => {
  const [trackerName, isValid, renderTrackerForm, changeTrackerName] = useTrackerForm('')

  const startMeasure = () => {
    if (inProgressId || !isValid) {
      return
    }
    changeTrackerName()

    const currentDate = DateUtil.getCurrentDate()
    dispatch(start(trackerName, today, currentDate))
    calculateCurrentCount(currentDate)
  }

  const keyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === keycode.enter) {
      startMeasure()
    }
  }

  return (
    <div className="flex items-start">
      {renderTrackerForm({
        disabled: !!inProgressId,
        onKeyDown: keyDown,
        className: 'mr-4',
        ...props,
      })}
      <StartIcon
        width={42}
        height={42}
        onClick={startMeasure}
        disabled={!!(inProgressId || !isValid)}
      />
    </div>
  )
}
