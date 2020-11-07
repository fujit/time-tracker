import { useMemo } from 'react'
import { useTrackerCalc } from './useTrackerCalc'

export type UseTrackerCopyResult = {
  arrangeTrackerDataDaily: string
  arrangeTrackerDataWork: string
}

type TrackerSummary = {
  name: string
  key?: number
  time: string
}

export const useTrackerCopy = (activeTrackers: ActiveTracker[]): UseTrackerCopyResult => {
  const calcSum = useTrackerCalc()

  const summary: TrackerSummary[] = useMemo(
    () =>
      activeTrackers.map((tracker) => ({
        name: tracker.name,
        key: tracker.key,
        time: (calcSum(tracker.timers) / 60).toFixed(1),
      })),
    [activeTrackers, calcSum]
  )

  const arrangeTrackerDataDaily = useMemo(
    () =>
      summary.reduce((previous, current) => `${previous}・${current.name}: ${current.time}\n`, ''),
    [summary]
  )

  const arrangeTrackerDataWork = useMemo(
    () =>
      summary.reduce(
        (previous, current) =>
          `${previous} document.getElementById('new_time_entry_${current.key}_0_hours').value = ${current.time};\n`,
        ''
      ),
    [summary]
  )

  return { arrangeTrackerDataDaily, arrangeTrackerDataWork }
}
