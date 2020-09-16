import React from 'react'
import * as DateUtil from '../DateUtil'

type UseTimerPickerResult = [
  string,
  (start: string) => void,
  string,
  (end: string) => void,
  boolean
]

export const useTimePicker = (startTime?: Date, endTime?: Date): UseTimerPickerResult => {
  const [start, setStart] = React.useState(startTime ? DateUtil.format(startTime, 'HH:mm') : '')
  const [end, setEnd] = React.useState(endTime ? DateUtil.format(endTime, 'HH:mm') : '')

  const changeStart = React.useCallback((startValue: string) => {
    setStart(startValue)
  }, [])

  const changeEnd = React.useCallback((endValue: string) => {
    setEnd(endValue)
  }, [])

  const isValid = React.useMemo(() => !!(start && end && start <= end), [start, end])

  return [start, changeStart, end, changeEnd, isValid]
}
