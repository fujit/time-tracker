import React from 'react'

type Props = {
  children: string
} & JSX.IntrinsicElements['button']

const Component: React.FC<Props> = ({ children, className, ...props }) => (
  <button
    type="button"
    // eslint-disable-next-line max-len
    className={`${className} inline-block text-sm text-white cursor-pointer select-none outline-none rounded shadow p-2 disabled:cursor-not-allowed disabled:opacity-50`}
    {...props}
  >
    {children}
  </button>
)

type ContainerProps = {
  colorType?: 'primary' | 'danger'
  children: string
} & JSX.IntrinsicElements['button']

export const Button: React.FC<ContainerProps> = ({
  colorType = 'primary',
  children,
  className,
  ...props
}) => {
  const backgroundColor = colorType === 'danger' ? 'bg-red-500' : 'bg-green-500'
  return (
    <Component {...props} className={`${className} ${backgroundColor}`}>
      {children}
    </Component>
  )
}
