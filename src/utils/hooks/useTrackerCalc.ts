import { useCallback } from 'react'

export const useTrackerCalc = () => {
  const calcSum = useCallback((timers: Timer[]) => {
    return timers
      .filter((timer): timer is CalculatedTimer => !!timer.minute)
      .reduce((previous, current) => previous + current.minute, 0)
  }, [])

  return calcSum
}
