import * as React from 'react'
import * as styles from './Button.scss'

type Props = {
  children: string
} & JSX.IntrinsicElements['a']

export const Button: React.FC<Props> = ({ children, ...props }) => (
  <>
    <a className={styles.button} {...props}>
      {children}
    </a>
  </>
)
