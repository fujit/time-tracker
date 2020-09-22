import React, { forwardRef } from 'react'
import classNames from 'classnames/'

type ContainerProps = {
  isError?: boolean
} & JSX.IntrinsicElements['input']

export const Input: React.FC<ContainerProps> = ({ isError = false, className = '', ...props }) => (
  <input className={classNames('input', className, isError ? 'error' : '')} {...props} />
)

export const ForwardedInput = forwardRef(
  (props: ContainerProps, ref: React.Ref<HTMLInputElement> | null) => {
    const { isError, className, ...inputProps } = props

    return (
      <input
        ref={ref}
        {...inputProps}
        className={classNames('input', className, isError ? 'error' : '')}
      />
    )
  }
)

ForwardedInput.defaultProps = {
  isError: false,
}
