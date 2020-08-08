import * as React from 'react'
import * as styles from './TrackerForm.scss'
import { TextInput } from '../Input/TextInput'
import { StartIcon } from '../Icon/PlayIcon'
import { keycode, validate } from '../../utils/Constants'

type Props = {
  startCount: () => void
  inProgress: boolean
  isValidName: boolean
} & JSX.IntrinsicElements['input']

type ContainerProps = {
  inProgress: boolean
  startCount: (trackerName: string) => void
} & JSX.IntrinsicElements['input']

const Component: React.FC<Props> = ({ startCount, inProgress, isValidName, ...props }) => (
  <div className={styles.main}>
    <TextInput {...props} disabled={inProgress} size={60} maxLength={validate.trackerName.length} />
    <StartIcon
      width={42}
      height={42}
      onClick={startCount}
      className={inProgress || !isValidName ? 'disable' : ''}
    />
  </div>
)

export const TrackerForm: React.FC<ContainerProps> = (props) => {
  const [trackerName, setTrackerName] = React.useState('')

  const isValidName = React.useMemo(
    () => !!trackerName && trackerName.length <= validate.trackerName.length,
    [trackerName]
  )

  const changeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTrackerName(event.target.value)
  }

  const startCount = () => {
    if (props.inProgress) {
      return
    }

    if (!isValidName) {
      return
    }

    setTrackerName('')
    props.startCount(trackerName)
  }

  const keyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === keycode.enter) {
      startCount()
    }
  }

  return (
    <Component
      {...props}
      startCount={startCount}
      isValidName={isValidName}
      onChange={changeValue}
      onKeyDown={keyDown}
      value={trackerName}
    />
  )
}
