import React, { VFC, useCallback } from 'react'
import { useClipBoard } from '../utils/hooks/useClipBoard'
import { useTrackerCopy } from '../utils/hooks/useTrackerCopy'
import { CopyIcon, ClipboardIcon } from './Icon'
import { Popovers } from './Popovers'

type Props = {
  onCopyDaily: () => void
  onCopyWork: () => void
}

export const Component: VFC<Props> = ({ onCopyDaily, onCopyWork }) => (
  <div className="hover-visibility-parent relative w-48">
    <ClipboardIcon width={35} height={35} />
    <Popovers className="hover-visibility-child invisible top-0 -right-1">
      <ul>
        <li className="p-2 hover:bg-gray-100">
          <div className="flex item-center mr-2">
            <span className="mr-2">日報用にコピー</span>
            <button>
              <CopyIcon width={25} height={25} onClick={onCopyDaily} />
            </button>
          </div>
        </li>
        <li className="p-2 hover:bg-gray-100">
          <div className="flex item-center">
            <span className="mr-2">工数用にコピー</span>
            <button onClick={onCopyWork}>
              <CopyIcon width={25} height={25} />
            </button>
          </div>
        </li>
      </ul>
    </Popovers>
  </div>
)

type ContainerProps = {
  trackers: ActiveTracker[]
}

export const TrackerCopy: VFC<ContainerProps> = ({ trackers }) => {
  const { arrangeTrackerDataDaily, arrangeTrackerDataWork } = useTrackerCopy(trackers)
  const [onCopy] = useClipBoard()

  const copyByDaily = useCallback(() => {
    onCopy(arrangeTrackerDataDaily)
  }, [onCopy, arrangeTrackerDataDaily])

  const copyByWork = useCallback(() => {
    onCopy(arrangeTrackerDataWork)
  }, [onCopy, arrangeTrackerDataWork])

  return <Component onCopyDaily={copyByDaily} onCopyWork={copyByWork} />
}
