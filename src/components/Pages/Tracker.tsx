import * as React from 'react'
import * as styles from './Tracker.scss'
import { reducer, initialState } from '../../reducer'
import { start, restart, pause, changeName } from '../../actionCreators'
import { TrackerForm } from '../TrackerForm/TrackerForm'
import { TrackerList } from '../TrackerList/TrackerList'

type ContainerProps = {
  todaysTrackers: Tracker[]
  today: string
}

export const Tracker: React.FC<ContainerProps> = ({ todaysTrackers, today }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState({ trackers: todaysTrackers }))

  const trackers = React.useMemo(() => state.trackers, [state.trackers])
  const inProgress = React.useMemo(() => trackers.some((tracker) => tracker.inProgress), [trackers])

  const startMeasure = React.useCallback((trackerName: string) => {
    // TODO: 登録済みの名前の場合 (restart or 禁止)
    return dispatch(start(trackerName, today))
  }, [])

  const restartMeasure = React.useCallback((trackerId: string) => dispatch(restart(trackerId)), [])

  const pauseMeasure = React.useCallback((trackerId: string) => dispatch(pause(trackerId)), [])

  const updateTrackerName = React.useCallback(
    (trackerId: string, trackerName: string) => dispatch(changeName(trackerId, trackerName)),
    []
  )

  return (
    <div className={styles.home}>
      <TrackerForm inProgress={inProgress} startCount={startMeasure} />
      <TrackerList
        trackers={trackers}
        restartCount={restartMeasure}
        pauseCount={pauseMeasure}
        inProgress={inProgress}
        today={today}
        updateTrackerName={updateTrackerName}
      />
    </div>
  )
}
