import React, { VFC, useState, useEffect, useRef, useContext, useMemo } from 'react'
import { StateContext, DispatchContext } from '../utils/contexts/StoreContext'
import { removeTracker, restoreTracker } from '../actionCreators'
import { useModal } from '../utils/hooks/useModal'
import { useTrackerCalc } from '../utils/hooks/useTrackerCalc'
import { fetchPost } from '../utils/Fetch'
import { TrackerItem } from './TrackerItem'
import { TrackerBreakdown } from './TrackerBreakdown'
import { TrackerCopy } from './TrackerCopy'
import { DecimalText } from './Number'
import { Alert } from './Alert'

type Props = {
  removedTrackerId: string | undefined
  restore: () => void
  trackers: Tracker[]
  activeTrackers: ActiveTracker[]
  openBreakdown: (trackerId: string) => void
  remove: (trackerId: string) => void
  closeBreakdown: () => void
  isOpen: boolean
  breakdownTrackerId: string
  totalTime: number
} & ContainerProps

const Component: VFC<Props> = ({
  removedTrackerId,
  restore,
  isOpen,
  openBreakdown,
  remove,
  breakdownTrackerId,
  closeBreakdown,
  trackers,
  activeTrackers,
  currentCount,
  calculateCurrentCount,
  pauseTimer,
  today,
  totalTime,
}) => (
  <>
    {removedTrackerId && (
      <Alert restore={restore} className="w-4/6 sm:w-2/5 md:w-2/5 lg:w-1/4 xl:w-1/4" />
    )}
    <div className="mt-12">
      {breakdownTrackerId && (
        <TrackerBreakdown
          isBreakdownOpen={isOpen}
          trackerId={breakdownTrackerId}
          closeBreakdown={closeBreakdown}
        />
      )}
      <div className="flex items-center mb-20">
        <h2 className="mx-4 text-xl">{today} のタスク</h2>
        <DecimalText
          value={totalTime / 60}
          digits={1}
          unit="h"
          className="mr-4"
          data-testid="total"
        />
        <TrackerCopy trackers={activeTrackers} />
      </div>
      <div>
        <ul>
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
        </ul>
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

export const TrackerList: VFC<ContainerProps> = (props) => {
  const [breakdownTrackerId, setBreakdownTrackerId] = useState('')
  const [removedTrackerId, setRemovedTrackerId] = useState<string | undefined>(undefined)
  const [isOpen, toggleModal] = useModal()
  const calcSum = useTrackerCalc()
  const state = useContext(StateContext)
  const dispatch = useContext(DispatchContext)

  const totalTime = useMemo(
    () =>
      state.trackers
        .filter((tracker) => tracker.isActive)
        .reduce((previous, current) => previous + calcSum(current.timers), 0),
    [state.trackers, calcSum]
  )

  const openBreakdown = (trackerId: string) => {
    toggleModal(true)
    setBreakdownTrackerId(trackerId)
  }

  const closeBreakdown = () => {
    toggleModal(false)
    setBreakdownTrackerId('')
  }

  const timeoutRef = useRef(0)
  const removedIdRef = useRef('')

  const remove = (trackerId: string) => {
    setRemovedTrackerId(trackerId)
    dispatch(removeTracker(trackerId))
    removedIdRef.current = trackerId

    const id = window.setTimeout(() => {
      setRemovedTrackerId(undefined)

      fetchPost('/api/removeTracker', {
        body: JSON.stringify({ trackerId }),
      })
      timeoutRef.current = 0
    }, 1000 * 10)
    timeoutRef.current = id
  }

  const restore = () => {
    if (removedTrackerId) {
      dispatch(restoreTracker(removedTrackerId))
      setRemovedTrackerId(undefined)
      clearTimeout(timeoutRef.current)
      timeoutRef.current = 0
    }
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current && removedIdRef.current) {
        fetchPost('/api/removeTracker', {
          body: JSON.stringify({ trackerId: removedIdRef.current }),
        })
        clearTimeout(timeoutRef.current)
        timeoutRef.current = 0
        removedIdRef.current = ''
        setRemovedTrackerId(undefined)
      }
    }
  }, [])

  const activeTrackers: ActiveTracker[] = state.trackers
    .filter((tracker) => tracker.isActive)
    .map((tracker) => ({
      id: tracker.id,
      name: tracker.name,
      timers: tracker.timers,
      key: tracker.key,
      isActive: tracker.isActive,
    }))

  return (
    <Component
      {...props}
      removedTrackerId={removedTrackerId}
      restore={restore}
      trackers={state.trackers}
      activeTrackers={activeTrackers}
      openBreakdown={openBreakdown}
      remove={remove}
      closeBreakdown={closeBreakdown}
      breakdownTrackerId={breakdownTrackerId}
      isOpen={isOpen}
      totalTime={totalTime}
    />
  )
}
