import React from 'react'
import { useTimePicker } from '../../utils/useTimePicker'
import * as styles from './TrackerBreakdown.scss'
import { Modal } from '../Modal/Modal'
import { Button } from '../Button/Button'

type Props = {
  isValid: boolean
  renderTimePicker: () => JSX.Element
  update: () => void
  isOpen: boolean
  closeModal: () => void
  modalStyles: ReactModal.Styles
}

const Component: React.FC<Props> = ({
  renderTimePicker,
  isValid,
  update,
  isOpen,
  modalStyles,
  closeModal,
}) => (
  <Modal id="#app" isOpen={isOpen} style={modalStyles} onRequestClose={closeModal}>
    <div className={styles.editTime}>{renderTimePicker()}</div>
    <div className={styles.editTimeButton}>
      <Button disabled={!isValid} onClick={update}>
        更新する
      </Button>
      <Button colorType="danger">削除する</Button>
    </div>
  </Modal>
)

type ContainerProps = {
  timer: Timer
  updatePastTime: (s: string, e: string) => void
  isOpen: boolean
  closeModal: () => void
}

export const TimerEdit: React.FC<ContainerProps> = ({ timer, updatePastTime, ...props }) => {
  const [start, end, isValid, renderTimePicker] = useTimePicker(timer.start, timer.end)

  const update = () => {
    if (!isValid || !timer.end) {
      return
    }

    updatePastTime(start, end)
  }

  const modalStyles: ReactModal.Styles = {
    content: {
      top: '30%',
      left: '30%',
      right: 'auto',
      bottom: 'auto',
      width: '300px',
      height: '150px',
    },
  }

  return (
    <Component
      {...props}
      isValid={isValid}
      renderTimePicker={renderTimePicker}
      update={update}
      modalStyles={modalStyles}
    />
  )
}
