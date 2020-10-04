import React, { FC, useMemo, useContext } from 'react'
import { StateContext } from '../../utils/contexts/StoreContext'
import { DecimalText } from '../Number'
import { TrackerName } from './TrackerName'
import { TrackerControl } from './TrackerControl'
import { TrackerButton } from './TrackerButton'
import { useTrackerCalc } from '../../utils/hooks/useTrackerCalc'
import { useTrackerForm } from '../../utils/hooks/useTrackerForm'

type Props = {
  tracker: Tracker
  changeTrackerName: (value: string) => void
  isValid: boolean
  removeTracker: (trackerId: string) => void
  openBreakdown: () => void
  inProgressId: string | undefined
  calculateCurrentCount: (currentDate: Date) => void
  pauseTimer: () => void
  totalTime: number
}

const TrackerItemComponent: FC<Props> = ({
  tracker,
  changeTrackerName,
  isValid,
  removeTracker,
  openBreakdown,
  inProgressId,
  calculateCurrentCount,
  pauseTimer,
  totalTime,
}) => (
  <div className="flex flex-col h-16 mb-8">
    <div className="flex items-center hover-opacity-parent" data-testid="items">
      <TrackerName
        trackerId={tracker.id}
        trackerName={tracker.name}
        changeTrackerName={changeTrackerName}
        isValid={isValid}
      />
      <TrackerButton
        trackerId={tracker.id}
        inProgress={tracker.inProgress}
        removeTracker={removeTracker}
        openBreakdown={openBreakdown}
      />
      <DecimalText className="w-8 mr-4" value={totalTime / 60} digits={1} unit="h" />
      <TrackerControl {...{ tracker, inProgressId, isValid, calculateCurrentCount, pauseTimer }} />
    </div>
    {!isValid && (
      <p className="mt-2 text-red-500" role="alert">
        validate error
      </p>
    )}
  </div>
)

type ContainerProps = {
  tracker: Tracker
  currentCount?: number
  calculateCurrentCount: (currentDate: Date) => void
  pauseTimer: () => void
  openBreakdown: (trackerId: string) => void
  removeTracker: (trackerId: string) => void
}

export const TrackerItem: FC<ContainerProps> = ({
  tracker,
  currentCount,
  calculateCurrentCount,
  pauseTimer,
  openBreakdown,
  removeTracker,
}) => {
  const state = useContext(StateContext)
  const [trackerName, isValid, changeTrackerName] = useTrackerForm(tracker.name)

  const calcSum = useTrackerCalc()
  const sum = useMemo(() => calcSum(tracker.timers), [tracker.timers, calcSum])
  const totalTime = useMemo(() => (tracker.inProgress && currentCount ? sum + currentCount : sum), [
    sum,
    currentCount,
    tracker.inProgress,
  ])

  return (
    <TrackerItemComponent
      {...{
        tracker: { ...tracker, ...{ name: trackerName } },
        changeTrackerName,
        isValid,
        removeTracker,
        openBreakdown: () => openBreakdown(tracker.id),
        inProgressId: state.inProgressId,
        calculateCurrentCount,
        pauseTimer,
        totalTime,
      }}
    />
  )
}
