import React from 'react'

type Props = {
  children: string
} & JSX.IntrinsicElements['button']

const Component: React.FC<Props> = ({ children, className = '', ...props }) => (
  <button
    type="button"
    // eslint-disable-next-line max-len
    className={`${className} text-white active:bg-green-600 select-none font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 disabled:cursor-not-allowed disabled:opacity-50`}
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
