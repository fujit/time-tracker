import React from 'react'

type Props = {
  className?: string
  value: string
}

const Component: React.FC<Props> = ({ className, value }) => (
  <span data-testid="number" className={className}>
    {value}
  </span>
)

type ContainerProps = {
  className?: string
  value: number
  digits?: number
  unit?: string
}

export const DecimalText: React.FC<ContainerProps> = ({ className, value, digits, unit }) => {
  const calculatedValue = value.toFixed(digits)
  const displayValue = unit ? `${calculatedValue}${unit}` : calculatedValue

  return <Component value={displayValue} className={className} />
}
