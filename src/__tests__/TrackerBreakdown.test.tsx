import React from 'react'
import { FetchMock } from 'jest-fetch-mock'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import ReactModal from 'react-modal'
import { StateContext, DispatchContext } from '../utils/contexts/StoreContext'
import { TrackerBreakdown } from '../components/TrackerBreakdown'

type WrapperProps = {
  isBreakdownOpen: boolean
  closeBreakdown: jest.Mock
  testData: Tracker[]
  inProgressId?: string
}

let dispatch: jest.Mock
const Wrapper: React.FC<WrapperProps> = ({
  isBreakdownOpen,
  closeBreakdown,
  testData,
  inProgressId,
}) => {
  const state = {
    trackers: testData,
    inProgressId,
  }
  dispatch = jest.fn()

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <TrackerBreakdown
          trackerId="test01"
          isBreakdownOpen={isBreakdownOpen}
          closeBreakdown={closeBreakdown}
        />
      </DispatchContext.Provider>
    </StateContext.Provider>
  )
}

describe('TrackerBreakdown Component', () => {
  beforeEach(() => {
    fetchMock.resetMocks()
  })

  let closeBreakdown: jest.Mock

  describe('Component', () => {
    describe('Timer が存在する', () => {
      beforeEach(() => {
        ReactModal.setAppElement(document.createElement('div'))
        closeBreakdown = jest.fn()
        const testData: Tracker[] = [
          {
            id: 'test01',
            name: 'test01',
            inProgress: false,
            timers: [
              {
                id: '0',
                start: new Date('2020-09-11 07:00'),
                end: new Date('2020-09-11 11:00'),
                minute: 240,
              },
              {
                id: '1',
                start: new Date('2020-09-11 15:00'),
              },
            ],
            day: '2020-09-11',
            isActive: true,
          },
        ]
        render(
          <Wrapper
            closeBreakdown={closeBreakdown}
            isBreakdownOpen
            testData={testData}
            inProgressId="test01"
          />
        )
      })

      test('モーダルが開いていること', () => {
        expect(screen.getByRole('dialog')).toBeInTheDocument()
      })

      test('トラッカー名が表示されていること', () => {
        expect(screen.getByRole('heading')).toHaveTextContent('test01')
      })

      test('閉じるアイコンが表示されていること', () => {
        expect(screen.getByTestId('closeIcon')).toBeInTheDocument()
      })

      test('リストが2つ表示されていること', () => {
        expect(screen.getAllByRole('listitem')).toHaveLength(2)
      })

      test('編集アイコンが1つ表示されていること', () => {
        expect(screen.getAllByAltText('editIcon')).toHaveLength(1)
      })

      test('削除アイコンが1つ表示されていること', () => {
        expect(screen.getAllByAltText('trashIcon')).toHaveLength(1)
      })
    })

    describe('Timer が存在しない', () => {
      beforeEach(() => {
        ReactModal.setAppElement(document.createElement('div'))
        closeBreakdown = jest.fn()
        const testData: Tracker[] = [
          {
            id: 'test01',
            name: 'test01',
            inProgress: false,
            timers: [],
            day: '2020-09-11',
            isActive: true,
          },
        ]
        render(<Wrapper closeBreakdown={closeBreakdown} isBreakdownOpen testData={testData} />)
      })

      test('リストが表示されていないこと', () => {
        expect(screen.queryByRole('listitem')).toBeNull()
      })

      test('編集アイコンが存在しないこと', () => {
        expect(screen.queryByAltText('editIcon')).toBeNull()
      })

      test('ゴミ箱アイコンが存在しないこと', () => {
        expect(screen.queryByAltText('trashIcon')).toBeNull()
      })
    })
  })

  describe('Container', () => {
    beforeEach(() => {
      ReactModal.setAppElement(document.createElement('div'))
      closeBreakdown = jest.fn()
      const testData: Tracker[] = [
        {
          id: 'test01',
          name: 'test01',
          inProgress: false,
          timers: [
            {
              id: '0',
              start: new Date('2020-09-11 07:00'),
              end: new Date('2020-09-11 11:00'),
              minute: 240,
            },
            {
              id: '1',
              start: new Date('2020-09-11 15:00'),
            },
          ],
          day: '2020-09-11',
          isActive: true,
        },
      ]
      render(
        <Wrapper
          closeBreakdown={closeBreakdown}
          isBreakdownOpen
          testData={testData}
          inProgressId="test01"
        />
      )
    })

    test('閉じるボタンを押すとモーダルが閉じること', () => {
      userEvent.click(screen.getByTestId('closeIcon'))
      expect(closeBreakdown).toHaveBeenCalledTimes(1)
    })

    test('ゴミ箱アイコンを押すと、削除されること', () => {
      expect(screen.getAllByRole('listitem')).toHaveLength(2)
      userEvent.click(screen.getByAltText('trashIcon'))
      // TODO: 画面上からも削除されること
      // expect(screen.getAllByRole('listitem')).toHaveLength(1)
      expect(dispatch).toHaveBeenCalledTimes(1)
      expect(dispatch).toHaveBeenLastCalledWith({
        type: 'DELETE_TRACKER_TIMER',
        payload: { trackerId: 'test01', timerId: '0' },
      })

      expect(fetchMock).toHaveBeenCalledTimes(1)
      expect(fetchMock).toHaveBeenLastCalledWith('/api/deleteTimer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({ trackerId: 'test01', timerId: '0' }),
      })
    })

    test('編集アイコンを押すと、編集モーダルが表示されること', () => {
      userEvent.click(screen.getByAltText('editIcon'))
      expect(screen.getAllByRole('dialog')).toHaveLength(2)
    })
  })
})
