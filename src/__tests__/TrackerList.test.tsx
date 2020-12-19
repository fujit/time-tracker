import React, { VFC } from 'react'
import ReactModal from 'react-modal'
import { FetchMock } from 'jest-fetch-mock'
import { render, screen, act } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { TrackerList } from '../components/TrackerList'
import { StateContext, DispatchContext } from '../utils/contexts/StoreContext'

type WrapperProps = {
  currentCount?: number
  calculateCurrentCount: jest.Mock
  pauseTimer: jest.Mock
}

let dispatch: jest.Mock
const Wrapper: VFC<WrapperProps> = (props) => {
  const state = {
    trackers: [
      {
        id: 'a',
        name: 'ROCKY',
        day: '2020-09-22',
        inProgress: false,
        timers: [
          {
            id: '0',
            start: new Date('2020-09-22 09:00:00'),
            end: new Date('2020-09-22 11:00:00'),
            minute: 120,
          },
        ],
        isActive: true,
      },
      {
        id: 'b',
        name: 'ALIENS',
        day: '2020-09-22',
        inProgress: true,
        timers: [
          {
            id: '0',
            start: new Date('2020-09-22 11:00:00'),
          },
        ],
        isActive: true,
      },
      {
        id: 'c',
        name: 'PLANET OF THE APES',
        day: '1968-02-08',
        inProgress: true,
        timers: [
          {
            id: '0',
            start: new Date('1968-02-08 09:00:00'),
          },
        ],
        isActive: false,
      },
    ],
    inProgressId: 'b',
  }
  dispatch = jest.fn()

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <TrackerList {...props} today="2020-09-22" />
      </DispatchContext.Provider>
    </StateContext.Provider>
  )
}

describe('TrackerList', () => {
  let calculateCurrentCount: jest.Mock
  let pauseTimer: jest.Mock
  beforeEach(() => {
    fetchMock.resetMocks()

    ReactModal.setAppElement(document.createElement('div'))
    calculateCurrentCount = jest.fn()
    pauseTimer = jest.fn()
    render(<Wrapper currentCount={10} {...{ calculateCurrentCount, pauseTimer }} />)
  })

  describe('Component', () => {
    test('タイトルが表示されていること', () => {
      expect(screen.getByRole('heading')).toHaveTextContent(/2020-09-22/)
    })

    test('合計時間が表示されていること', () => {
      expect(screen.getByTestId('total')).toHaveTextContent('2.0h')
    })

    test('コピーアイコンが表示されていること', () => {
      expect(screen.getAllByAltText('copy')).toHaveLength(2)
    })
  })

  describe('Container', () => {
    test.todo('コピーアイコンを押すと、コピーしたことが表示される')

    test('削除ボタンを押すと、アーカイブされること', () => {
      userEvent.click(screen.getAllByTestId('remove-button')[0])
      expect(dispatch).toBeCalledTimes(1)
      expect(dispatch).toBeCalledWith({ type: 'REMOVE_TRACKER', payload: { trackerId: 'a' } })
    })

    test('削除ボタンを押すと、アラートが表示される', () => {
      userEvent.click(screen.getAllByTestId('remove-button')[0])
      expect(screen.getByRole('alert')).toBeInTheDocument()
    })

    test('アラートが消える前に、削除ボタンを押しても1つしか表示されないこと', () => {
      userEvent.click(screen.getAllByTestId('remove-button')[0])
      userEvent.click(screen.getAllByTestId('remove-button')[0])
      expect(screen.getAllByRole('alert')).toHaveLength(1)
    })

    test('削除ボタンを押して、10秒経つとアラートが消えること', () => {
      userEvent.click(screen.getAllByTestId('remove-button')[0])
      expect(screen.getByRole('alert')).toBeInTheDocument()
      setTimeout(() => {
        expect(screen.queryByRole('alert')).not.toBeInTheDocument()
        expect(fetchMock).toHaveBeenCalledTimes(1)
      }, 1000 * 10)
    })

    test.todo('削除ボタンを押して、別ページへ遷移するとき、削除が実行されること')

    test('元に戻すを押すと、アラートが消えること', () => {
      userEvent.click(screen.getAllByTestId('remove-button')[0])
      userEvent.click(screen.getByTestId('restore-button'))
      expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    })

    test('元に戻すを押すと、元に戻ること', () => {
      userEvent.click(screen.getAllByTestId('remove-button')[0])
      userEvent.click(screen.getByTestId('restore-button'))
      expect(dispatch).toBeCalledTimes(2)
      expect(dispatch).toBeCalledWith({ type: 'RESTORE_TRACKER', payload: { trackerId: 'a' } })
    })

    test('詳細を見るボタンを押すと、モーダルが開くこと', () => {
      userEvent.click(screen.getAllByTestId('breakdown-button')[1])
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })

    test('詳細モーダルの閉じるボタンを押すと、モーダルが消えること', () => {
      userEvent.click(screen.getAllByTestId('breakdown-button')[1])
      userEvent.click(screen.getByTestId('closeIcon'))
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
  })
})
