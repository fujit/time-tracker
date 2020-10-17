import React, { FC } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { StateContext } from '../utils/contexts/StoreContext'
import { Component, TrackerCopy } from '../components/TrackerCopy'

type ComponentProps = {
  isCopied: boolean
  onCopy: jest.Mock
}

const ComponentWrapper: FC<ComponentProps> = (props) => <Component {...props} />

describe('TrackerCopyComponent', () => {
  let onCopy: jest.Mock
  beforeEach(() => {
    render(<ComponentWrapper isCopied={false} onCopy={onCopy} />)
  })

  test('コピーアイコンが表示されていること', () => {
    expect(screen.getByAltText('copy')).toBeInTheDocument()
  })

  test('コピー後のメッセージが表示されていないこと', () => {
    expect(screen.queryByText('Copied')).toBeNull()
  })
})

const TrackerCopyWrapper: FC = () => {
  const state = {
    trackers: [],
    inProgressId: undefined,
  }

  return (
    <StateContext.Provider value={state}>
      <TrackerCopy />
    </StateContext.Provider>
  )
}

describe('TrackerCopy', () => {
  beforeEach(() => {
    render(<TrackerCopyWrapper />)
  })

  test.skip('コピーアイコンを押した時、コピーしたことが表示される', () => {
    userEvent.click(screen.getByAltText('copy'))
    expect(screen.getByText('Copied')).toBeInTheDocument()
  })
})
