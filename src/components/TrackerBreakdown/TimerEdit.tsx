import React from 'react'
import { Actions } from '../../reducer'
import { useTimePicker } from '../../utils/useTimePicker'
import * as styles from './TrackerBreakdown.scss'
import { Modal } from '../Modal/Modal'
import { Button } from '../Button/Button'
import * as DateUtil from '../../utils/DateUtil'
import { updateTimer } from '../../actionCreators'

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
  trackerId: string
  dispatch: React.Dispatch<Actions>
  isOpen: boolean
  closeModal: () => void
}

export const TimerEdit: React.FC<ContainerProps> = ({ timer, trackerId, dispatch, ...props }) => {
  const [start, end, isValid, renderTimePicker] = useTimePicker(timer.start, timer.end)

  const update = () => {
    if (!isValid || !timer.end) {
      return
    }

    const updatedStart = DateUtil.updateTime(timer.start, start)
    const updatedEnd = DateUtil.updateTime(timer.end, end)

    dispatch(updateTimer(trackerId, timer.id, updatedStart, updatedEnd))
    props.closeModal()
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
