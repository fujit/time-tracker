import React from 'react'
import { Actions } from '../../reducer'
import * as styles from './TrackerBreakdown.scss'
import { Modal } from '../Modal/Modal'
import { TimerEdit } from './TimerEdit'
import { CloseIcon } from '../Icon/CloseIcon'
import { EditIcon } from '../Icon/EditIcon'
import * as DateUtil from '../../utils/DateUtil'

type Props = {
  modalStyles: ReactModal.Styles
  isTimerEdit: boolean
  openTimerEdit: (timer: Timer) => void
  closeTimerEdit: () => void
  editableTimer?: Timer
} & ContainerProps

type ContainerProps = {
  tracker: Tracker
  isShow: boolean
  closeBreakdown: () => void
  dispatch: React.Dispatch<Actions>
}

const Component: React.FC<Props> = ({
  tracker,
  isShow,
  modalStyles,
  closeBreakdown,
  isTimerEdit,
  openTimerEdit,
  closeTimerEdit,
  editableTimer,
  dispatch,
}) => (
  <Modal id="#app" isOpen={isShow} style={modalStyles} onRequestClose={closeBreakdown}>
    {editableTimer && (
      <TimerEdit
        trackerId={tracker.id}
        isOpen={isTimerEdit}
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

export const TrackerBreakdown: React.FC<ContainerProps> = (props) => {
  const [isTimerEdit, setIsTimerEdit] = React.useState(false)
  const [editableTimer, setEditableTimer] = React.useState<undefined | Timer>(undefined)

  const openTimerEdit = (timer: Timer) => {
    if (timer.end) {
      setIsTimerEdit(true)
      setEditableTimer(timer)
    }
  }

  const closeTimerEdit = () => {
    setIsTimerEdit(false)
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
      isTimerEdit={isTimerEdit}
      openTimerEdit={openTimerEdit}
      closeTimerEdit={closeTimerEdit}
      editableTimer={editableTimer}
    />
  )
}
