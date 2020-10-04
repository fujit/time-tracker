import { renderHook, act } from '@testing-library/react-hooks'
import { useClipBoard } from './useClipBoard'

document.execCommand = jest.fn(() => true)
describe('useClipBoard', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  test('初期状態は何もコピーされていないこと', () => {
    const { result } = renderHook(() => useClipBoard())
    expect(result.current[1]).toBeFalsy()
  })

  test('コピーを実行した時、その状態を保持すること', () => {
    const { result } = renderHook(() => useClipBoard())
    act(() => {
      result.current[0]('Gone with the Wind')
    })
    expect(result.current[1]).toBeTruthy()
  })

  test('5秒後にコピー結果をリセットすること', () => {
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
