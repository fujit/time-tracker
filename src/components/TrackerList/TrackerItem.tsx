import * as React from 'react'
import classNames from 'classnames/bind'
import * as styles from './TrackerList.scss'
import { StartIcon, PauseIcon } from '../Icon/PlayIcon'
import { Button } from '../Button/Button'
import { TextInput } from '../Input/TextInput'
import { DecimalText } from '../Text/Number'
import { validate } from '../../utils/Constants'

type ContainerProps = {
  tracker: Tracker
  inProgress: boolean
  showBreakdown: (tracker: Tracker) => void
  pauseCount: (trackerId: string) => void
  restartCount: (trackerId: string) => void
  updateTrackerName: (trackerId: string, trackerName: string) => void
}

export const TrackerItem: React.FC<ContainerProps> = (props) => {
  const [trackerName, setTrackerName] = React.useState(props.tracker.name)

  const isValidName = React.useMemo(
    () => !!trackerName && trackerName.length <= validate.trackerName.length,
    [trackerName]
  )

  const elapsedTime = props.tracker.timers
    .filter((timer): timer is CalculatedTimer => !!timer.minute)
    .reduce((previous, current) => previous + current.minute, 0)

  const changeTrackerName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value
    setTrackerName(name)
  }

  const updateTrackerName = () => {
    if (!isValidName) {
      return
    }
    props.updateTrackerName(props.tracker.id, trackerName)
  }

  const restartCount = () => {
    if (isValidName) {
      props.restartCount(props.tracker.id)
    }
  }

  return (
    <div className={styles.listTracker}>
      <div className={styles.listTrackerContent}>
        <TextInput
          hasFrame={false}
          value={trackerName}
          onChange={changeTrackerName}
          onBlur={updateTrackerName}
          className="trackerName"
          size={60}
          maxLength={validate.trackerName.length}
        />
        <Button onClick={() => props.showBreakdown({ ...props.tracker, name: trackerName })}>
          内訳を見る
        </Button>
        <DecimalText
          className={classNames(styles.listTrackerContentTime, 'trackerTime')}
          value={elapsedTime / 60}
          digits={1}
          unit="h"
        />
        {props.tracker.inProgress ? (
          <PauseIcon width={36} height={36} onClick={() => props.pauseCount(props.tracker.id)} />
        ) : (
          <StartIcon
            width={36}
            height={36}
            onClick={restartCount}
            className={props.inProgress || !isValidName ? 'disable' : ''}
          />
        )}
      </div>
      {!isValidName && <p className={styles.error}>validate error</p>}
    </div>
  )
}
