import * as React from 'react'
import * as styles from './TrackerList.scss'
import { clipboardCopy } from '../../utils/Util'
import { CopyIcon } from '../Icon/CopyIcon'
import { TrackerItem } from './TrackerItem'
import { TrackerBreakdown } from '../TrackerBreakdown/TrackerBreakdown'

type TrackerSummary = {
  name: string | null
  time: string | null
}

type ContainerProps = {
  trackers: Tracker[]
  restartCount: (trackerId: string) => void
  pauseCount: (trackerId: string) => void
  updateTrackerName: (trackerId: string, trackerName: string) => void
  inProgress: boolean
  currentCount: number
  today: string
}

type Props = {
  showBreakdown: (tracker: Tracker) => void
  closeBreakdown: () => void
  isShowBreakdown: boolean
  breakdownTracker?: Tracker
  copySummary: () => void
  isDisplayCopiedMessage: boolean
} & ContainerProps

const Component: React.FC<Props> = ({
  trackers,
  restartCount,
  pauseCount,
  inProgress,
  currentCount,
  showBreakdown,
  closeBreakdown,
  isShowBreakdown,
  breakdownTracker,
  copySummary,
  today,
  isDisplayCopiedMessage,
  updateTrackerName,
}) => (
  <div className={styles.listGroup}>
    {breakdownTracker && (
      <TrackerBreakdown
        isShow={isShowBreakdown}
        tracker={breakdownTracker}
        closeBreakdown={closeBreakdown}
      />
    )}
    <div className={styles.listHeader}>
      <h2 className={styles.listTitle}>{today} の作業内容</h2>
      <CopyIcon width={35} height={35} onClick={copySummary} />
      {isDisplayCopiedMessage && <p className={styles.copiedMessage}>Copied</p>}
    </div>
    <div>
      {trackers.map((tracker) => (
        <TrackerItem
          key={tracker.id}
          tracker={tracker}
          restartCount={restartCount}
          pauseCount={pauseCount}
          currentCount={currentCount}
          showBreakdown={showBreakdown}
          inProgress={inProgress}
          updateTrackerName={updateTrackerName}
        />
      ))}
    </div>
  </div>
)

export const TrackerList: React.FC<ContainerProps> = (props) => {
  const [isShowBreakdown, setIsShowBreakdown] = React.useState(false)
  const [breakdownTracker, setBreakdownTracker] = React.useState<Tracker | undefined>(undefined)
  const [isDisplayCopiedMessage, setIsDisplayCopiedMessage] = React.useState(false)

  const showBreakdown = (tracker: Tracker) => {
    setIsShowBreakdown(true)
    setBreakdownTracker(tracker)
  }

  const closeBreakdown = () => {
    setIsShowBreakdown(false)
    setBreakdownTracker(undefined)
  }

  const arrangeTrackerData = (summary: TrackerSummary[]) => {
    // TODO: 複数種類
    const copyData = summary.reduce(
      (previous, current) => `・${previous}${current.name}: ${current.time} \n`,
      ''
    )

    return copyData
  }

  const copySummary = () => {
    // 値取得
    const nameList = Array.from(document.getElementsByClassName('trackerName'))
    const timeList = Array.from(document.getElementsByClassName('trackerTime'))

    // TODO: エラーハンドリング

    if (nameList.length !== timeList.length) {
      return
    }

    const trackerSummary: TrackerSummary[] = nameList.map((name, index) => ({
      name: name.textContent,
      time: timeList[index].textContent,
    }))

    const copyData = arrangeTrackerData(trackerSummary)
    const result = clipboardCopy(copyData)

    if (result) {
      setIsDisplayCopiedMessage(true)

      setTimeout(() => {
        setIsDisplayCopiedMessage(false)
      }, 1000 * 5)
    }
  }

  return (
    <Component
      {...props}
      showBreakdown={showBreakdown}
      closeBreakdown={closeBreakdown}
      isShowBreakdown={isShowBreakdown}
      breakdownTracker={breakdownTracker}
      copySummary={copySummary}
      isDisplayCopiedMessage={isDisplayCopiedMessage}
    />
  )
}
