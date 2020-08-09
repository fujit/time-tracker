import * as React from 'react'
import * as styles from './TrackerList.scss'
import { TrackerItem } from './TrackerItem'
import { TrackerBreakdown } from '../TrackerBreakdown/TrackerBreakdown'
import { TrackerCopy } from './TrackerCopy'

type ContainerProps = {
  trackers: Tracker[]
  restartCount: (trackerId: string) => void
  pauseCount: (trackerId: string) => void
  updateTrackerName: (trackerId: string, trackerName: string) => void
  inProgress: boolean
  today: string
}

type Props = {
  showBreakdown: (tracker: Tracker) => void
  closeBreakdown: () => void
  isShowBreakdown: boolean
  breakdownTracker?: Tracker
} & ContainerProps

const Component: React.FC<Props> = ({
  isShowBreakdown,
  breakdownTracker,
  closeBreakdown,
  today,
  trackers,
  restartCount,
  pauseCount,
  showBreakdown,
  inProgress,
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
      <TrackerCopy />
    </div>
    <div>
      {trackers.map((tracker) => (
        <TrackerItem
          key={tracker.id}
          tracker={tracker}
          restartCount={restartCount}
          pauseCount={pauseCount}
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

  const showBreakdown = (tracker: Tracker) => {
    setIsShowBreakdown(true)
    setBreakdownTracker(tracker)
  }

  const closeBreakdown = () => {
    setIsShowBreakdown(false)
    setBreakdownTracker(undefined)
  }

  return (
    <Component
      {...props}
      showBreakdown={showBreakdown}
      closeBreakdown={closeBreakdown}
      isShowBreakdown={isShowBreakdown}
      breakdownTracker={breakdownTracker}
    />
  )
}
