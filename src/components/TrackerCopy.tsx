import React, { FC, useMemo, useContext, useCallback } from 'react'
import { StateContext } from '../utils/contexts/StoreContext'
import { useTrackerCalc } from '../utils/hooks/useTrackerCalc'
import { useClipBoard } from '../utils/hooks/useClipBoard'
import { CopyIcon } from './Icon'

type TrackerSummary = {
  name: string
  key?: number
  time: string
}

type Props = {
  isCopied: boolean
  onCopyDaily: () => void
  onCopyWork: () => void
}

export const Component: FC<Props> = ({ isCopied, onCopyDaily, onCopyWork }) => (
  <>
    <CopyIcon width={35} height={35} onClick={onCopyDaily} title="日報用にコピーする" />
    <CopyIcon width={35} height={35} onClick={onCopyWork} title="工数入力用にコピーする" />
    {isCopied && <p className="text-sm">Copied</p>}
  </>
)

export const TrackerCopy: React.FC = () => {
  const calcSum = useTrackerCalc()
  const [onCopy, isCopied] = useClipBoard()
  const state = useContext(StateContext)

  const summary: TrackerSummary[] = useMemo(
    () =>
      state.trackers
        .filter((tracker) => tracker.isActive)
        .map((tracker) => ({
          name: tracker.name,
          key: tracker.key,
          time: (calcSum(tracker.timers) / 60).toFixed(1),
        })),
    [state.trackers, calcSum]
  )

  const arrangeTrackerDataDaily = useCallback((trackerSummary: TrackerSummary[]) => {
    const copyData = trackerSummary.reduce(
      (previous, current) => `${previous}・ ${current.name}: ${current.time}\n`,
      ''
    )
    return copyData
  }, [])

  const arrangeTrackerDataWork = useCallback((trackerSummary: TrackerSummary[]) => {
    const copyData = trackerSummary
      .filter((value) => value.key)
      .reduce(
        (previous, current) =>
          `${previous} document.getElementById('new_time_entry_${current.key}_0_hours').value = ${current.time};\n`,
        ''
      )
    return copyData
  }, [])

  const copyByDaily = useCallback(() => {
    onCopy(arrangeTrackerDataDaily(summary))
  }, [onCopy, summary, arrangeTrackerDataDaily])

  const copyByWork = useCallback(() => {
    onCopy(arrangeTrackerDataWork(summary))
  }, [onCopy, summary, arrangeTrackerDataWork])

  return <Component isCopied={isCopied} onCopyDaily={copyByDaily} onCopyWork={copyByWork} />
}
