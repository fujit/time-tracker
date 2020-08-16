import React from 'react'
import classNames from 'classnames/bind'
import * as styles from './Button.scss'

type Props = {
  children: string
} & JSX.IntrinsicElements['button']

type ContainerProps = {
  colorType?: 'primary' | 'danger'
  children: string
} & JSX.IntrinsicElements['button']

const Component: React.FC<Props> = ({ children, ...props }) => (
  <button type="button" className={styles.button} {...props}>
    {children}
  </button>
)

export const Button: React.FC<ContainerProps> = ({ colorType = 'primary', children, ...props }) => {
  const cx = classNames.bind(styles)
  const className = cx(styles.button, colorType === 'danger' ? styles.danger : styles.primary)
  return (
    <Component {...props} className={className}>
      {children}
    </Component>
  )
}
