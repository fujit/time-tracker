import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { StateContext, DispatchContext } from '../utils/contexts/StoreContext'
// import { reducer, initialState } from '../reducer'
import { TrackerItem } from '../components/TrackerItem'

type WrapperProps = {
  inProgressId?: string
  tracker: Tracker
  calculateCurrentCount: jest.Mock
  pauseTimer: jest.Mock
  openBreakdown: jest.Mock
  removeTracker: jest.Mock
}

const testData: Tracker = {
  id: 'abc',
  name: 'React',
  day: '2020-09-20',
  timers: [],
  isActive: true,
  inProgress: false,
}

let dispatch: jest.Mock
const Wrapper: React.FC<WrapperProps> = (props) => {
  const state = {
    trackers: [testData],
    inProgressId: props.inProgressId,
  }

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
            tracker={testData}
            calculateCurrentCount={calculateCurrentCount}
            pauseTimer={pauseTimer}
            openBreakdown={openBreakdown}
            removeTracker={removeTracker}
          />
        )
      })

      test('トラッカー名が入力されたテキストボックスが表示されていること', () => {
        expect(screen.getByRole('textbox')).toHaveValue('React')
      })

      test('内訳を見るボタンが表示されていること', () => {
        expect(screen.getByTestId('breakdown-button')).toHaveTextContent('内訳を見る')
      })

      test('削除するボタンが表示されていること', () => {
        expect(screen.getByTestId('remove-button')).toHaveTextContent('削除する')
        expect(screen.getByTestId('remove-button')).toBeEnabled()
      })

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
            tracker={testData}
            calculateCurrentCount={calculateCurrentCount}
            pauseTimer={pauseTimer}
            openBreakdown={openBreakdown}
            removeTracker={removeTracker}
            inProgressId="xxx"
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
            tracker={{ ...testData, inProgress: true }}
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
            tracker={testData}
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
          type: 'UPDATE_TRACKER_NAME',
          payload: { id: testData.id, name: `${testData.name}.js` },
        })
      })

      test('フォーカスを外したら、更新されること', () => {
        userEvent.type(screen.getByRole('textbox'), 'a')
        userEvent.tab()
        expect(screen.getByRole('textbox')).not.toHaveFocus()
        expect(dispatch).toHaveBeenCalledTimes(1)
        expect(dispatch).toHaveBeenCalledWith({
          type: 'UPDATE_TRACKER_NAME',
          payload: { id: testData.id, name: `${testData.name}a` },
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
        expect(openBreakdown).toHaveBeenCalledWith(testData)
      })

      test('名前を変更して、内訳を見るボタンを押した時、変更後の名前が反映されること', () => {
        userEvent.type(screen.getByRole('textbox'), ' vs Svelte')
        userEvent.click(screen.getByTestId('breakdown-button'))
        expect(openBreakdown).toHaveBeenCalledTimes(1)
        expect(openBreakdown).toHaveBeenCalledWith({
          ...testData,
          name: `${testData.name} vs Svelte`,
        })
      })

      test('削除するボタンを押すと、イベントが発火すること', () => {
        userEvent.click(screen.getByTestId('remove-button'))
        expect(removeTracker).toHaveBeenCalledTimes(1)
        expect(removeTracker).toHaveBeenCalledWith(testData.id)
      })

      test('開始ボタンを押すと計測が開始すること', () => {
        userEvent.click(screen.getByAltText('startIcon'))
        expect(calculateCurrentCount).toHaveBeenCalledTimes(1)
        expect(dispatch).toBeCalledTimes(1)
      })

      test('バリデーションエラーの時に、開始ボタンを押しても計測が開始しないこと', () => {
        userEvent.clear(screen.getByRole('textbox'))
        userEvent.click(screen.getByAltText('startIcon'))
        expect(calculateCurrentCount).toHaveBeenCalledTimes(0)
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
            tracker={{ ...testData, inProgress: true }}
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
        expect(dispatch).toHaveBeenCalledWith({
          type: 'PAUSE_MEASURE',
          payload: { id: testData.id },
        })
      })
    })
  })
})
