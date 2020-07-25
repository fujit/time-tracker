import * as React from 'react'

type ContainerProps = {
  value: number
  type?: 'round' | 'ceil' | 'floor'
  digits?: number
}

type Props = {
  value: string
}

const Component: React.FC<Props> = ({ value }) => <span>{value}</span>

export const DecimalText: React.FC<ContainerProps> = ({ value, type, digits = 1 }) => {
  const calculatedValue = (type === 'round'
    ? Math.round(value)
    : type === 'ceil'
    ? Math.ceil(value)
    : type === 'floor'
    ? Math.floor(value)
    : value
  ).toFixed(digits)

  return <Component value={calculatedValue} />
}
