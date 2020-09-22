import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { DecimalText } from '../components/Number'

describe('Decimal Component', () => {
  test('値が反映されること', () => {
    render(<DecimalText value={30} data-testid="number" />)
    expect(screen.getByTestId('number')).toHaveTextContent('30')
  })

  test('デフォルトで小数点0桁で四捨五入すること', () => {
    render(<DecimalText value={30.4} data-testid="number" />)
    expect(screen.getByTestId('number')).toHaveTextContent('30')
  })

  test('小数点第1位で四捨五入すること', () => {
    render(<DecimalText value={13.89} digits={1} data-testid="number" />)
    expect(screen.getByTestId('number')).toHaveTextContent('13.9')
  })

  test('単位を表示できること', () => {
    render(<DecimalText value={33.3333333} digits={2} unit="円" data-testid="number" />)
    expect(screen.getByTestId('number')).toHaveTextContent('33.33円')
  })
})
