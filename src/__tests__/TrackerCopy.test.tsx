import React, { FC } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { StateContext } from '../utils/contexts/StoreContext'
import { Component, TrackerCopy } from '../components/TrackerCopy'

type ComponentProps = {
  isCopied: boolean
  onCopyDaily: jest.Mock
  onCopyWork: jest.Mock
}

const ComponentWrapper: FC<ComponentProps> = (props) => <Component {...props} />

describe('TrackerCopyComponent', () => {
  let onCopyDaily: jest.Mock
  let onCopyWork: jest.Mock
  beforeEach(() => {
    render(<ComponentWrapper isCopied={false} onCopyDaily={onCopyDaily} onCopyWork={onCopyWork} />)
  })

  test('コピーアイコンが表示されていること', () => {
    expect(screen.getAllByAltText('copy')).toHaveLength(2)
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
      <TrackerCopy trackers={state.trackers} />
    </StateContext.Provider>
  )
}

describe('TrackerCopy', () => {
  beforeEach(() => {
    render(<TrackerCopyWrapper />)
  })

  test.skip('コピーアイコンを押した時、コピーしたことが表示される', () => {
    userEvent.click(screen.getAllByAltText('copy')[0])
    expect(screen.getByText('Copied')).toBeInTheDocument()
  })
})
