import React, { FC, ReactNode } from 'react'
import classNames from 'classnames'

type Props = {
  title?: string
  children: ReactNode
  className?: string
}

const PopoversComponent: FC<Props> = ({ children, className }) => (
  <div
    className={classNames(
      'border border-solid border-gray-100 rounded absolute bg-white text-sm',
      className
    )}
  >
    {children}
  </div>
)

const PopoversWithTitleComponent: FC<Props> = ({ title, children, className }) => (
  <div
    className={classNames(
      'border border-solid border-gray-100 rounded absolute bg-white text-sm',
      className
    )}
  >
    <h3 className="p-2 border-b border-gray-100 bg-gray-50">{title}</h3>
    <div>{children}</div>
  </div>
)

export const Popovers: FC<Props> = ({ title, children, className }) => {
  return title ? (
    <PopoversWithTitleComponent title={title} className={className}>
      {children}
    </PopoversWithTitleComponent>
  ) : (
    <PopoversComponent className={className}>{children}</PopoversComponent>
  )
}
