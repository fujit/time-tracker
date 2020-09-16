import React from 'react'

const InputComponent: React.FC<JSX.IntrinsicElements['input']> = (props) => <input {...props} />

type ContainerProps = {
  hasFrame?: boolean
  isError?: boolean
} & JSX.IntrinsicElements['input']

export const Input: React.FC<ContainerProps> = ({
  hasFrame = true,
  isError = false,
  className = '',
  ...props
}) => {
  const borderColor = React.useMemo(() => (isError ? 'border-red-500' : 'border-gray-500'), [
    isError,
  ])
  const border = React.useMemo(() => (hasFrame || isError ? 'border' : ''), [hasFrame, isError])

  return (
    <InputComponent
      // eslint-disable-next-line max-len
      className={`${className} h-10 p-4 text-base ${border} border-solid ${borderColor} rounded-lg outline-none box-border disabled:cursor-not-allowed focus:${borderColor} focus:border`}
      {...props}
    />
  )
}
