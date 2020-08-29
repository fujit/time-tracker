import React from 'react'
import { useTrackerCalc } from '../utils/hooks/useTrackerCalc'
import { useClipBoard } from '../utils/hooks/useClipBoard'
import { CopyIcon } from './Icon'

type TrackerSummary = {
  name: string
  time: string
}

type Props = {
  isCopied: boolean
  onCopy: () => void
}

const Component: React.FC<Props> = ({ isCopied, onCopy }) => (
  <>
    <CopyIcon width={35} height={35} onClick={onCopy} />
    {isCopied && <p className="text-sm">Copied</p>}
  </>
)

type ContainerProps = {
  trackers: Tracker[]
}

export const TrackerCopy: React.FC<ContainerProps> = ({ trackers }) => {
  const [calcSum] = useTrackerCalc()
  const [onCopy, isCopied] = useClipBoard()

  const summary: TrackerSummary[] = React.useMemo(
    () =>
      trackers.map((tracker) => ({
        name: tracker.name,
        time: (calcSum(tracker.timers) / 60).toFixed(1),
      })),
    [trackers, calcSum]
  )

  const arrangeTrackerData = React.useCallback((trackerSummary: TrackerSummary[]) => {
    const copyData = trackerSummary.reduce(
      (previous, current) => `${previous}・ ${current.name}: ${current.time} \n`,
      ''
    )
    return copyData
  }, [])

  const copySummary = React.useCallback(() => {
    onCopy(arrangeTrackerData(summary))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [summary, arrangeTrackerData])

  return <Component isCopied={isCopied} onCopy={copySummary} />
}
