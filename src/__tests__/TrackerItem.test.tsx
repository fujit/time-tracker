import React from 'react'
import { FetchMock } from 'jest-fetch-mock'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { StateContext, DispatchContext } from '../utils/contexts/StoreContext'
import { TrackerItem } from '../components/TrackerItem'
import { State } from '../reducer'
import * as types from '../actionTypes'

const trackerStopped: Tracker = {
  id: 'abc',
  name: 'GHOST BUSTERS',
  day: '1984-12-02',
  timers: [
    {
      id: '0',
      start: new Date('1984-12-02 09:00:00'),
      end: new Date('1982-12-02 10:45:00'),
      minute: 105,
    },
  ],
  isActive: true,
  inProgress: false,
}

const trackerInProgress: Tracker = {
  id: 'efg',
  name: 'MASK',
  day: '1995-02-25',
  timers: [
    {
      id: '0',
      start: new Date('1995-02-25 09:00:00'),
    },
  ],
  isActive: true,
  inProgress: true,
}

const initialStateStopped: State = {
  trackers: [trackerStopped],
  inProgressId: undefined,
}

const initialStateInProgress: State = {
  trackers: [trackerInProgress, trackerStopped],
  inProgressId: 'abc',
}

type WrapperProps = {
  initialState: State
  tracker: Tracker
  calculateCurrentCount: jest.Mock
  pauseTimer: jest.Mock
  openBreakdown: jest.Mock
  removeTracker: jest.Mock
}

let dispatch: jest.Mock
const Wrapper: React.FC<WrapperProps> = ({ initialState, ...props }) => {
  const state = initialState
  dispatch = jest.fn()

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <TrackerItem {...props} currentCount={0} />
      </DispatchContext.Provider>
    </StateContext.Provider>
  )
}

describe('TrackerItem', () => {
  beforeEach(() => {
    fetchMock.resetMocks()
  })

  let calculateCurrentCount: jest.Mock
  let pauseTimer: jest.Mock
  let openBreakdown: jest.Mock
  let removeTracker: jest.Mock

  describe('Component', () => {
    describe('停止中', () => {
      beforeEach(() => {
        calculateCurrentCount = jest.fn()
        pauseTimer = jest.fn()
        openBreakdown = jest.fn()
        removeTracker = jest.fn()

        render(
          <Wrapper
            initialState={initialStateStopped}
            tracker={trackerStopped}
            calculateCurrentCount={calculateCurrentCount}
            pauseTimer={pauseTimer}
            openBreakdown={openBreakdown}
            removeTracker={removeTracker}
          />
        )
      })

      test('トラッカー名が入力されたテキストボックスが表示されていること', () => {
        expect(screen.getByRole('textbox')).toHaveValue(trackerStopped.name)
      })

      test('内訳を見るボタンが存在していること', () => {
        expect(screen.getByTestId('breakdown-button')).toHaveTextContent('内訳を見る')
      })

      test('削除するボタンが存在していること', () => {
        expect(screen.getByTestId('remove-button')).toHaveTextContent('削除する')
        expect(screen.getByTestId('remove-button')).toBeEnabled()
      })

      test('「内訳を見る」と「削除」ボタンは見えないようになっていること', () => {
        expect(screen.getByTestId('button-list')).toHaveClass('opacity-0')
      })

      test.todo('アイテムにホバーした時に「内訳を見る」「削除」ボタンが見えるようになる')

      test('バリデーションエラーのメッセージが表示されていない', () => {
        expect(screen.queryByRole('alert')).toBeNull()
      })

      test('バリデーションエラー時、メッセージが表示されていること', () => {
        userEvent.clear(screen.getByRole('textbox'))
        expect(screen.getByRole('alert')).toBeInTheDocument()
      })

      test('バリデーションエラー時、開始ボタンが非活性であること', () => {
        userEvent.clear(screen.getByRole('textbox'))
        expect(screen.getByAltText('startIcon')).toHaveClass('cursor-not-allowed opacity-50')
      })

      test('開始ボタンが表示されていること', () => {
        expect(screen.getByAltText('startIcon')).toBeInTheDocument()
      })
    })

    describe('別タスクが計測中', () => {
      beforeEach(() => {
        calculateCurrentCount = jest.fn()
        pauseTimer = jest.fn()
        openBreakdown = jest.fn()
        removeTracker = jest.fn()

        render(
          <Wrapper
            initialState={initialStateInProgress}
            tracker={trackerStopped}
            calculateCurrentCount={calculateCurrentCount}
            pauseTimer={pauseTimer}
            openBreakdown={openBreakdown}
            removeTracker={removeTracker}
          />
        )
      })

      test('他に計測中のものがある場合、開始ボタンが非活性であること', () => {
        expect(screen.getByAltText('startIcon')).toHaveClass('cursor-not-allowed opacity-50')
      })
    })

    describe('計測中', () => {
      beforeEach(() => {
        calculateCurrentCount = jest.fn()
        pauseTimer = jest.fn()
        openBreakdown = jest.fn()
        removeTracker = jest.fn()

        render(
          <Wrapper
            initialState={initialStateStopped}
            tracker={trackerInProgress}
            calculateCurrentCount={calculateCurrentCount}
            pauseTimer={pauseTimer}
            openBreakdown={openBreakdown}
            removeTracker={removeTracker}
          />
        )
      })

      test('削除するボタンが非活性であること', () => {
        expect(screen.getByTestId('remove-button')).toBeDisabled()
      })

      test('停止ボタンが表示されていること', () => {
        expect(screen.getByAltText('pauseIcon')).toBeInTheDocument()
      })
    })
  })

  describe('Container', () => {
    describe('停止中', () => {
      beforeEach(() => {
        calculateCurrentCount = jest.fn()
        pauseTimer = jest.fn()
        openBreakdown = jest.fn()
        removeTracker = jest.fn()

        render(
          <Wrapper
            initialState={initialStateStopped}
            tracker={trackerStopped}
            calculateCurrentCount={calculateCurrentCount}
            pauseTimer={pauseTimer}
            openBreakdown={openBreakdown}
            removeTracker={removeTracker}
          />
        )
      })

      test('Enter を押したらフォーカスが外れ、更新されること', () => {
        userEvent.type(screen.getByRole('textbox'), '.js{enter}')
        expect(screen.getByRole('textbox')).not.toHaveFocus()
        expect(dispatch).toHaveBeenCalledTimes(1)
        expect(dispatch).toHaveBeenCalledWith({
          type: types.RENAME,
          payload: { id: trackerStopped.id, name: `${trackerStopped.name}.js` },
        })
        expect(fetchMock).toHaveBeenCalledTimes(1)
        expect(fetchMock).toHaveBeenCalledWith('/api/renameTracker', {
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
          method: 'POST',
          body: JSON.stringify({
            trackerId: trackerStopped.id,
            newName: `${trackerStopped.name}.js`,
          }),
        })
      })

      test('フォーカスを外したら、更新されること', () => {
        userEvent.type(screen.getByRole('textbox'), 'a')
        userEvent.tab()
        expect(screen.getByRole('textbox')).not.toHaveFocus()
        expect(dispatch).toHaveBeenCalledTimes(1)
        expect(dispatch).toHaveBeenCalledWith({
          type: types.RENAME,
          payload: { id: trackerStopped.id, name: `${trackerStopped.name}a` },
        })
        expect(fetchMock).toHaveBeenCalledTimes(1)
        expect(fetchMock).toHaveBeenCalledWith('/api/renameTracker', {
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
          method: 'POST',
          body: JSON.stringify({
            trackerId: trackerStopped.id,
            newName: `${trackerStopped.name}a`,
          }),
        })
      })

      test('バリデーションエラー時にエンターを押してもカーソルは外れないこと', () => {
        userEvent.clear(screen.getByRole('textbox'))
        userEvent.type(screen.getByRole('textbox'), '{enter}')
        expect(screen.getByRole('textbox')).toHaveFocus()
        expect(dispatch).toHaveBeenCalledTimes(0)
      })

      test.todo('変更がなかった場合、更新されないこと')

      test('内訳を見るボタンを押すと、イベントが発火すること', () => {
        userEvent.click(screen.getByTestId('breakdown-button'))
        expect(openBreakdown).toHaveBeenCalledTimes(1)
        expect(openBreakdown).toHaveBeenCalledWith(trackerStopped.id)
      })

      test('削除するボタンを押すと、イベントが発火すること', () => {
        userEvent.click(screen.getByTestId('remove-button'))
        expect(removeTracker).toHaveBeenCalledTimes(1)
        expect(removeTracker).toHaveBeenCalledWith(trackerStopped.id)
      })

      test('開始ボタンを押すと計測が開始すること', () => {
        userEvent.click(screen.getByAltText('startIcon'))
        expect(calculateCurrentCount).toHaveBeenCalledTimes(1)
        expect(dispatch).toBeCalledTimes(1)
        expect(fetchMock).toHaveBeenCalledTimes(1)
      })

      test('バリデーションエラーの時に、開始ボタンを押しても計測が開始しないこと', () => {
        userEvent.clear(screen.getByRole('textbox'))
        userEvent.click(screen.getByAltText('startIcon'))
        expect(calculateCurrentCount).toHaveBeenCalledTimes(0)
        expect(fetchMock).toHaveBeenCalledTimes(0)
      })
    })

    describe('計測中', () => {
      beforeEach(() => {
        calculateCurrentCount = jest.fn()
        pauseTimer = jest.fn()
        openBreakdown = jest.fn()
        removeTracker = jest.fn()

        render(
          <Wrapper
            initialState={initialStateStopped}
            tracker={trackerInProgress}
            calculateCurrentCount={calculateCurrentCount}
            pauseTimer={pauseTimer}
            openBreakdown={openBreakdown}
            removeTracker={removeTracker}
          />
        )
      })
      test('停止ボタンを押すと計測が中断する', () => {
        userEvent.click(screen.getByAltText('pauseIcon'))
        expect(pauseTimer).toHaveBeenCalledTimes(1)
        expect(dispatch).toHaveBeenCalledTimes(1)
        expect(fetchMock).toHaveBeenCalledTimes(1)
      })
    })
  })
})
