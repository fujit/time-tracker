import * as React from 'react'
import classNames from 'classnames/bind'
import * as styles from './TrackerList.scss'
import { StartIcon, PauseIcon } from '../Icon/PlayIcon'
import { Button } from '../Button/Button'
import { DecimalText } from '../Text/Number'
import { TrackerBreakdown } from '../TrackerBreakdown/TrackerBreakdown'
import { CopyIcon } from '../Icon/CopyIcon'

type ContainerProps = {
  trackers: Tracker[]
  restartCount: (trackerId: string) => void
  pauseCount: (trackerId: string) => void
  inprogress: boolean
  currentCount: number
  today: string
}

type Props = {
  calculateSum: (timers: Timer[]) => number
  showBreakdown: (tracker: Tracker) => void
  closeBreakdown: () => void
  isShowBreakdown: boolean
  breakdownTracker?: Tracker
} & ContainerProps

const Component: React.FC<Props> = ({
  trackers,
  restartCount,
  pauseCount,
  inprogress,
  currentCount,
  calculateSum,
  showBreakdown,
  closeBreakdown,
  isShowBreakdown,
  breakdownTracker,
  today,
}) => (
  <div className={styles.listGroup}>
    {breakdownTracker && isShowBreakdown && (
      <TrackerBreakdown
        isShow={isShowBreakdown}
        tracker={breakdownTracker}
        closeBreakdown={closeBreakdown}
      />
    )}
    <div className={styles.listHeader}>
      <h2 className={styles.listTitle}>{today} の作業内容</h2>
      <CopyIcon />
    </div>
    <div>
      {trackers.map((tracker) => (
        <div key={tracker.id} className={styles.listTracker}>
          <p className={classNames(styles.listTrackerName, 'trackerName')}>{tracker.name}</p>
          <Button onClick={() => showBreakdown(tracker)}>内訳を見る</Button>
          {tracker.inProgress ? (
            <>
              <DecimalText
                className={classNames(styles.listTrackerTime, 'trackerTime')}
                value={(calculateSum(tracker.timers) + currentCount) / 60}
                digits={1}
                unit="h"
              />
              <PauseIcon width={36} height={36} onClick={() => pauseCount(tracker.id)} />
            </>
          ) : (
            <>
              <DecimalText
                className={classNames(styles.listTrackerTime, 'trackerTime')}
                value={calculateSum(tracker.timers) / 60}
                digits={1}
                unit="h"
              />
              <StartIcon
                width={36}
                height={36}
                onClick={() => restartCount(tracker.id)}
                className={inprogress ? 'disable' : ''}
              />
            </>
          )}
        </div>
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

  const calculateSum = (timers: Timer[]) =>
    timers
      .filter((timer): timer is CalculatedTimer => !!timer.minute)
      .reduce((accumulator, current) => accumulator + current.minute, 0)
  return (
    <Component
      {...props}
      calculateSum={calculateSum}
      showBreakdown={showBreakdown}
      closeBreakdown={closeBreakdown}
      isShowBreakdown={isShowBreakdown}
      breakdownTracker={breakdownTracker}
    />
  )
}
