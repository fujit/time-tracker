import React, { VFC, useState, useContext, useCallback } from 'react'
import { StateContext, DispatchContext } from '../utils/contexts/StoreContext'
import { useModal } from '../utils/hooks/useModal'
import { Modal } from './Modal'
import { TimeEditor } from './TimeEditor'
import { CloseIcon } from './CloseIcon'
import { EditIcon, TrashIcon } from './Icon'
import * as DateUtil from '../utils/DateUtil'
import { fetchPost } from '../utils/Fetch'
import { updateTimer, deleteTimer } from '../actionCreators'

type Props = {
  isOpen: boolean
  openTimerEdit: (timer: CalculatedTimer) => void
  closeTimerEdit: () => void
  editableTimer?: CalculatedTimer
  updatePastTime: (start: string, end: string) => void
  isCalculatedTimer: (timer: Timer) => timer is CalculatedTimer
  tracker: Tracker
  isBreakdownOpen: boolean
  closeBreakdown: () => void
  deleteTrackerTimer: (timerId: string) => void
}

const Component: VFC<Props> = ({
  closeBreakdown,
  isBreakdownOpen,
  tracker,
  isOpen,
  closeTimerEdit,
  editableTimer,
  openTimerEdit,
  updatePastTime,
  isCalculatedTimer,
  deleteTrackerTimer,
}) => (
  <Modal isOpen={isBreakdownOpen} onRequestClose={closeBreakdown}>
    {editableTimer && (
      <TimeEditor
        isOpen={isOpen}
        closeModal={closeTimerEdit}
        timer={editableTimer}
        updatePastTime={updatePastTime}
      />
    )}
    <div className="w-11/12">
      <h1 className="text-xl">{tracker.name}</h1>
      <CloseIcon onClick={closeBreakdown} />
    </div>
    <div>
      <ul className="list-none">
        {tracker.timers.map((timer) => (
          <li key={DateUtil.format(timer.start, 'YYYYMMDDHHmmssSSS')} className="flex m-3">
            <span className="timer-start">{DateUtil.format(timer.start, 'HH:mm')}</span>
            <span>{timer.end && DateUtil.format(timer.end, 'HH:mm')}</span>
            {isCalculatedTimer(timer) && (
              <div className="flex items-center">
                <button onClick={() => openTimerEdit(timer)}>
                  <EditIcon className="ml-4" width={16} height={16} />
                </button>
                <button onClick={() => deleteTrackerTimer(timer.id)}>
                  <TrashIcon className="ml-4" width={16} height={16} />
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  </Modal>
)

type ContainerProps = {
  trackerId: string
  isBreakdownOpen: boolean
  closeBreakdown: () => void
}

export const TrackerBreakdown: VFC<ContainerProps> = ({ trackerId, ...props }) => {
  const [editableTimer, setEditableTimer] = useState<undefined | CalculatedTimer>(undefined)
  const [isOpen, toggleModal] = useModal()
  const state = useContext(StateContext)
  const dispatch = useContext(DispatchContext)

  // TODO: as 修正
  const selectedTracker = state.trackers.find((tracker) => tracker.id === trackerId) as Tracker

  const openTimerEdit = (timer: CalculatedTimer) => {
    if (timer.end) {
      toggleModal(true)
      setEditableTimer(timer)
    }
  }

  const closeTimerEdit = useCallback(() => {
    toggleModal(false)
    setEditableTimer(undefined)
  }, [toggleModal])

  const updatePastTime = useCallback(
    (start: string, end: string) => {
      if (!editableTimer) {
        return
      }

      const updatedStart = DateUtil.updateTime(editableTimer.start, start)
      const updatedEnd = DateUtil.updateTime(editableTimer.end, end)
      const updatedTimer: Timer = {
        id: editableTimer.id,
        start: updatedStart,
        end: updatedEnd,
        minute: DateUtil.getDiff(updatedStart, updatedEnd, 'minute', true),
      }

      dispatch(updateTimer(trackerId, updatedTimer))
      closeTimerEdit()

      fetchPost('/api/updateTimer', {
        body: JSON.stringify({ trackerId, updatedTimer }),
      })
    },
    [editableTimer, trackerId, closeTimerEdit, dispatch]
  )

  const isCalculatedTimer = (timer: Timer): timer is CalculatedTimer => {
    return timer.end !== undefined && timer.minute !== undefined
  }

  const deleteTrackerTimer = (timerId: string) => {
    dispatch(deleteTimer(trackerId, timerId))

    fetchPost('/api/deleteTimer', {
      body: JSON.stringify({ trackerId, timerId }),
    })
  }

  return (
    <Component
      {...props}
      tracker={selectedTracker}
      isOpen={isOpen}
      openTimerEdit={openTimerEdit}
      closeTimerEdit={closeTimerEdit}
      editableTimer={editableTimer}
      updatePastTime={updatePastTime}
      isCalculatedTimer={isCalculatedTimer}
      deleteTrackerTimer={deleteTrackerTimer}
    />
  )
}
