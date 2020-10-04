import React, { FC, KeyboardEvent, MutableRefObject, useContext, useRef } from 'react'
import { ForwardedInput } from '../Input'
import { keycode, validate } from '../../utils/Constants'
import { DispatchContext } from '../../utils/contexts/StoreContext'
import { fetchPost } from '../../utils/Fetch'
import { rename } from '../../actionCreators'

type Props = {
  trackerName: string
  changeTrackerName: (value: string) => void
  updateTrackerName: () => void
  keyDown: (event: KeyboardEvent<HTMLInputElement>) => void
  isValid: boolean
  inputRef: MutableRefObject<HTMLInputElement | null>
}

export const TrackerNameComponent: FC<Props> = ({
  trackerName,
  changeTrackerName,
  updateTrackerName,
  keyDown,
  isValid,
  inputRef,
}) => (
  <ForwardedInput
    type="text"
    value={trackerName}
    onChange={(event: React.ChangeEvent<HTMLInputElement>) => changeTrackerName(event.target.value)}
    onBlur={updateTrackerName}
    onKeyDown={keyDown}
    className="w-2/5 mr-4 border-0"
    maxLength={validate.trackerName.length}
    isError={!isValid}
    ref={inputRef}
  />
)

type ContainerProps = {
  trackerId: string
  trackerName: string
  isValid: boolean
  changeTrackerName: (value: string) => void
}

export const TrackerName: FC<ContainerProps> = ({
  trackerId,
  trackerName,
  isValid,
  changeTrackerName,
}) => {
  const dispatch = useContext(DispatchContext)

  const updateTrackerName = () => {
    if (isValid) {
      dispatch(rename(trackerId, trackerName))

      fetchPost('/api/renameTracker', {
        body: JSON.stringify({ trackerId, newName: trackerName }),
      })
    }
  }

  const inputRef = useRef<HTMLInputElement | null>(null)
  const keyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === keycode.enter) {
      if (isValid && inputRef.current) {
        inputRef.current.blur()
      }
    }
  }

  return (
    <TrackerNameComponent
      {...{ trackerName, changeTrackerName, updateTrackerName, keyDown, isValid, inputRef }}
    />
  )
}
