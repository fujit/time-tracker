import React from 'react'
import { StateContext } from '../utils/contexts/StoreContext'
import { useModal } from '../utils/hooks/useModal'
import { useTrackerCalc } from '../utils/hooks/useTrackerCalc'
import { TrackerItem } from './TrackerItem'
import { TrackerBreakdown } from './TrackerBreakdown'
import { TrackerCopy } from './TrackerCopy'
import { DecimalText } from './Number'

type Props = {
  trackers: Tracker[]
  openBreakdown: (tracker: Tracker) => void
  closeBreakdown: () => void
  isOpen: boolean
  breakdownTracker?: Tracker
  totalTime: number
} & ContainerProps

const Component: React.FC<Props> = ({
  isOpen,
  openBreakdown,
  breakdownTracker,
  closeBreakdown,
  trackers,
  currentCount,
  calculateCurrentCount,
  pauseTimer,
  today,
  totalTime,
}) => (
  <div className="mt-12">
    {breakdownTracker && (
      <TrackerBreakdown
        isBreakdownOpen={isOpen}
        tracker={breakdownTracker}
        closeBreakdown={closeBreakdown}
      />
    )}
    <div className="flex items-center mb-8">
      <h2 className="mr-4 text-xl">{today} の作業内容</h2>
      <DecimalText value={totalTime / 60} digits={1} unit="h" className="mr-4" />
      <TrackerCopy />
    </div>
    <div>
      {trackers.map((tracker) => (
        <TrackerItem
          key={tracker.id}
          tracker={tracker}
          currentCount={currentCount}
          calculateCurrentCount={calculateCurrentCount}
          pauseTimer={pauseTimer}
          openBreakdown={openBreakdown}
        />
      ))}
    </div>
  </div>
)

type ContainerProps = {
  currentCount?: number
  calculateCurrentCount: (currentDate: Date) => void
  pauseTimer: () => void
  today: string
}

export const TrackerList: React.FC<ContainerProps> = (props) => {
  const [breakdownTracker, setBreakdownTracker] = React.useState<Tracker | undefined>(undefined)
  const [isOpen, toggleModal] = useModal()
  const [calcSum] = useTrackerCalc()
  const state = React.useContext(StateContext)

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

  return (
    <Component
      {...props}
      trackers={state.trackers}
      openBreakdown={openBreakdown}
      closeBreakdown={closeBreakdown}
      breakdownTracker={breakdownTracker}
      isOpen={isOpen}
      totalTime={totalTime}
    />
  )
}
