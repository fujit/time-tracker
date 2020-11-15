import React from 'react'
import { renderHook, act, HookResult } from '@testing-library/react-hooks'
import { FetchMock } from 'jest-fetch-mock'
import '@testing-library/jest-dom'
import { useTrackerForm } from './useTrackerForm'
import type { UseTrackerFormResult } from './useTrackerForm'

describe('useTrackerForm', () => {
  let result: HookResult<UseTrackerFormResult>
  beforeEach(() => {
    fetchMock.resetMocks()
    result = renderHook(() => useTrackerForm('')).result
  })

  describe('changeTrackerName', () => {
    test('フォームの値の変更ができること', () => {
      act(() => {
        result.current[2]('a')
      })
      expect(result.current[0].name).toBe('a')
      expect(result.current[0].key).toBe(undefined)
    })

    test('キーの設定ができること', () => {
      act(() => {
        result.current[2]('#100 b')
      })
      expect(result.current[0].key).toBe(100)
      expect(result.current[0].name).toBe('#100 b')
    })

    test('全角スペースが半角スペースへ変換されること', () => {
      act(() => {
        result.current[2]('a　b')
      })
      expect(result.current[0].name).toBe('a b')
    })

    test('2文字より長い値が入力された時、サジェストを取得しにいくこと', () => {
      act(() => {
        result.current[2]('abc')
      })
      expect(fetchMock).toHaveBeenCalledTimes(1)
      expect(fetchMock).toHaveBeenCalledWith('/api/project?projectName=abc')
    })

    test('2文字以下の時、サジェストを取得しにいかないこと', () => {
      act(() => {
        result.current[2]('ab')
      })
      expect(fetchMock).not.toHaveBeenCalled()
    })

    test('値の#は除外してサジェストを取得しにいくこと', () => {
      act(() => {
        result.current[2]('#efg')
      })
      expect(fetchMock).toHaveBeenCalledWith('/api/project?projectName=efg')
    })
  })

  describe('isValid', () => {
    test('入力がなにもない場合はエラー', () => {
      expect(result.current[1]).toBeFalsy()
    })

    test('値が1文字の場合はエラーではない', () => {
      act(() => {
        result.current[2]('a')
      })
      expect(result.current[1]).toBeTruthy()
    })

    test('値が30文字より長い場合はエラー', () => {
      act(() => {
        result.current[2]('寿限無寿限無五劫の擦切海砂利水魚の水行末雲来末風来末食う寝ると')
      })
      expect(result.current[1]).toBeFalsy()
    })

    test('値が30文字の場合はエラーではない', () => {
      act(() => {
        result.current[2]('寿限無寿限無五劫の擦切海砂利水魚の水行末雲来末風来末食う寝る')
      })
      expect(result.current[1]).toBeTruthy()
    })
  })
})
