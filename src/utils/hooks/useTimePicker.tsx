import { useState, useCallback, useMemo } from 'react'
import { getHour, getMinute } from '../DateUtil'

export type UseTimerPickerResult = [Time, (value: string) => void, (value: string) => void, boolean]

export const useTimePicker = (time?: Date): UseTimerPickerResult => {
  const [hour, setHour] = useState(getHour(time).toString())
  const [minute, setMinute] = useState(getMinute(time).toString())

  const changeHour = useCallback((value: string) => {
    if (value === '') {
      setHour('')
      return
    }

    const normalizedValue = value.replace(/[^\d]/g, '')
    const numValue = Number.parseInt(normalizedValue, 10)
    if (Number.isNaN(numValue)) {
      return
    }

    if (numValue >= 1 && numValue <= 24) {
      setHour(normalizedValue)
    }
  }, [])

  const changeMinute = useCallback((value: string) => {
    if (value === '') {
      setMinute('')
      return
    }

    const normalizedValue = value.replace(/[^\d]/g, '')
    const numValue = Number.parseInt(normalizedValue, 10)
    if (Number.isNaN(numValue) || normalizedValue.length > 2) {
      return
    }

    if (numValue >= 0 && numValue <= 59) {
      setMinute(normalizedValue)
    }
  }, [])

  const isValid = useMemo(() => hour !== '' && minute !== '', [hour, minute])

  return [{ hour, minute }, changeHour, changeMinute, isValid]
}
