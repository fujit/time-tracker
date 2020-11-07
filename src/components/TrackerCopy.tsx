import React, { FC, useCallback } from 'react'
import { useClipBoard } from '../utils/hooks/useClipBoard'
import { useTrackerCopy } from '../utils/hooks/useTrackerCopy'
import { CopyIcon } from './Icon'

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

type ContainerProps = {
  trackers: ActiveTracker[]
}

export const TrackerCopy: React.FC<ContainerProps> = ({ trackers }) => {
  const { arrangeTrackerDataDaily, arrangeTrackerDataWork } = useTrackerCopy(trackers)
  const [onCopy, isCopied] = useClipBoard()

  const copyByDaily = useCallback(() => {
    onCopy(arrangeTrackerDataDaily)
  }, [onCopy, arrangeTrackerDataDaily])

  const copyByWork = useCallback(() => {
    onCopy(arrangeTrackerDataWork)
  }, [onCopy, arrangeTrackerDataWork])

  return <Component isCopied={isCopied} onCopyDaily={copyByDaily} onCopyWork={copyByWork} />
}
