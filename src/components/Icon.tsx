import React, { useMemo, VFC } from 'react'
import classNames from 'classnames'

const Component: VFC<JSX.IntrinsicElements['img']> = ({ alt, className, ...props }) => (
  <img {...props} alt={alt} className={classNames(className, 'no-underline select-none')} />
)

type Props = {
  disabled?: boolean
} & JSX.IntrinsicElements['img']

export const EditIcon: VFC<Props> = (props) => (
  <Component {...props} alt="editIcon" src="/images/edit.svg" />
)

export const TrashIcon: VFC<Props> = (props) => (
  <Component {...props} alt="trashIcon" src="/images/trash.svg" />
)

export const CopyIcon: VFC<Props> = (props) => (
  <Component {...props} alt="copy" src="/images/copy.svg" />
)

export const ClipboardIcon: VFC<Props> = (props) => (
  <Component {...props} alt="clipboard-icon" src="/images/clipboard.svg" />
)

export const StartIcon: VFC<Props> = ({ disabled, ...props }) => {
  const className = useMemo(() => (disabled ? 'cursor-not-allowed opacity-50' : ''), [disabled])
  return <Component {...props} className={className} alt="startIcon" src="/images/start.svg" />
}

export const PauseIcon: VFC<Props> = ({ disabled, ...props }) => {
  const className = useMemo(() => (disabled ? 'cursor-not-allowed opacity-50' : ''), [disabled])

  return <Component {...props} className={className} alt="pauseIcon" src="/images/pause.svg" />
}

export const PersonIcon: VFC<Props> = (props) => (
  <Component {...props} alt="personIcon" src="/images/person.svg" />
)
