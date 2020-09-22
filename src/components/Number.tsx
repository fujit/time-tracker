import React from 'react'

type Props = {
  className?: string
  value: string
} & JSX.IntrinsicElements['span']

const Component: React.FC<Props> = ({ className, value, ...props }) => (
  <span className={className} {...props}>
    {value}
  </span>
)

type ContainerProps = {
  className?: string
  value: number
  digits?: number
  unit?: string
} & JSX.IntrinsicElements['span']

export const DecimalText: React.FC<ContainerProps> = ({
  className,
  value,
  digits,
  unit,
  ...props
}) => {
  const calculatedValue = value.toFixed(digits)
  const displayValue = unit ? `${calculatedValue}${unit}` : calculatedValue

  return <Component value={displayValue} className={className} {...props} />
}
