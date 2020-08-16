import React from 'react'
import * as styles from './TrackerList.scss'
import { Actions } from '../../reducer'
import { TrackerItem } from './TrackerItem'
import { TrackerBreakdown } from '../TrackerBreakdown/TrackerBreakdown'
import { TrackerCopy } from './TrackerCopy'

type ContainerProps = {
  trackers: Tracker[]
  inProgressId: string | undefined
  currentCount?: number
  dispatch: React.Dispatch<Actions>
  calculateCurrentCount: (currentDate: Date) => void
  pauseTimer: () => void
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
  showBreakdown,
  breakdownTracker,
  closeBreakdown,
  trackers,
  inProgressId,
  currentCount,
  dispatch,
  calculateCurrentCount,
  pauseTimer,
  today,
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
          inProgressId={inProgressId}
          currentCount={currentCount}
          dispatch={dispatch}
          calculateCurrentCount={calculateCurrentCount}
          pauseTimer={pauseTimer}
          showBreakdown={showBreakdown}
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
