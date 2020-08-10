import * as React from 'react'
import * as styles from './Tracker.scss'
import { reducer, initialState } from '../../reducer'
import { TrackerForm } from '../TrackerForm/TrackerForm'
import { TrackerList } from '../TrackerList/TrackerList'

type ContainerProps = {
  todaysTrackers: Tracker[]
  today: string
}

export const Tracker: React.FC<ContainerProps> = ({ todaysTrackers, today }) => {
  const [state, dispatch] = React.useReducer(
    reducer,
    initialState({
      trackers: todaysTrackers,
      inProgress: todaysTrackers.some((tracker) => tracker.inProgress),
    })
  )

  return (
    <div className={styles.home}>
      <TrackerForm inProgress={state.inProgress} dispatch={dispatch} today={today} />
      <TrackerList
        trackers={state.trackers}
        inProgress={state.inProgress}
        dispatch={dispatch}
        today={today}
      />
    </div>
  )
}
