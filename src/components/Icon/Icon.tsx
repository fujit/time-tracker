import React from 'react'
import classNames from 'classnames/bind'
import * as styles from './Icon.scss'
import edit from '../../assets/img/edit.svg'
import copy from '../../assets/img/copy.svg'
import start from '../../assets/img/start.svg'
import pause from '../../assets/img/pause.svg'

const Component: React.FC<JSX.IntrinsicElements['img']> = ({ alt, ...props }) => (
  <img {...props} alt={alt} />
)

type Props = {
  disabled?: boolean
} & JSX.IntrinsicElements['img']

export const EditIcon: React.FC<Props> = (props) => {
  return <Component {...props} className={styles.icon} alt="editIcon" src={edit} />
}

export const CopyIcon: React.FC<Props> = (props) => {
  return <Component {...props} className={styles.icon} alt="copy" src={copy} />
}

export const StartIcon: React.FC<Props> = ({ disabled, ...props }) => {
  const [className, setClassName] = React.useState(props.className)

  React.useEffect(() => {
    const cx = classNames.bind(styles)
    setClassName(cx(styles.icon, disabled ? styles.disable : ''))
  }, [disabled])

  return <Component {...props} className={className} alt="startIcon" src={start} />
}

export const PauseIcon: React.FC<Props> = ({ disabled, ...props }) => {
  const [className, setClassName] = React.useState(props.className)

  React.useEffect(() => {
    const cx = classNames.bind(styles)
    setClassName(cx(styles.icon, disabled ? styles.disable : ''))
  }, [disabled])

  return <Component {...props} className={className} alt="pauseIcon" src={pause} />
}
