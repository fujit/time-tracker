import React from 'react'
import classNames from 'classnames/bind'
import * as styles from './Input.scss'

type ContainerProps = {
  hasFrame?: boolean
  isError?: boolean
} & JSX.IntrinsicElements['input']

const Component: React.FC<JSX.IntrinsicElements['input']> = (props) => <input {...props} />

export const TextInput: React.FC<ContainerProps> = ({
  hasFrame = true,
  isError = false,
  ...props
}) => {
  const cx = classNames.bind(styles)
  const className = cx(
    styles.input,
    hasFrame ? '' : styles.noFrame,
    isError ? styles.error : '',
    props.className
  )
  return <Component {...props} className={className} type="text" />
}

export const TimeInput: React.FC<ContainerProps> = ({
  hasFrame = true,
  isError = false,
  ...props
}) => {
  const cx = classNames.bind(styles)
  const className = cx(
    styles.input,
    hasFrame ? '' : styles.noFrame,
    isError ? styles.error : '',
    props.className
  )
  return <Component {...props} className={className} type="time" />
}
