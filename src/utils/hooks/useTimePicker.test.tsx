import React from 'react'
import { renderHook, act } from '@testing-library/react-hooks'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { useTimePicker } from './useTimePicker'

describe('useTimePicker', () => {
  describe('logic', () => {
    test('引数に渡した日付の時間が初期値となること', () => {
      const { result } = renderHook(() =>
        useTimePicker(new Date('2020-01-01 10:00'), new Date('2020-01-01 13:00'))
      )
      expect(result.current[0]).toBe('10:00')
      expect(result.current[2]).toBe('13:00')
    })

    test('開始時間が入力されていない場合、エラーとなること', () => {
      const { result } = renderHook(() =>
        useTimePicker(new Date('2020-01-01 10:00'), new Date('2020-01-01 13:00'))
      )
      act(() => {
        result.current[1]('')
      })
      expect(result.current[4]).toBeFalsy()
    })

    test('終了時間が入力されていない場合、エラーとなること', () => {
      const { result } = renderHook(() =>
        useTimePicker(new Date('2020-01-01 10:00'), new Date('2020-01-01 13:00'))
      )
      act(() => {
        result.current[3]('')
      })
      expect(result.current[4]).toBeFalsy()
    })

    test('終了時間より開始時間のほうが大きい場合、エラーとなること', () => {
      const { result } = renderHook(() =>
        useTimePicker(new Date('2020-01-01 10:00'), new Date('2020-01-01 13:00'))
      )

      act(() => {
        result.current[1]('14:00')
      })
      expect(result.current[4]).toBeFalsy()
    })

    test('開始時間より終了時間のほうが大きい場合、エラーとならないこと', () => {
      const { result } = renderHook(() =>
        useTimePicker(new Date('2020-01-01 10:00'), new Date('2020-01-01 13:00'))
      )

      act(() => {
        result.current[3]('11:00')
      })

      expect(result.current[4]).toBeTruthy()
    })

    test('開始時間と終了時間が同じ場合、エラーとならないこと', () => {
      const { result } = renderHook(() =>
        useTimePicker(new Date('2020-01-01 10:00'), new Date('2020-01-01 13:00'))
      )

      act(() => {
        result.current[3]('10:00')
      })

      expect(result.current[4]).toBeTruthy()
    })
  })

  describe('component', () => {
    const Wrapper = () => {
      const [start, changeStart, end, changeEnd, isValid] = useTimePicker(
        new Date('2020-01-01 10:00:00'),
        new Date('2020-01-01 13:00')
      )

      return (
        <>
          <input
            data-testid="start"
            type="time"
            value={start}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              changeStart(event.target.value)
            }
            disabled={!isValid}
          />
          <input
            data-testid="end"
            type="time"
            value={end}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => changeEnd(event.target.value)}
            disabled={!isValid}
          />
        </>
      )
    }

    test('開始時間を更新できること', () => {
      render(<Wrapper />)
      fireEvent.change(screen.getByTestId('start'), {
        target: { value: '11:00' },
      })
      expect(screen.getByTestId('start')).toHaveValue('11:00')
    })

    test('終了時間を更新できること', () => {
      render(<Wrapper />)
      fireEvent.change(screen.getByTestId('end'), {
        target: { value: '12:00' },
      })
      expect(screen.getByTestId('end')).toHaveValue('12:00')
    })
  })
})
