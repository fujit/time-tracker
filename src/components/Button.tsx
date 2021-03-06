import React, { FC } from 'react'
import classNames from 'classnames'

type Props = {
  children: string
} & JSX.IntrinsicElements['button']

const Component: FC<Props> = ({ children, className = '', ...props }) => (
  <button
    type="button"
    className={classNames(
      'text-white active:bg-green-600 select-none font-bold uppercase text-xs px-4 py-2 rounded shadow outline-none mr-1 mb-1',
      'hover:shadow-md',
      'disabled:cursor-not-allowed disabled:opacity-50',
      className
    )}
    style={{ transition: 'all .15s ease' }}
    {...props}
  >
    {children}
  </button>
)

type ContainerProps = {
  colorType?: 'primary' | 'danger'
  children: string
} & JSX.IntrinsicElements['button']

export const Button: FC<ContainerProps> = ({
  colorType = 'primary',
  children,
  className,
  ...props
}) => {
  const backgroundColor = colorType === 'danger' ? 'bg-red-500' : 'bg-green-500'
  return (
    <Component {...props} className={classNames(className, backgroundColor)}>
      {children}
    </Component>
  )
}
