import * as React from 'react'
import * as styles from './TrackerHistory.scss'
import { StartButton, PauseButton } from '../Button/PlayButton'
import { DecimalText } from '../Text/Number'
import * as DateUtil from '../../utils/DateUtil'

type ContainerProps = {
  trackers: Tracker[]
  restartCount: (name: string) => void
  pauseCount: (name: string) => void
  inprogress: boolean
  currentCount: number
}

type Props = {
  calculateSum: (timers: Timer[]) => number
} & ContainerProps

const Component: React.FC<Props> = ({
  trackers,
  restartCount,
  pauseCount,
  inprogress,
  calculateSum,
  currentCount,
}) => (
  <div className={styles.listGroup}>
    {trackers.map((tracker) => (
      <div key={tracker.id} className={styles.list}>
        <div className={styles.listTracker}>
          <p>{tracker.name}</p>
          {tracker.inProgress ? (
            <>
              <DecimalText value={(calculateSum(tracker.timers) + currentCount) / 60} digits={1} />
              <PauseButton width={36} height={36} onClick={() => pauseCount(tracker.name)} />
            </>
          ) : (
            <>
              <DecimalText value={calculateSum(tracker.timers) / 60} digits={1} />
              <StartButton
                width={36}
                height={36}
                onClick={() => restartCount(tracker.name)}
                className={inprogress ? 'disable' : ''}
              />
            </>
          )}
        </div>
        <div className={styles.listTimer}>
          <ul>
            {tracker.timers.map((timer) => (
              <li key={DateUtil.format(timer.start, 'YYYYMMDDHHmmssSSS')}>
                <span className={styles.timerStart}>{DateUtil.format(timer.start, 'HH:mm')}</span>
                <span>{timer.end && DateUtil.format(timer.end, 'HH:mm')}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    ))}
  </div>
)

export const TrackerHistory: React.FC<ContainerProps> = (props) => {
  const calculateSum = (timers: Timer[]) =>
    timers
      .filter((timer): timer is CalculatedTimer => !!timer.minute)
      .reduce((accumulator, current) => accumulator + current.minute, 0)
  return <Component {...props} calculateSum={calculateSum} />
}
