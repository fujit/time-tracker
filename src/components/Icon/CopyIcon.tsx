import * as React from 'react'
import classNames from 'classnames/bind'
import * as styles from './Icon.scss'
import copy from '../../assets/img/copy.svg'

type Props = {
  className?: string
} & JSX.IntrinsicElements['img']

export const CopyIcon: React.FC<Props> = ({ className, ...props }) => (
  <img
    {...props}
    className={classNames.bind(styles)('icon', className)}
    src={copy}
    alt="copy_icon"
  />
)
