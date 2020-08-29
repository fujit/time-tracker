import React from 'react'
import { Actions } from '../reducer'
import { useModal } from '../utils/hooks/useModal'
import { Modal } from './Modal'
import { TimerEdit } from './TimerEdit'
import { CloseIcon } from './CloseIcon'
import { EditIcon } from './Icon'
import * as DateUtil from '../utils/DateUtil'
import { updateTimer } from '../actionCreators'

type Props = {
  modalStyles: ReactModal.Styles
  isOpen: boolean
  openTimerEdit: (timer: CalculatedTimer) => void
  closeTimerEdit: () => void
  editableTimer?: CalculatedTimer
  updatePastTime: (start: string, end: string) => void
  isCalculatedTimer: (timer: Timer) => timer is CalculatedTimer
  tracker: Tracker
  isBreakdownOpen: boolean
  closeBreakdown: () => void
}

const Component: React.FC<Props> = ({
  modalStyles,
  closeBreakdown,
  isBreakdownOpen,
  tracker,
  isOpen,
  closeTimerEdit,
  editableTimer,
  openTimerEdit,
  updatePastTime,
  isCalculatedTimer,
}) => (
  <Modal id="#app" isOpen={isBreakdownOpen} style={modalStyles} onRequestClose={closeBreakdown}>
    {editableTimer && (
      <TimerEdit
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
              <EditIcon
                className="ml-4"
                width={16}
                height={16}
                onClick={() => openTimerEdit(timer)}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  </Modal>
)

type ContainerProps = {
  tracker: Tracker
  isBreakdownOpen: boolean
  closeBreakdown: () => void
  dispatch: React.Dispatch<Actions>
}

export const TrackerBreakdown: React.FC<ContainerProps> = ({ tracker, dispatch, ...props }) => {
  const [editableTimer, setEditableTimer] = React.useState<undefined | CalculatedTimer>(undefined)
  const [isOpen, toggleModal] = useModal()

  const openTimerEdit = (timer: CalculatedTimer) => {
    if (timer.end) {
      toggleModal(true)
      setEditableTimer(timer)
    }
  }

  const closeTimerEdit = () => {
    toggleModal(false)
    setEditableTimer(undefined)
  }

  const updatePastTime = React.useCallback(
    (start: string, end: string) => {
      if (!editableTimer) {
        return
      }

      const updatedStart = DateUtil.updateTime(editableTimer.start, start)
      const updatedEnd = DateUtil.updateTime(editableTimer.end, end)

      dispatch(updateTimer(tracker.id, editableTimer.id, updatedStart, updatedEnd))
      closeTimerEdit()
      // TODO: state で無理やり更新？？
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [editableTimer, tracker]
  )

  const modalStyles: ReactModal.Styles = {
    content: {
      top: '20%',
      left: '20%',
      right: 'auto',
      bottom: 'auto',
      minWidth: '400px',
      minHeight: '400px',
      maxHeight: '600px',
      maxWidth: '900px',
    },
  }

  const isCalculatedTimer = (timer: Timer): timer is CalculatedTimer => {
    return timer.end !== undefined && timer.minute !== undefined
  }

  return (
    <Component
      {...props}
      tracker={tracker}
      modalStyles={modalStyles}
      isOpen={isOpen}
      openTimerEdit={openTimerEdit}
      closeTimerEdit={closeTimerEdit}
      editableTimer={editableTimer}
      updatePastTime={updatePastTime}
      isCalculatedTimer={isCalculatedTimer}
    />
  )
}
