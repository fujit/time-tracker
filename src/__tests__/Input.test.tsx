import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Input, ForwardedInput } from '../components/Input'

type WrapperProps = {
  isError?: boolean
} & JSX.IntrinsicElements['input']

describe('Input Component', () => {
  test('空の Input がレンダリングされること', () => {
    render(<Input />)
    expect(screen.getByRole('textbox')).toHaveValue('')
  })

  test('デフォルトはエラー時のスタイルではないこと', () => {
    render(<Input />)
    expect(screen.getByRole('textbox')).not.toHaveClass('error')
  })

  test('エラー時のスタイルを適用できること', () => {
    render(<Input isError />)
    expect(screen.getByRole('textbox')).toHaveClass('error')
  })
})

describe('ForwardedInput', () => {
  let inputRef: React.RefObject<HTMLInputElement>
  const Wrapper: React.FC<WrapperProps> = (props) => {
    inputRef = React.useRef<HTMLInputElement>(null)
    return <ForwardedInput {...props} ref={inputRef} />
  }

  test('空の input がレンダリングされること', () => {
    render(<Wrapper />)
    expect(screen.getByRole('textbox')).toHaveValue('')
  })

  test('デフォルトではエラー時のスタイルではないこと', () => {
    render(<Wrapper />)
    expect(screen.getByRole('textbox')).not.toHaveClass('error')
  })

  test('エラー時のスタイルを適用できること', () => {
    render(<Wrapper isError />)
    expect(screen.getByRole('textbox')).toHaveClass('error')
  })

  test('Ref を通して input の値を変えることができること', () => {
    render(<Wrapper />)
    if (inputRef.current) {
      inputRef.current.value = 'JavaScript'
    }
    expect(screen.getByRole('textbox')).toHaveValue('JavaScript')
  })
})
