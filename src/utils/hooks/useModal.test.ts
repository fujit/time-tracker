import { renderHook, act } from '@testing-library/react-hooks'
import { useModal } from './useModal'

describe('useModal', () => {
  test('初期状態はモーダルが閉じていること', () => {
    const { result } = renderHook(() => useModal())

    expect(result.current[0]).toBeFalsy()
  })

  test('モーダルを開くことができること', () => {
    const { result } = renderHook(() => useModal())

    act(() => {
      result.current[1](true)
    })

    expect(result.current[0]).toBeTruthy()
  })

  test('モーダルを閉じることができること', () => {
    const { result } = renderHook(() => useModal())

    act(() => {
      result.current[1](false)
    })

    expect(result.current[0]).toBeFalsy()
  })
})
