import React from 'react'
import { useTimePicker } from '../utils/hooks/useTimePicker'
import { Modal } from './Modal'
import { Input } from './Input'
import { Button } from './Button'

type Props = {
  start: string
  changeStart: (start: string) => void
  end: string
  changeEnd: (end: string) => void
  isValid: boolean
  update: () => void
  isOpen: boolean
  closeModal: () => void
}

const Component: React.FC<Props> = ({
  start,
  changeStart,
  end,
  changeEnd,
  isValid,
  update,
  isOpen,
  closeModal,
}) => (
  <Modal isOpen={isOpen} onRequestClose={closeModal}>
    <div className="flex items-center justify-around">
      <Input
        type="time"
        value={start}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeStart(e.target.value)}
        isError={!isValid}
      />
      <Input
        type="time"
        value={end}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeEnd(e.target.value)}
        isError={!isValid}
      />
    </div>
    <div className="flex items-center justify-around mt-4">
      <Button disabled={!isValid} onClick={update}>
        更新する
      </Button>
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
  const [start, changeStart, end, changeEnd, isValid] = useTimePicker(timer.start, timer.end)

  const update = () => {
    if (!isValid || !timer.end) {
      return
    }

    updatePastTime(start, end)
  }

  return <Component {...{ start, changeStart, end, changeEnd, isValid, update }} {...props} />
}
