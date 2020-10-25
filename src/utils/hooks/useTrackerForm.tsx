import { useState, useCallback, useMemo } from 'react'
import { validate } from '../Constants'

type FormValue = {
  key?: number
  name: string
}

type UseTrackerFormResult = [FormValue, boolean, (value: string) => void]

export const useTrackerForm = (name: string, key?: number): UseTrackerFormResult => {
  const [trackerName, setTrackerName] = useState(name)
  const [trackerKey, setTrackerKey] = useState(key)

  const extractKey = (value: string) => {
    const regexKey = value.match(/^#[0-9]+ /)
    if (!regexKey) {
      return
    }

    const inputKey = Number.parseInt(regexKey[0].replace('#', '').trim(), 10)

    if (Number.isNaN(inputKey)) {
      return
    }

    return inputKey
  }

  const changeTrackerName = useCallback((value: string) => {
    const trimValue = value.replace(/\s/g, ' ')
    setTrackerName(trimValue)
    setTrackerKey(extractKey(trimValue))
  }, [])

  // TODO: 登録済みの名前制御
  const isValid = useMemo(
    () => !!trackerName && trackerName.length <= validate.trackerName.length,
    [trackerName]
  )

  return [{ key: trackerKey, name: trackerName }, isValid, changeTrackerName]
}
