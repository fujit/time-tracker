import React from 'react'
import edit from '../assets/img/edit.svg'
import trash from '../assets/img/trash.svg'
import copy from '../assets/img/copy.svg'
import start from '../assets/img/start.svg'
import pause from '../assets/img/pause.svg'

const Component: React.FC<JSX.IntrinsicElements['img']> = ({ alt, className, ...props }) => (
  <img {...props} alt={alt} className={`${className} no-underline cursor-pointer select-none`} />
)

type Props = {
  disabled?: boolean
} & JSX.IntrinsicElements['img']

export const EditIcon: React.FC<Props> = (props) => {
  return <Component {...props} alt="editIcon" src={edit} />
}

export const TrashIcon: React.FC<Props> = (props) => {
  return <Component {...props} alt="trashIcon" src={trash} />
}

export const CopyIcon: React.FC<Props> = (props) => {
  return <Component {...props} alt="copy" src={copy} />
}

export const StartIcon: React.FC<Props> = ({ disabled, ...props }) => {
  const className = React.useMemo(() => (disabled ? 'cursor-not-allowed opacity-50' : ''), [
    disabled,
  ])
  return <Component {...props} className={className} alt="startIcon" src={start} />
}

export const PauseIcon: React.FC<Props> = ({ disabled, ...props }) => {
  const className = React.useMemo(() => (disabled ? 'cursor-not-allowed opacity-50' : ''), [
    disabled,
  ])

  return <Component {...props} className={className} alt="pauseIcon" src={pause} />
}
