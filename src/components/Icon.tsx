import React, { useMemo } from 'react'
import classNames from 'classnames'

const Component: React.FC<JSX.IntrinsicElements['img']> = ({ alt, className, ...props }) => (
  <img
    {...props}
    alt={alt}
    className={classNames(className, 'no-underline cursor-pointer select-none')}
  />
)

type Props = {
  disabled?: boolean
} & JSX.IntrinsicElements['img']

export const EditIcon: React.FC<Props> = (props) => {
  return <Component {...props} alt="editIcon" src="/images/edit.svg" />
}

export const TrashIcon: React.FC<Props> = (props) => {
  return <Component {...props} alt="trashIcon" src="/images/trash.svg" />
}

export const CopyIcon: React.FC<Props> = (props) => {
  return <Component {...props} alt="copy" src="/images/copy.svg" />
}

export const StartIcon: React.FC<Props> = ({ disabled, ...props }) => {
  const className = useMemo(() => (disabled ? 'cursor-not-allowed opacity-50' : ''), [disabled])
  return <Component {...props} className={className} alt="startIcon" src="/images/start.svg" />
}

export const PauseIcon: React.FC<Props> = ({ disabled, ...props }) => {
  const className = useMemo(() => (disabled ? 'cursor-not-allowed opacity-50' : ''), [disabled])

  return <Component {...props} className={className} alt="pauseIcon" src="/images/pause.svg" />
}
