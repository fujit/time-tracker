import React from 'react'
import classNames from 'classnames/bind'
import * as styles from './Icon.scss'
import edit from '../../assets/img/edit.svg'

type Props = {
  className?: string
} & JSX.IntrinsicElements['img']

export const EditIcon: React.FC<Props> = ({ className, ...props }) => (
  <img
    {...props}
    className={classNames.bind(styles)('icon', className)}
    src={edit}
    alt="copy_icon"
  />
)
