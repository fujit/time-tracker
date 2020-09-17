import React from 'react'
import { StateContext, DispatchContext } from '../utils/contexts/StoreContext'
import { removeTracker, restoreTracker } from '../actionCreators'
import { useModal } from '../utils/hooks/useModal'
import { useTrackerCalc } from '../utils/hooks/useTrackerCalc'
import { TrackerItem } from './TrackerItem'
import { TrackerBreakdown } from './TrackerBreakdown'
import { TrackerCopy } from './TrackerCopy'
import { DecimalText } from './Number'
import { Alert } from './Alert'

type Props = {
  deletedTracker: string | undefined
  restore: () => void
  trackers: Tracker[]
  openBreakdown: (tracker: Tracker) => void
  remove: (trackerId: string) => void
  closeBreakdown: () => void
  isOpen: boolean
  breakdownTracker?: Tracker
  totalTime: number
} & ContainerProps

const Component: React.FC<Props> = ({
  deletedTracker,
  restore,
  isOpen,
  openBreakdown,
  remove,
  breakdownTracker,
  closeBreakdown,
  trackers,
  currentCount,
  calculateCurrentCount,
  pauseTimer,
  today,
  totalTime,
}) => (
  <>
    {deletedTracker && <Alert restore={restore} />}
    <div className="mt-12">
      {breakdownTracker && (
        <TrackerBreakdown
          isBreakdownOpen={isOpen}
          trackerId={breakdownTracker.id}
          closeBreakdown={closeBreakdown}
        />
      )}
      <div className="flex items-center mb-8">
        <h2 className="mr-4 text-xl">{today} のタスク</h2>
        <DecimalText value={totalTime / 60} digits={1} unit="h" className="mr-4" />
        <TrackerCopy />
      </div>
      <div>
        {trackers
          .filter((tracker) => tracker.isActive)
          .map((tracker) => (
            <TrackerItem
              key={tracker.id}
              tracker={tracker}
              currentCount={currentCount}
              calculateCurrentCount={calculateCurrentCount}
              pauseTimer={pauseTimer}
              openBreakdown={openBreakdown}
              removeTracker={remove}
            />
          ))}
      </div>
    </div>
  </>
)

type ContainerProps = {
  currentCount?: number
  calculateCurrentCount: (currentDate: Date) => void
  pauseTimer: () => void
  today: string
}

export const TrackerList: React.FC<ContainerProps> = (props) => {
  const [breakdownTracker, setBreakdownTracker] = React.useState<Tracker | undefined>(undefined)
  const [deletedTracker, setDeletedTracker] = React.useState<string | undefined>(undefined)
  const [isOpen, toggleModal] = useModal()
  const [calcSum] = useTrackerCalc()
  const state = React.useContext(StateContext)
  const dispatch = React.useContext(DispatchContext)

  const totalTime = React.useMemo(
    () => state.trackers.reduce((previous, current) => previous + calcSum(current.timers), 0),
    [state.trackers, calcSum]
  )

  const openBreakdown = (tracker: Tracker) => {
    toggleModal(true)
    setBreakdownTracker(tracker)
  }

  const closeBreakdown = () => {
    toggleModal(false)
    setBreakdownTracker(undefined)
  }

  const timeoutRef = React.useRef(0)
  const remove = (trackerId: string) => {
    setDeletedTracker(trackerId)
    dispatch(removeTracker(trackerId))

    const id = window.setTimeout(() => {
      setDeletedTracker(undefined)
    }, 1000 * 10)
    timeoutRef.current = id
  }

  const restore = () => {
    if (deletedTracker) {
      dispatch(restoreTracker(deletedTracker))
      setDeletedTracker(undefined)
      clearTimeout(timeoutRef.current)
    }
  }

  return (
    <Component
      {...props}
      deletedTracker={deletedTracker}
      restore={restore}
      trackers={state.trackers}
      openBreakdown={openBreakdown}
      remove={remove}
      closeBreakdown={closeBreakdown}
      breakdownTracker={breakdownTracker}
      isOpen={isOpen}
      totalTime={totalTime}
    />
  )
}
