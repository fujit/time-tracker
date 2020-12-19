import React, { VFC } from 'react'
import type { ChangeEvent } from 'react'
import { Input } from './Input'

type Props = {
  hour: string
  minute: string
  changeHour: (event: ChangeEvent<HTMLInputElement>) => void
  changeMinute: (event: ChangeEvent<HTMLInputElement>) => void
  isValid: boolean
  className?: string
}

export const TimePicker: VFC<Props> = ({
  hour,
  minute,
  changeHour,
  changeMinute,
  isValid,
  className,
}) => (
  <div className={className}>
    <Input
      className="h-20 mr-2 text-4xl text-center"
      type="text"
      size={2}
      value={hour}
      onChange={changeHour}
      isError={!isValid}
    />
    <span className="text-5xl">:</span>
    <Input
      className="h-20 ml-2 text-4xl text-center"
      type="text"
      size={2}
      value={minute}
      onChange={changeMinute}
      isError={!isValid}
    />
  </div>
)
