import * as React from 'react'
import classNames from 'classnames/bind'
import * as styles from './Input.scss'

type Props = {
  className?: string
} & JSX.IntrinsicElements['input']

const Component: React.FC<Props> = ({ className, ...props }) => (
  <input className={classNames.bind(styles)('input', className)} {...props} />
)

export const TextInput: React.FC<Props> = (props) => {
  return <Component {...props} />
}
