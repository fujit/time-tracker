import React from 'react'
import classNames from 'classnames/bind'
import * as styles from './Icon.scss'
import start from '../../assets/img/play-circle-outline.svg'
import pause from '../../assets/img/pause-circle-outline.svg'

type Props = {
  className?: string
  alt: string
} & JSX.IntrinsicElements['img']

type ContainerProps = {
  // TODO: styles で指定できるものに限定したい
  className?: string
} & JSX.IntrinsicElements['img']

const Component: React.FC<Props> = ({ alt, ...props }) => <img {...props} alt={alt} />

export const StartIcon: React.FC<ContainerProps> = (props) => {
  return (
    <Component
      {...props}
      src={start}
      alt="start"
      className={classNames.bind(styles)('icon', props.className)}
    />
  )
}

export const PauseIcon: React.FC<ContainerProps> = (props) => {
  return (
    <Component
      {...props}
      src={pause}
      alt="pause"
      className={classNames.bind(styles)('icon', props.className)}
    />
  )
}
