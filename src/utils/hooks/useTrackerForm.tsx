import React from 'react'
import { Input } from '../../components/Input'
import { validate } from '../Constants'

type RenderProps = {
  isError?: boolean
  hasFrame?: boolean
} & JSX.IntrinsicElements['input']

type UseTrackerFormResult = [
  { updatedValue: { trackerName: string }; isValid: boolean },
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

    setTrackerName(event.target.value.replace(/\s/g, ' '))
  }, [])

  // TODO: 登録済みの名前制御
  const isValid = React.useMemo(
    () => !!trackerName && trackerName.length <= validate.trackerName.length,
    [trackerName]
  )

  const renderTrackerForm = (props: RenderProps) => (
    <Input
      value={trackerName}
      onChange={changeTrackerName}
      size={60}
      maxLength={validate.trackerName.length}
      type="text"
      {...props}
    />
  )

  const result = {
    updatedValue: {
      trackerName,
    },
    isValid,
  }

  return [result, renderTrackerForm, changeTrackerName]
}
