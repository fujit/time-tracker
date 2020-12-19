import React, { VFC, useRef } from 'react'
import { FetchMock } from 'jest-fetch-mock'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { TrackerNameComponent, TrackerName } from '../../components/TrackerItem/TrackerName'
import { DispatchContext } from '../../utils/contexts/StoreContext'

type ComponentWrapperProps = {
  trackerName: string
  changeTrackerName: jest.Mock
  updateTrackerName: jest.Mock
  keyDown: jest.Mock
  isValid: boolean
}

const ComponentWrapper: VFC<ComponentWrapperProps> = (props) => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  return <TrackerNameComponent {...props} inputRef={inputRef} />
}

describe('TrackerNameComponent', () => {
  let changeTrackerName: jest.Mock
  let updateTrackerName: jest.Mock
  let keyDown: jest.Mock

  describe('Validation OK', () => {
    beforeEach(() => {
      const trackerName = 'PULP FICTION'
      changeTrackerName = jest.fn()
      updateTrackerName = jest.fn()
      keyDown = jest.fn()

      render(
        <ComponentWrapper
          {...{ trackerName, changeTrackerName, updateTrackerName, keyDown, isValid: true }}
        />
      )
    })

    test('トラッカー名が入力されたテキストボックスが表示されていること', () => {
      expect(screen.getByRole('textbox')).toHaveValue('PULP FICTION')
    })

    test('フォームに入力した時、イベントが発生すること', () => {
      userEvent.type(screen.getByRole('textbox'), '!')
      expect(changeTrackerName).toHaveBeenCalledTimes(1)
      expect(changeTrackerName).toHaveBeenCalledWith('PULP FICTION!')
    })

    test('フォームからフォーカスが外れた時、イベントが発生すること', () => {
      userEvent.type(screen.getByRole('textbox'), '?')
      userEvent.tab()

      expect(updateTrackerName).toHaveBeenCalledTimes(1)
    })

    test('Enter キーを押した時、イベントが発生すること', () => {
      userEvent.type(screen.getByRole('textbox'), '{enter}')
      expect(keyDown).toHaveBeenCalledTimes(1)
    })
  })

  describe('Validation NG', () => {
    beforeEach(() => {
      const trackerName = 'PULP FICTION'
      changeTrackerName = jest.fn()
      updateTrackerName = jest.fn()
      keyDown = jest.fn()

      render(
        <ComponentWrapper
          {...{ trackerName, changeTrackerName, updateTrackerName, keyDown, isValid: false }}
        />
      )
    })

    test('バリデーションエラー時のスタイルが適用されていること', () => {
      expect(screen.getByRole('textbox')).toHaveClass('error')
    })
  })
})

type ContainerWrapperProps = {
  trackerId: string
  trackerName: string
  isValid: boolean
  changeTrackerName: jest.Mock
}

let dispatch: jest.Mock
const ContainerWrapper: VFC<ContainerWrapperProps> = (props) => {
  dispatch = jest.fn()

  return (
    <DispatchContext.Provider value={dispatch}>
      <TrackerName {...props} />
    </DispatchContext.Provider>
  )
}

describe('TrackerName', () => {
  let changeTrackerName: jest.Mock

  beforeEach(() => {
    fetchMock.resetMocks()
  })

  describe('Validation OK', () => {
    beforeEach(() => {
      changeTrackerName = jest.fn()
      render(
        <ContainerWrapper
          trackerId="ABC"
          trackerName="THE SILENCE OF THE LAMBS "
          isValid
          changeTrackerName={changeTrackerName}
        />
      )
    })

    test('更新するとき、前後の空白が削除されること', () => {
      userEvent.type(screen.getByRole('textbox'), '{enter}')
      expect(dispatch).toHaveBeenCalledWith({
        type: 'RENAME_TRACKER',
        payload: { id: 'ABC', name: 'THE SILENCE OF THE LAMBS', key: undefined },
      })
    })

    test('Enter キーを押した時、フォーカスが外れ、更新イベントが発生すること', () => {
      userEvent.type(screen.getByRole('textbox'), '{enter}')
      expect(dispatch).toHaveBeenCalledTimes(1)
      expect(dispatch).toHaveBeenCalledWith({
        type: 'RENAME_TRACKER',
        payload: { id: 'ABC', name: 'THE SILENCE OF THE LAMBS' },
      })

      expect(fetchMock).toHaveBeenCalledTimes(1)
      expect(fetchMock).toHaveBeenCalledWith('/api/renameTracker', {
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        method: 'POST',
        body: JSON.stringify({
          trackerId: 'ABC',
          newName: 'THE SILENCE OF THE LAMBS',
        }),
      })

      expect(screen.getByRole('textbox')).not.toHaveFocus()
    })

    test('フォームからフォーカスを外した時、更新イベントが発生すること', () => {
      userEvent.type(screen.getByRole('textbox'), '')
      userEvent.tab()

      expect(dispatch).toHaveBeenCalledTimes(1)
      expect(dispatch).toHaveBeenCalledWith({
        type: 'RENAME_TRACKER',
        payload: { id: 'ABC', name: 'THE SILENCE OF THE LAMBS' },
      })

      expect(fetchMock).toHaveBeenCalledTimes(1)
      expect(fetchMock).toHaveBeenCalledWith('/api/renameTracker', {
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        method: 'POST',
        body: JSON.stringify({
          trackerId: 'ABC',
          newName: 'THE SILENCE OF THE LAMBS',
        }),
      })
    })
  })

  describe('Validation NG', () => {
    beforeEach(() => {
      render(
        <ContainerWrapper
          trackerId="ABC"
          trackerName=""
          isValid={false}
          changeTrackerName={changeTrackerName}
        />
      )
    })

    test('Enter キーを押しても、フォーカスは外れず、更新イベントが発生しないこと', () => {
      userEvent.type(screen.getByRole('textbox'), '{enter}')
      expect(dispatch).not.toHaveBeenCalled()
      expect(fetchMock).not.toHaveBeenCalled()

      expect(screen.getByRole('textbox')).toHaveFocus()
    })
  })
})
