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
      <TrackerForm state={state} dispatch={dispatch} today={today} />
      <TrackerList state={state} dispatch={dispatch} today={today} />
    </div>
  )
}
