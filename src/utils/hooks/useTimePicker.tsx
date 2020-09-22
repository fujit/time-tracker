import { useState, useCallback, useMemo } from 'react'
import * as DateUtil from '../DateUtil'

type UseTimerPickerResult = [
  string,
  (start: string) => void,
  string,
  (end: string) => void,
  boolean
]

export const useTimePicker = (startTime?: Date, endTime?: Date): UseTimerPickerResult => {
  const [start, setStart] = useState(startTime ? DateUtil.format(startTime, 'HH:mm') : '')
  const [end, setEnd] = useState(endTime ? DateUtil.format(endTime, 'HH:mm') : '')

  const changeStart = useCallback((startValue: string) => {
    setStart(startValue)
  }, [])

  const changeEnd = useCallback((endValue: string) => {
    setEnd(endValue)
  }, [])

  const isValid = useMemo(() => !!(start && end && start <= end), [start, end])

  return [start, changeStart, end, changeEnd, isValid]
}
