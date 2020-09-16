import React from 'react'
import { validate } from '../Constants'

type UseTrackerFormResult = [string, boolean, (value: string) => void]

export const useTrackerForm = (name: string): UseTrackerFormResult => {
  const [trackerName, setTrackerName] = React.useState(name)

  const changeTrackerName = React.useCallback((value: string) => {
    setTrackerName(value.replace(/\s+/g, ' '))
  }, [])

  // TODO: 登録済みの名前制御
  const isValid = React.useMemo(
    () => !!trackerName && trackerName.length <= validate.trackerName.length,
    [trackerName]
  )

  return [trackerName, isValid, changeTrackerName]
}
