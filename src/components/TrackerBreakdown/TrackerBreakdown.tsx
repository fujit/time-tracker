import * as React from 'react'
import ReactModal from 'react-modal'
import * as styles from './TrackerBreakdown.scss'
import { CloseButton } from '../Button/CloseButton'
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
  <ReactModal isOpen={isShow} style={modalStyles}>
    <div>
      <h1>{tracker.name}</h1>
      <CloseButton onClick={closeBreakdown} />
    </div>
    <div className={styles.listTimer}>
      <ul>
        {tracker.timers.map((timer) => (
          <li key={DateUtil.format(timer.start, 'YYYYMMDDHHmmssSSS')}>
            <span className={styles.timerStart}>{DateUtil.format(timer.start, 'HH:mm')}</span>
            <span>{timer.end && DateUtil.format(timer.end, 'HH:mm')}</span>
          </li>
        ))}
      </ul>
    </div>
  </ReactModal>
)

export const TrackerBreakdown: React.FC<ContainerProps> = (props) => {
  ReactModal.setAppElement('#app')

  const modalStyles: ReactModal.Styles = {
    content: {
      top: '20%',
      left: '20%',
      right: 'auto',
      bottom: 'auto',
      minWidth: '400px',
      minHeight: '400px',
    },
  }
  return <Component {...props} modalStyles={modalStyles} />
}
