import React, { VFC } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { StateContext, DispatchContext } from '../../utils/contexts/StoreContext'
import { TrackerItem } from '../../components/TrackerItem'
import { State } from '../../reducer'

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

const initialStateStopped: State = {
  trackers: [trackerStopped],
  inProgressId: undefined,
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
const Wrapper: VFC<WrapperProps> = ({ initialState, ...props }) => {
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

      test('バリデーションエラーのメッセージが表示されていない', () => {
        expect(screen.queryByRole('alert')).toBeNull()
      })

      test('バリデーションエラー時、メッセージが表示されていること', () => {
        userEvent.clear(screen.getByRole('textbox'))
        expect(screen.getByRole('alert')).toBeInTheDocument()
      })
    })
  })
})
