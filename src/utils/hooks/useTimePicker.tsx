import React from 'react'
import * as DateUtil from '../DateUtil'

type UseTimerPickerResult = [
  string,
  (event: React.ChangeEvent<HTMLInputElement>) => void,
  string,
  (event: React.ChangeEvent<HTMLInputElement>) => void,
  boolean
]

export const useTimePicker = (startTime?: Date, endTime?: Date): UseTimerPickerResult => {
  const [start, setStart] = React.useState(startTime ? DateUtil.format(startTime, 'HH:mm') : '')
  const [end, setEnd] = React.useState(endTime ? DateUtil.format(endTime, 'HH:mm') : '')

  const changeStart = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setStart(event.target.value)
  }, [])

  const changeEnd = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setEnd(event.target.value)
  }, [])

  const isValid = React.useMemo(() => !!(start && end && start <= end), [start, end])

  return [start, changeStart, end, changeEnd, isValid]
}
