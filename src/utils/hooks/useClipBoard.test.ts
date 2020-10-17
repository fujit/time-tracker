import { renderHook, act } from '@testing-library/react-hooks'
import { useClipBoard } from './useClipBoard'

describe('useClipBoard', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  test.skip('初期状態は何もコピーされていないこと', () => {
    const { result } = renderHook(() => useClipBoard())
    expect(result.current[1]).toBeFalsy()
  })

  test.skip('コピーを実行した時、その状態を保持すること', () => {
    const { result } = renderHook(() => useClipBoard())
    act(() => {
      result.current[0]('Gone with the Wind')
    })
    expect(result.current[1]).toBeTruthy()
  })

  test.skip('5秒後にコピー結果をリセットすること', () => {
    const { result } = renderHook(() => useClipBoard())
    act(() => {
      result.current[0]('THE SHAWSHANK REDEMPTION')
    })

    expect(result.current[1]).toBeTruthy()
    act(() => {
      jest.advanceTimersByTime(1000 * 10)
    })
    expect(result.current[1]).toBeFalsy()
  })
})
