import React from 'react'
import { renderHook, act, HookResult } from '@testing-library/react-hooks'
import '@testing-library/jest-dom'
import { useTimePicker, UseTimerPickerResult } from './useTimePicker'

describe('useTimePicker', () => {
  describe('Logic', () => {
    let result: HookResult<UseTimerPickerResult>

    beforeEach(() => {
      result = renderHook(() => useTimePicker(new Date('2020-01-01 10:05:00'))).result
    })

    test('引数に渡した日付の時間が初期値となること', () => {
      expect(result.current[0].hour).toBe('10')
      expect(result.current[0].minute).toBe('5')
    })

    describe('changeHour', () => {
      test('未入力の場合、空文字が設定されること', () => {
        act(() => {
          result.current[1]('')
        })
        expect(result.current[0].hour).toBe('')
      })

      test('数値以外の入力値は無視されること', () => {
        act(() => {
          result.current[1]('1q!あ')
        })
        expect(result.current[0].hour).toBe('1')
      })

      test('1未満の数値は受け付けないこと', () => {
        act(() => {
          result.current[1]('0')
        })
        expect(result.current[0].hour).toBe('10')
      })

      test('24より大きい値は受け付けないこと', () => {
        act(() => {
          result.current[1]('25')
        })
        expect(result.current[0].hour).toBe('10')
      })
    })

    describe('changeMinute', () => {
      test('小数点の入力はできないこと', () => {
        act(() => {
          result.current[2]('1.3')
        })
        expect(result.current[0].minute).toBe('13')
      })

      test('2桁より大きい数値は設定できないこと', () => {
        act(() => {
          result.current[2]('120')
        })
        expect(result.current[0].minute).toBe('5')
      })

      test('59より大きい値は設定できないこと', () => {
        act(() => {
          result.current[2]('60')
        })
        expect(result.current[0].minute).toBe('5')
      })
    })

    describe('isValid', () => {
      test('時間が設定されていない場合、エラーとなること', () => {
        act(() => {
          result.current[1]('')
        })
        expect(result.current[3]).toBeFalsy()
      })

      test('分が設定されていない場合、エラーとなること', () => {
        act(() => {
          result.current[1]('')
        })
        expect(result.current[3]).toBeFalsy()
      })

      test('時間と分が設定されている場合、エラーとならないこと', () => {
        expect(result.current[3]).toBeTruthy()
      })
    })
  })
})
