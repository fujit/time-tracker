import React, { VFC } from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TrackerButtonComponent, TrackerButton } from '../../components/TrackerItem/TrackerButton'

type WrapperProps = {
  trackerId: string
  inProgress: boolean
  openBreakdown: jest.Mock
  removeTracker: jest.Mock
}

const TrackerButtonComponentWrapper: VFC<WrapperProps> = (props) => (
  <TrackerButtonComponent {...props} />
)

describe('TrackerButtonComponent', () => {
  let openBreakdown: jest.Mock
  let removeTracker: jest.Mock

  describe('計測中', () => {
    beforeEach(() => {
      openBreakdown = jest.fn()
      removeTracker = jest.fn()

      render(
        <TrackerButtonComponentWrapper
          trackerId="AAA"
          inProgress
          openBreakdown={openBreakdown}
          removeTracker={removeTracker}
        />
      )
    })

    test('内訳を見るボタンが存在していること', () => {
      expect(screen.getByTestId('breakdown-button')).toBeInTheDocument()
    })

    test('削除するボタンが存在していること', () => {
      expect(screen.getByTestId('remove-button')).toBeInTheDocument()
    })

    test('削除するボタンは非活性であること', () => {
      expect(screen.getByTestId('remove-button')).toBeDisabled()
    })

    test('ボタンは見えない状態であること', () => {
      expect(screen.getByTestId('button-list')).toHaveClass('invisible')
    })

    test.todo('アイテムにホバーした時に「内訳を見る」「削除」ボタンが見えるようになる')
  })

  describe('停止中', () => {
    beforeEach(() => {
      openBreakdown = jest.fn()
      removeTracker = jest.fn()

      render(
        <TrackerButtonComponentWrapper
          trackerId="AAA"
          inProgress={false}
          openBreakdown={openBreakdown}
          removeTracker={removeTracker}
        />
      )
    })

    test('削除するボタンが活性であること', () => {
      expect(screen.getByTestId('remove-button')).toBeEnabled()
    })
  })
})

type ContainerProps = {
  trackerId: string
  inProgress: boolean
  removeTracker: jest.Mock
  openBreakdown: jest.Mock
}

const TrackerButtonWrapper: VFC<ContainerProps> = (props) => <TrackerButton {...props} />

describe('TrackerButton', () => {
  let openBreakdown: jest.Mock
  let removeTracker: jest.Mock

  describe('計測中', () => {
    beforeEach(() => {
      openBreakdown = jest.fn()
      removeTracker = jest.fn()

      render(
        <TrackerButtonWrapper
          trackerId="AAA"
          inProgress
          openBreakdown={openBreakdown}
          removeTracker={removeTracker}
        />
      )
    })

    test('内訳を見るボタンを押すと、イベントが発火すること', () => {
      userEvent.click(screen.getByTestId('breakdown-button'))
      expect(openBreakdown).toHaveBeenCalledTimes(1)
      expect(openBreakdown).toHaveBeenCalledWith('AAA')
    })

    test('削除ボタンを押しても、イベントが発火しないこと', () => {
      userEvent.click(screen.getByTestId('remove-button'))
      expect(removeTracker).not.toBeCalled()
    })
  })

  describe('停止中', () => {
    beforeEach(() => {
      openBreakdown = jest.fn()
      removeTracker = jest.fn()

      render(
        <TrackerButtonWrapper
          trackerId="AAA"
          inProgress={false}
          openBreakdown={openBreakdown}
          removeTracker={removeTracker}
        />
      )
    })

    test('削除ボタンを押した時、イベントが発火すること', () => {
      userEvent.click(screen.getByTestId('remove-button'))
      expect(removeTracker).toHaveBeenCalledTimes(1)
      expect(removeTracker).toHaveBeenCalledWith('AAA')
    })
  })
})
