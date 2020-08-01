import * as React from 'react'
import classNames from 'classnames/bind'
import * as styles from './Button.scss'

type Props = JSX.IntrinsicElements['a']

export const CloseButton: React.FC<Props> = (props) => (
  <a {...props} className={classNames.bind(styles)('icon', 'close')}>
    x
  </a>
)
