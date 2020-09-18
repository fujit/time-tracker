import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Input } from '../components/Input'

describe('Input Component', () => {
  test('空の Input がレンダリングされること', () => {
    render(<Input />)
    expect(screen.getByRole('textbox')).toHaveValue('')
  })

  test('デフォルトは枠があること', () => {
    render(<Input />)
    expect(screen.getByRole('textbox')).toHaveClass('border')
  })

  test('デフォルトはエラー時のスタイルではないこと', () => {
    render(<Input />)
    expect(screen.getByRole('textbox')).toHaveClass('border-gray-500')
  })

  test('エラー時のスタイルを適用できること', () => {
    render(<Input isError />)
    expect(screen.getByRole('textbox')).toHaveClass('border-red-500')
    expect(screen.getByRole('textbox')).toHaveClass('border')
  })
})
