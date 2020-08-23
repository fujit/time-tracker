import React from 'react'
import { useModal } from '../../utils/useModal'
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
  openBreakdown: (tracker: Tracker) => void
  closeBreakdown: () => void
  isOpen: boolean
  breakdownTracker?: Tracker
} & ContainerProps

const Component: React.FC<Props> = ({
  isOpen,
  openBreakdown,
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
        isBreakdownOpen={isOpen}
        tracker={breakdownTracker}
        closeBreakdown={closeBreakdown}
        dispatch={dispatch}
      />
    )}
    <div className={styles.listHeader}>
      <h2 className={styles.listTitle}>{today} の作業内容</h2>
      <TrackerCopy trackers={trackers} />
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
          openBreakdown={openBreakdown}
        />
      ))}
    </div>
  </div>
)

export const TrackerList: React.FC<ContainerProps> = (props) => {
  const [breakdownTracker, setBreakdownTracker] = React.useState<Tracker | undefined>(undefined)
  const [isOpen, openModal, closeModal] = useModal()

  const openBreakdown = (tracker: Tracker) => {
    openModal()
    setBreakdownTracker(tracker)
  }

  const closeBreakdown = () => {
    closeModal()
    setBreakdownTracker(undefined)
  }

  return (
    <Component
      {...props}
      openBreakdown={openBreakdown}
      closeBreakdown={closeBreakdown}
      breakdownTracker={breakdownTracker}
      isOpen={isOpen}
    />
  )
}
