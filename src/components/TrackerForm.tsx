import React from 'react'
import { StateContext, DispatchContext } from '../utils/contexts/StoreContext'
import { start } from '../actionCreators'
import { useTrackerForm } from '../utils/hooks/useTrackerForm'
import { keycode } from '../utils/Constants'
import * as DateUtil from '../utils/DateUtil'
import { StartIcon } from './Icon'

type Props = {
  calculateCurrentCount: (currentDate: Date) => void
  today: string
} & JSX.IntrinsicElements['input']

export const TrackerForm: React.FC<Props> = ({ calculateCurrentCount, today, ...props }) => {
  const [result, renderTrackerForm, changeTrackerName] = useTrackerForm('')
  const state = React.useContext(StateContext)
  const dispatch = React.useContext(DispatchContext)

  const startMeasure = () => {
    if (state.inProgressId || !result.isValid) {
      return
    }
    changeTrackerName()

    const currentDate = DateUtil.getCurrentDate()
    dispatch(start(result.updatedValue.trackerName, today, currentDate))
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
        disabled: !!state.inProgressId,
        onKeyDown: keyDown,
        className: 'mr-4',
        ...props,
      })}
      <StartIcon
        width={42}
        height={42}
        onClick={startMeasure}
        disabled={!!(state.inProgressId || !result.isValid)}
      />
    </div>
  )
}
