import React from 'react'
import * as styles from './TrackerForm.scss'
import { Actions } from '../../reducer'
import { TextInput } from '../Input/Input'
import { StartIcon } from '../Icon/Icon'
// import { StartIcon } from '../Icon/PlayIcon'
import { keycode, validate } from '../../utils/Constants'
import * as DateUtil from '../../utils/DateUtil'
import { start } from '../../actionCreators'

type Props = {
  inProgressId: string | undefined
  dispatch: React.Dispatch<Actions>
  calculateCurrentCount: (currentDate: Date) => void
  today: string
} & JSX.IntrinsicElements['input']

export const TrackerForm: React.FC<Props> = ({
  inProgressId,
  dispatch,
  calculateCurrentCount,
  today,
  ...props
}) => {
  const [trackerName, setTrackerName] = React.useState('')

  const isValidName = React.useMemo(
    () => !!trackerName && trackerName.length <= validate.trackerName.length,
    [trackerName]
  )

  const changeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTrackerName(event.target.value)
  }

  const startMeasure = () => {
    // TODO: 登録済みの名前はだめ
    if (inProgressId || !isValidName) {
      return
    }

    setTrackerName('')

    const currentDate = DateUtil.getCurrentDate()
    dispatch(start(trackerName, today, currentDate))
    calculateCurrentCount(currentDate)
  }

  const keyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === keycode.enter) {
      startMeasure()
    }
  }

  return (
    <div className={styles.main}>
      <TextInput
        {...props}
        disabled={!!inProgressId}
        size={60}
        value={trackerName}
        maxLength={validate.trackerName.length}
        onChange={changeValue}
        onKeyDown={keyDown}
      />
      <StartIcon
        width={42}
        height={42}
        onClick={startMeasure}
        disabled={!!(inProgressId || !isValidName)}
      />
    </div>
  )
}
