import React, { FC, useMemo } from 'react'
import type { ChangeEvent } from 'react'
import { useTimePicker } from '../utils/hooks/useTimePicker'
import { TimePicker } from './TimePicker'
import { Modal } from './Modal'
import { Button } from './Button'

type Props = {
  start: Time
  end: Time
  changeStartHour: (value: string) => void
  changeStartMinute: (value: string) => void
  changeEndHour: (value: string) => void
  changeEndMinute: (value: string) => void
  isValid: boolean
  update: () => void
  isOpen: boolean
  closeModal: () => void
}

const Component: FC<Props> = ({
  start,
  changeStartHour,
  changeStartMinute,
  end,
  changeEndHour,
  changeEndMinute,
  isValid,
  update,
  isOpen,
  closeModal,
}) => (
  <Modal isOpen={isOpen} onRequestClose={closeModal}>
    <div className="flex items-center justify-content">
      <TimePicker
        className="mr-6"
        hour={start.hour}
        minute={start.minute}
        changeHour={(event) => changeStartHour(event.target.value)}
        changeMinute={(event) => changeStartMinute(event.target.value)}
        isValid={isValid}
      />
      <TimePicker
        hour={end.hour}
        minute={end.minute}
        changeHour={(event) => changeEndHour(event.target.value)}
        changeMinute={(event) => changeEndMinute(event.target.value)}
        isValid={isValid}
      />
    </div>
    <div className="flex items-center justfy-around mt-4">
      <Button disabled={!isValid} onClick={update}>
        更新する
      </Button>
    </div>
  </Modal>
)

type ContainerProps = {
  timer: Timer
  updatePastTime: (startTime: string, endTime: string) => void
  isOpen: boolean
  closeModal: () => void
}

export const TimeEditor: FC<ContainerProps> = ({ timer, updatePastTime, ...props }) => {
  const [start, changeStartHour, changeStartMinute, isValidStart] = useTimePicker(timer.start)
  const [end, changeEndHour, changeEndMinute, isValidEnd] = useTimePicker(timer.end)

  const isValid = useMemo(
    () =>
      !!(
        isValidStart &&
        isValidEnd &&
        `${start.hour}:${start.minute}` <= `${end.hour}:${end.minute}`
      ),
    [start, end, isValidStart, isValidEnd]
  )

  const update = () => {
    if (!isValid || !timer.end) {
      return
    }

    updatePastTime(`${start.hour}:${start.minute}`, `${end.hour}:${end.minute}`)
  }

  return (
    <Component
      {...{
        start,
        end,
        changeStartHour,
        changeStartMinute,
        changeEndHour,
        changeEndMinute,
        isValid,
        update,
      }}
      {...props}
    />
  )
}
