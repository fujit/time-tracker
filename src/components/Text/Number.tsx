import * as React from 'react'

type ContainerProps = {
  value: number
  type?: 'round' | 'ceil' | 'floor'
  // TODO: 桁指定
}

type Props = {
  value: number
}

const Component: React.FC<Props> = ({ value }) => <span>{value}</span>

export const Number: React.FC<ContainerProps> = ({ value, type }) => {
  const calculatedValue =
    type === 'round'
      ? Math.round(value * 10) / 10
      : type === 'ceil'
      ? Math.ceil(value)
      : type === 'floor'
      ? Math.floor(value)
      : value

  return <Component value={calculatedValue} />
}
