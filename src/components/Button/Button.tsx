import React from 'react'
import * as styles from './Button.scss'

type Props = {
  children: string
} & JSX.IntrinsicElements['button']

export const Button: React.FC<Props> = ({ children, ...props }) => (
  <>
    <button type="button" className={styles.button} {...props}>
      {children}
    </button>
  </>
)
