import React from 'react'
import { Actions } from '../../reducer'
import { useModal } from '../../utils/useModal'
import * as styles from './TrackerBreakdown.scss'
import { Modal } from '../Modal/Modal'
import { TimerEdit } from './TimerEdit'
import { CloseIcon } from '../Icon/CloseIcon'
import { EditIcon } from '../Icon/Icon'
import * as DateUtil from '../../utils/DateUtil'

type Props = {
  modalStyles: ReactModal.Styles
  isOpen: boolean
  openTimerEdit: (timer: Timer) => void
  closeTimerEdit: () => void
  editableTimer?: Timer
} & ContainerProps

const Component: React.FC<Props> = ({
  modalStyles,
  closeBreakdown,
  isBreakdownOpen,
  tracker,
  isOpen,
  closeTimerEdit,
  editableTimer,
  dispatch,
  openTimerEdit,
}) => (
  <Modal id="#app" isOpen={isBreakdownOpen} style={modalStyles} onRequestClose={closeBreakdown}>
    {editableTimer && (
      <TimerEdit
        trackerId={tracker.id}
        isOpen={isOpen}
        closeModal={closeTimerEdit}
        timer={editableTimer}
        dispatch={dispatch}
      />
    )}
    <div className={styles.header}>
      <h1>{tracker.name}</h1>
      <CloseIcon onClick={closeBreakdown} />
    </div>
    <div className={styles.listTimer}>
      <ul>
        {tracker.timers.map((timer) => (
          <li key={DateUtil.format(timer.start, 'YYYYMMDDHHmmssSSS')} className={styles.list}>
            <span className={styles.timerStart}>{DateUtil.format(timer.start, 'HH:mm')}</span>
            <span>{timer.end && DateUtil.format(timer.end, 'HH:mm')}</span>
            {timer.end && <EditIcon width={16} height={16} onClick={() => openTimerEdit(timer)} />}
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

export const TrackerBreakdown: React.FC<ContainerProps> = (props) => {
  const [editableTimer, setEditableTimer] = React.useState<undefined | Timer>(undefined)
  const [isOpen, openModal, closeModal] = useModal()

  const openTimerEdit = (timer: Timer) => {
    if (timer.end) {
      openModal()
      setEditableTimer(timer)
    }
  }

  const closeTimerEdit = () => {
    closeModal()
    setEditableTimer(undefined)
  }

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
  return (
    <Component
      {...props}
      modalStyles={modalStyles}
      isOpen={isOpen}
      openTimerEdit={openTimerEdit}
      closeTimerEdit={closeTimerEdit}
      editableTimer={editableTimer}
    />
  )
}
