import React from 'react'
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

  const updateTitle = () => {
    if (state.inProgress) {
      const inProgressTracker = state.trackers.find((tracker) => tracker.inProgress)
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      document.title = inProgressTracker!.name
    } else {
      document.title = 'time-tracker'
    }
  }

  React.useEffect(() => {
    updateTitle()
  }, [state.trackers])

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
