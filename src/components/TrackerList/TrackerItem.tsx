import * as React from 'react'
import classNames from 'classnames/bind'
import * as styles from './TrackerList.scss'
import { StartIcon, PauseIcon } from '../Icon/PlayIcon'
import { Button } from '../Button/Button'
import { TextInput } from '../Input/TextInput'
import { DecimalText } from '../Text/Number'

const Title: React.FC<JSX.IntrinsicElements['input']> = (props) => (
  <TextInput {...props} className="trackerName" hasFrame={false} />
)

const BreakdownButton: React.FC<JSX.IntrinsicElements['a']> = (props) => (
  <Button {...props}>内訳を見る</Button>
)

type ContainerProps = {
  tracker: Tracker
  currentCount: number
  inProgress: boolean
  showBreakdown: (tracker: Tracker) => void
  pauseCount: (trackerId: string) => void
  restartCount: (trackerId: string) => void
  updateTrackerName: (trackerId: string, trackerName: string) => void
}

export const TrackerItem: React.FC<ContainerProps> = (props) => {
  const [trackerName, setTrackerName] = React.useState(props.tracker.name)

  const elapsedTime = props.tracker.timers
    .filter((timer): timer is CalculatedTimer => !!timer.minute)
    .reduce((previous, current) => previous + current.minute, 0)

  const totalTime = props.tracker.inProgress ? elapsedTime + props.currentCount : elapsedTime

  const changeTrackerName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value
    setTrackerName(name)
  }

  const updateTrackerName = () => {
    props.updateTrackerName(props.tracker.id, trackerName)
  }

  return (
    <div className={styles.listTracker}>
      <Title value={trackerName} onChange={changeTrackerName} onBlur={updateTrackerName} />
      <BreakdownButton
        onClick={() => props.showBreakdown({ ...props.tracker, name: trackerName })}
      />
      <DecimalText
        className={classNames(styles.listTrackerTime, 'trackerTime')}
        value={totalTime / 60}
        digits={1}
        unit="h"
      />
      {props.tracker.inProgress ? (
        <PauseIcon width={36} height={36} onClick={() => props.pauseCount(props.tracker.id)} />
      ) : (
        <StartIcon
          width={36}
          height={36}
          onClick={() => props.restartCount(props.tracker.id)}
          className={props.inProgress ? 'disable' : ''}
        />
      )}
    </div>
  )
}
