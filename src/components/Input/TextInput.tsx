import * as React from 'react'
import * as styles from './Input.scss'

type Props = {
  className?: string
} & JSX.IntrinsicElements['input']

const Component: React.FC<Props> = (props) => <input className={styles.input} {...props} />

export const TextInput: React.FC<Props> = (props) => {
  return <Component {...props} />
}
