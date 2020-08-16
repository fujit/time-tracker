import React from 'react'
import { Actions } from '../../reducer'
import * as styles from './TrackerBreakdown.scss'
import { Modal } from '../Modal/Modal'
import { Button } from '../Button/Button'
import { TimeInput } from '../Input/Input'
import * as DateUtil from '../../utils/DateUtil'
import { updateTimer } from '../../actionCreators'

type ContainerProps = {
  timer: Timer
  trackerId: string
  dispatch: React.Dispatch<Actions>
  isOpen: boolean
  closeModal: () => void
}

type Props = {
  start: string
  end: string
  changeStart: (event: React.ChangeEvent<HTMLInputElement>) => void
  changeEnd: (event: React.ChangeEvent<HTMLInputElement>) => void
  update: () => void
  isOpen: boolean
  closeModal: () => void
  modalStyles: ReactModal.Styles
  isValidTimer: boolean
}

const Component: React.FC<Props> = ({
  start,
  end,
  changeStart,
  changeEnd,
  update,
  isOpen,
  modalStyles,
  closeModal,
  isValidTimer,
}) => (
  <Modal id="#app" isOpen={isOpen} style={modalStyles} onRequestClose={closeModal}>
    <div className={styles.editTime}>
      <TimeInput value={start} isError={!isValidTimer} onChange={changeStart} />
      <TimeInput value={end} isError={!isValidTimer} onChange={changeEnd} />
    </div>
    <div className={styles.editTimeButton}>
      <Button disabled={!isValidTimer} onClick={update}>
        更新する
      </Button>
      <Button colorType="danger">削除する</Button>
    </div>
  </Modal>
)

export const TimerEdit: React.FC<ContainerProps> = ({ timer, trackerId, dispatch, ...props }) => {
  const [start, setStart] = React.useState(DateUtil.format(timer.start, 'HH:mm'))
  const [end, setEnd] = React.useState(timer.end ? DateUtil.format(timer.end, 'HH:mm') : '')

  const isValidTimer = React.useMemo(() => !!(start && end && start <= end), [start, end])

  const changeStart = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStart(event.target.value)
  }

  const changeEnd = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnd(event.target.value)
  }

  const update = () => {
    if (!isValidTimer || !timer.end) {
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
      start={start}
      end={end}
      changeStart={changeStart}
      changeEnd={changeEnd}
      update={update}
      modalStyles={modalStyles}
      isValidTimer={isValidTimer}
    />
  )
}
