import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { useTrackerForm } from './useTrackerForm'

const Wrapper = () => {
  const [trackerName, isValid, setTrackerName] = useTrackerForm('initial')
  return (
    <>
      <input
        value={trackerName}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTrackerName(e.target.value)}
      />
      <button disabled={!isValid}>Test</button>
    </>
  )
}

describe('useTrackerForm', () => {
  beforeEach(() => {
    render(<Wrapper />)
  })

  test('引数に渡した文字列が初期値となること', () => {
    expect(screen.getByRole('textbox')).toHaveValue('initial')
  })

  test('テキストボックスの変更が反映されること', () => {
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'FireEvent' },
    })
    expect(screen.getByRole('textbox')).toHaveValue('FireEvent')
  })

  test('全角スペースが半角スペースへ変換されること', () => {
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'Fire Event' },
    })
    expect(screen.getByRole('textbox')).toHaveValue('Fire Event')
  })

  test('連続する2つの半角スペースが1つの半角スペースへ変換されること', () => {
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'Fire  Event' },
    })
    expect(screen.getByRole('textbox')).toHaveValue('Fire Event')
  })

  test('複数箇所にある全角スペースがすべて半角スペースへ変換されること', () => {
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'Fi re E  vent' },
    })
    expect(screen.getByRole('textbox')).toHaveValue('Fi re E vent')
  })

  test('入力がなにもないときバリデーションエラーとなること', () => {
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: '' },
    })
    expect(screen.getByRole('button')).toBeDisabled()
  })

  test('入力が30文字より長い場合バリデーションエラーとなること', () => {
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: '寿限無寿限無五劫の擦切海砂利水魚の水行末雲来末風来末食う寝ると' },
    })
    expect(screen.getByRole('button')).toBeDisabled()
  })

  test('入力が30文字の場合バリデーションにならないこと', () => {
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: '寿限無寿限無五劫の擦切海砂利水魚の水行末雲来末風来末食う寝る' },
    })
    expect(screen.getByRole('button')).toBeEnabled()
  })
})
