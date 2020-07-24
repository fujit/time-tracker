import * as React from 'react'
import * as styles from './Button.scss'
import start from '../../assets/img/play-circle-outline.svg'
import pause from '../../assets/img/pause-circle-outline.svg'

type Props = {
  className?: string
  alt: string
} & JSX.IntrinsicElements['img']

type ContainerProps = {
  className?: string
} & JSX.IntrinsicElements['img']

const Component: React.FC<Props> = ({ alt, ...props }) => (
  <img className={styles.play} {...props} alt={alt} />
)

export const StartButton: React.FC<ContainerProps> = (props) => {
  return <Component {...props} src={start} alt="start" />
}

export const PauseButton: React.FC<ContainerProps> = (props) => {
  return <Component {...props} src={pause} alt="pause" />
}
