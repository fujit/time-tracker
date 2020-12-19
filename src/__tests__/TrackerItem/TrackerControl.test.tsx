import React, { VFC } from 'react'
import '@testing-library/jest-dom'
import { FetchMock } from 'jest-fetch-mock'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  StartComponent,
  PauseComponent,
  TrackerControl,
} from '../../components/TrackerItem/TrackerControl'
import { DispatchContext } from '../../utils/contexts/StoreContext'

type StartComponentProps = {
  restartMeasure: jest.Mock
  inProgressId?: string
  isValid: boolean
}

const StartComponentWrapper: VFC<StartComponentProps> = (props) => <StartComponent {...props} />

describe('StartComponent', () => {
  let restartMeasure: jest.Mock

  describe('Stopped', () => {
    describe('Validation OK', () => {
      beforeEach(() => {
        restartMeasure = jest.fn()
        render(<StartComponentWrapper restartMeasure={restartMeasure} isValid />)
      })

      test('開始ボタンが表示されていること', () => {
        expect(screen.getByAltText('startIcon')).toBeInTheDocument()
      })

      test('開始ボタンは活性であること', () => {
        expect(screen.getByAltText('startIcon')).not.toHaveClass('cursor-not-allowed', 'opacity-50')
      })

      test('開始ボタンを押すと、再開イベントが発火すること', () => {
        userEvent.click(screen.getByAltText('startIcon'))
        expect(restartMeasure).toHaveBeenCalledTimes(1)
      })
    })

    describe('Validation NG', () => {
      test('開始ボタンが非活性であること', () => {
        restartMeasure = jest.fn()
        render(<StartComponentWrapper restartMeasure={restartMeasure} isValid={false} />)
        expect(screen.getByAltText('startIcon')).toHaveClass('cursor-not-allowed', 'opacity-50')
      })
    })
  })

  describe('inProgressId', () => {
    test('開始ボタンが非活性であること', () => {
      restartMeasure = jest.fn()
      render(<StartComponentWrapper restartMeasure={restartMeasure} inProgressId="ABC" isValid />)
      expect(screen.getByAltText('startIcon')).toHaveClass('cursor-not-allowed', 'opacity-50')
    })
  })
})

type PauseComponentProps = {
  pauseMeasure: jest.Mock
}

const PauseComponentWrapper: VFC<PauseComponentProps> = (props) => <PauseComponent {...props} />

describe('PauseComponent', () => {
  let pauseMeasure: jest.Mock

  beforeEach(() => {
    pauseMeasure = jest.fn()

    render(<PauseComponentWrapper pauseMeasure={pauseMeasure} />)
  })

  test('停止ボタンが表示されていること', () => {
    expect(screen.getByAltText('pauseIcon')).toBeInTheDocument()
  })

  test('停止ボタンを押した時、停止イベントが発火すること', () => {
    userEvent.click(screen.getByAltText('pauseIcon'))
    expect(pauseMeasure).toHaveBeenCalledTimes(1)
  })
})

type ContainerProps = {
  tracker: Tracker
  inProgressId?: string
  isValid: boolean
  calculateCurrentCount: jest.Mock
  pauseTimer: jest.Mock
}

let dispatch: jest.Mock
const TrackerControlWrapper: VFC<ContainerProps> = (props) => {
  dispatch = jest.fn()

  return (
    <DispatchContext.Provider value={dispatch}>
      <TrackerControl {...props} />
    </DispatchContext.Provider>
  )
}

let calculateCurrentCount: jest.Mock
let pauseTimer: jest.Mock
describe('TrackerControl', () => {
  beforeEach(() => {
    fetchMock.resetMocks()
  })

  describe('inProgress', () => {
    beforeEach(() => {
      const tracker: Tracker = {
        id: 'TGF',
        name: 'The Godfather',
        day: '1972-07-15',
        inProgress: true,
        timers: [{ id: '0', start: new Date('1972-07-15 09:00:00') }],
        isActive: true,
      }
      pauseTimer = jest.fn()
      calculateCurrentCount = jest.fn()
      render(
        <TrackerControlWrapper
          {...{ tracker, inProgressId: 'TGF', isValid: true, calculateCurrentCount, pauseTimer }}
        />
      )
    })

    test('停止ボタンが表示されていること', () => {
      expect(screen.getByAltText('pauseIcon')).toBeInTheDocument()
    })

    test('開始ボタンが表示されていないこと', () => {
      expect(screen.queryByAltText('startIcon')).toBeNull()
    })

    test('停止ボタンを押した時、停止イベントが呼ばれること', () => {
      userEvent.click(screen.getByAltText('pauseIcon'))

      expect(pauseTimer).toHaveBeenCalledTimes(1)
      expect(dispatch).toHaveBeenCalledTimes(1)
      expect(fetchMock).toHaveBeenCalledTimes(1)
    })
  })

  describe('stopped', () => {
    describe('Validation OK', () => {
      beforeEach(() => {
        const tracker: Tracker = {
          id: 'TGF',
          name: 'The Godfather',
          day: '1972-07-15',
          inProgress: false,
          timers: [
            {
              id: '0',
              start: new Date('1972-07-15 09:00:00'),
              end: new Date('1972-07-15 10:00:00'),
              minute: 60,
            },
          ],
          isActive: true,
        }
        pauseTimer = jest.fn()
        calculateCurrentCount = jest.fn()
        render(
          <TrackerControlWrapper
            {...{ tracker, isValid: true, calculateCurrentCount, pauseTimer }}
          />
        )
      })

      test('開始ボタンが表示されていること', () => {
        expect(screen.getByAltText('startIcon')).toBeInTheDocument()
      })

      test('停止ボタンが表示されていないこと', () => {
        expect(screen.queryByAltText('pauseIcon')).toBeNull()
      })

      test('開始ボタンを押した時、開始イベントが呼ばれること', () => {
        userEvent.click(screen.getByAltText('startIcon'))

        expect(dispatch).toHaveBeenCalledTimes(1)
        expect(calculateCurrentCount).toHaveBeenCalledTimes(1)
        expect(fetchMock).toHaveBeenCalledTimes(1)
      })
    })

    describe('Validation NG', () => {
      beforeEach(() => {
        const tracker: Tracker = {
          id: 'TGF',
          name: '',
          day: '1972-07-15',
          inProgress: false,
          timers: [
            {
              id: '0',
              start: new Date('1972-07-15 09:00:00'),
              end: new Date('1972-07-15 10:00:00'),
              minute: 60,
            },
          ],
          isActive: true,
        }
        pauseTimer = jest.fn()
        calculateCurrentCount = jest.fn()
        render(
          <TrackerControlWrapper
            {...{ tracker, isValid: false, calculateCurrentCount, pauseTimer }}
          />
        )
      })

      test('開始ボタンを押した時、開始イベントが呼ばれないこと', () => {
        userEvent.click(screen.getByAltText('startIcon'))

        expect(dispatch).not.toBeCalled()
        expect(calculateCurrentCount).not.toBeCalled()
        expect(fetchMock).not.toBeCalled()
      })
    })
  })
})
