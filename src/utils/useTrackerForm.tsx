import React from 'react'
import { TextInput } from '../components/Input/Input'
import { validate } from './Constants'

type RenderProps = {
  isError?: boolean
  hasFrame?: boolean
} & JSX.IntrinsicElements['input']

type UseTrackerFormResult = [
  string,
  boolean,
  (props: RenderProps) => JSX.Element,
  (event?: React.ChangeEvent<HTMLInputElement>) => void
]

export const useTrackerForm = (name: string): UseTrackerFormResult => {
  const [trackerName, setTrackerName] = React.useState(name)

  const changeTrackerName = React.useCallback((event?: React.ChangeEvent<HTMLInputElement>) => {
    if (!event) {
      setTrackerName('')
      return
    }

    setTrackerName(event.target.value)
  }, [])

  // TODO: 登録済みの名前制御
  const isValid = React.useMemo(
    () => !!trackerName && trackerName.length <= validate.trackerName.length,
    [trackerName]
  )

  const renderTrackerForm = (props: RenderProps) => (
    <TextInput
      value={trackerName}
      onChange={changeTrackerName}
      size={60}
      maxLength={validate.trackerName.length}
      {...props}
    />
  )

  return [trackerName, isValid, renderTrackerForm, changeTrackerName]
}
