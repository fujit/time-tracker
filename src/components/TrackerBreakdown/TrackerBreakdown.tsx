import React from 'react'
import * as styles from './TrackerBreakdown.scss'
import { Modal } from '../Modal/Modal'
import { CloseIcon } from '../Icon/CloseIcon'
import * as DateUtil from '../../utils/DateUtil'

type Props = {
  modalStyles: ReactModal.Styles
} & ContainerProps

type ContainerProps = {
  tracker: Tracker
  isShow: boolean
  closeBreakdown: () => void
}

const Component: React.FC<Props> = ({ tracker, isShow, modalStyles, closeBreakdown }) => (
  <Modal id="#app" isOpen={isShow} style={modalStyles} onRequestClose={closeBreakdown}>
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
          </li>
        ))}
      </ul>
    </div>
  </Modal>
)

export const TrackerBreakdown: React.FC<ContainerProps> = (props) => {
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
  return <Component {...props} modalStyles={modalStyles} />
}
