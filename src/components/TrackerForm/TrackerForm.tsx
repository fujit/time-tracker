import * as React from 'react'
import * as styles from './TrackerForm.scss'
import { Actions } from '../../reducer'
import { TextInput } from '../Input/TextInput'
import { StartIcon } from '../Icon/PlayIcon'
import { keycode, validate } from '../../utils/Constants'
import { start } from '../../actionCreators'

type Props = {
  inProgress: boolean
  dispatch: React.Dispatch<Actions>
  today: string
} & JSX.IntrinsicElements['input']

export const TrackerForm: React.FC<Props> = ({ inProgress, dispatch, today, ...props }) => {
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
    if (inProgress || !isValidName) {
      return
    }

    setTrackerName('')
    dispatch(start(trackerName, today))
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
        disabled={inProgress}
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
        className={inProgress || !isValidName ? 'disable' : ''}
      />
    </div>
  )
}
