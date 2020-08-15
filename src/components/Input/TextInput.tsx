import React from 'react'
import classNames from 'classnames/bind'
import * as styles from './Input.scss'

type Props = {
  className?: string
  hasFrame?: boolean
  isError?: boolean
} & JSX.IntrinsicElements['input']

const Component: React.FC<Props> = (props) => <input type="text" {...props} />

export const TextInput: React.FC<Props> = ({ hasFrame = true, isError = false, ...props }) => {
  const cx = classNames.bind(styles)
  const className = cx(
    styles.input,
    hasFrame ? '' : styles.noFrame,
    isError ? styles.error : '',
    props.className
  )
  return <Component {...props} className={className} />
}
