import * as React from 'react'
import classNames from 'classnames/bind'
import * as styles from './Input.scss'

type Props = {
  className?: string
  hasFrame?: boolean
} & JSX.IntrinsicElements['input']

const Component: React.FC<Props> = (props) => <input {...props} />

export const TextInput: React.FC<Props> = ({ hasFrame = true, ...props }) => {
  const cx = classNames.bind(styles)
  const className = cx(styles.input, hasFrame ? '' : styles.noFrame, props.className)
  return <Component {...props} className={className} />
}
