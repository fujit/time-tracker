import * as React from 'react'

type ContainerProps = {
  value: number
  digits?: number
}

type Props = {
  value: string
}

const Component: React.FC<Props> = ({ value }) => <span>{value}</span>

export const DecimalText: React.FC<ContainerProps> = ({ value, digits }) => {
  const calculatedValue = value.toFixed(digits)

  return <Component value={calculatedValue} />
}
