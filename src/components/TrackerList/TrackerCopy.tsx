import React from 'react'
import * as styles from './TrackerList.scss'
import { clipboardCopy } from '../../utils/Util'
import { useTrackerCalc } from '../../utils/useTrackerCalc'
import { CopyIcon } from '../Icon/Icon'

type TrackerSummary = {
  name: string
  time: string
}

type Props = {
  isDisplayCopiedMessage: boolean
  copySummary: () => void
}

const Component: React.FC<Props> = ({ isDisplayCopiedMessage, copySummary }) => (
  <>
    <CopyIcon width={35} height={35} onClick={copySummary} />
    {isDisplayCopiedMessage && <p className={styles.copiedMessage}>Copied</p>}
  </>
)

type ContainerProps = {
  trackers: Tracker[]
}

export const TrackerCopy: React.FC<ContainerProps> = ({ trackers }) => {
  const [isDisplayCopiedMessage, setIsDisplayCopiedMessage] = React.useState(false)
  const [calcSum] = useTrackerCalc()

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

  const copySummary = () => {
    const copyData = arrangeTrackerData(summary)
    const result = clipboardCopy(copyData)

    if (result) {
      setIsDisplayCopiedMessage(true)

      setTimeout(() => {
        setIsDisplayCopiedMessage(false)
      }, 1000 * 5)
    }
  }

  return <Component isDisplayCopiedMessage={isDisplayCopiedMessage} copySummary={copySummary} />
}
