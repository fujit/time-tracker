import React, { VFC, useContext, KeyboardEvent, ChangeEvent } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { StateContext, DispatchContext } from '../utils/contexts/StoreContext'
import { start } from '../actionCreators'
import { createNewTracker } from '../utils/TrackerLogic'
import { useTrackerForm } from '../utils/hooks/useTrackerForm'
import { fetchPost } from '../utils/Fetch'
import { keycode, validate } from '../utils/Constants'
import * as DateUtil from '../utils/DateUtil'
import { StartIcon } from './Icon'
import { Input } from './Input'

type Props = {
  calculateCurrentCount: (currentDate: Date) => void
  today: string
} & JSX.IntrinsicElements['input']

export const TrackerForm: VFC<Props> = ({ calculateCurrentCount, today, ...props }) => {
  const [formValue, isValid, changeTrackerName] = useTrackerForm('')
  const state = useContext(StateContext)
  const dispatch = useContext(DispatchContext)

  const startMeasure = () => {
    if (state.inProgressId || !isValid) {
      return
    }
    changeTrackerName('')

    const currentDate = DateUtil.getCurrentDate()
    const newTracker = createNewTracker(uuidv4(), formValue.name, today, currentDate, formValue.key)
    dispatch(start(newTracker))
    calculateCurrentCount(currentDate)

    fetchPost('/api/tracker', {
      body: JSON.stringify(newTracker),
    })
  }

  const keyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === keycode.enter) {
      startMeasure()
    }
  }

  return (
    <div className="flex items-start">
      <Input
        value={formValue.name}
        type="text"
        onChange={(event: ChangeEvent<HTMLInputElement>) => changeTrackerName(event.target.value)}
        onKeyDown={keyDown}
        className="w-3/4 mr-4 lg:w-1/2 xl:w-1/2"
        disabled={!!state.inProgressId}
        maxLength={validate.trackerName.length}
        {...props}
        autoComplete="on"
        list="projectName"
      />
      <datalist id="projectName">
        {formValue.suggestProjects.map((suggestProject) => (
          // eslint-disable-next-line jsx-a11y/control-has-associated-label
          <option value={suggestProject.name} key={suggestProject.key} />
        ))}
      </datalist>
      <button onClick={startMeasure}>
        <StartIcon width={42} height={42} disabled={!!(state.inProgressId || !isValid)} />
      </button>
    </div>
  )
}
