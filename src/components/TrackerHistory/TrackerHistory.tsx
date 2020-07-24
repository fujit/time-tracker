import * as React from 'react'
import * as styles from './TrackerHistory.scss'
import { StartButton, PauseButton } from '../Button/PlayButton'
import { Number } from '../Text/Number'
import * as DateUtil from '../../utils/DateUtil'

type Props = {
  trackers: Tracker[]
  restartCount: (name: string) => void
  pauseCount: (name: string) => void
}

export const TrackerHistory: React.FC<Props> = ({ trackers, restartCount, pauseCount }) => (
  <div className={styles.listGroup}>
    {trackers.map((tracker) => (
      <div key={tracker.name} className={styles.list}>
        <div className={styles.listTracker}>
          <p>{tracker.name}</p>
          <Number
            value={tracker.timers.reduce(
              (accumulator, currentValue) => accumulator + currentValue.duration,
              0
            )}
            type="round"
          />
          {tracker.inProgress ? (
            <PauseButton width={36} height={36} onClick={() => pauseCount(tracker.name)} />
          ) : (
            <StartButton width={36} height={36} onClick={() => restartCount(tracker.name)} />
          )}
        </div>
        <div className={styles.listTimer}>
          <ul>
            {tracker.timers.map((timer) => (
              <li key={timer.start.toString()}>
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
