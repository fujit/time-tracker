import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import ReactModal from 'react-modal'
import { Modal } from '../components/Modal'

type WrapperProps = {
  isOpen: boolean
  onRequestClose: () => void
}

const Wrapper: React.FC<WrapperProps> = ({ isOpen, onRequestClose }) => {
  ReactModal.setAppElement(document.createElement('div'))
  return (
    <Modal id="#app" isOpen={isOpen} onRequestClose={onRequestClose}>
      <div data-testid="modalContent">
        <h1>Test</h1>
      </div>
    </Modal>
  )
}

describe('Modal Component', () => {
  let onRequestClose: jest.Mock
  describe('モーダルを開いている時', () => {
    beforeEach(() => {
      onRequestClose = jest.fn()
      render(<Wrapper isOpen onRequestClose={onRequestClose} />)
    })

    test('モーダルが開いていること', () => {
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })

    test('モーダルの中身が表示されていること', () => {
      expect(screen.getByTestId('modalContent')).toBeInTheDocument()
    })

    test.todo('ESC キーでモーダルが閉じること')
    test.todo('画面外をクリックすることで、モーダルが閉じること')
  })

  describe('モーダルが閉じている時', () => {
    beforeEach(() => {
      onRequestClose = jest.fn()
      render(<Wrapper isOpen={false} onRequestClose={onRequestClose} />)
    })

    test('モーダルが閉じていること', () => {
      expect(screen.queryByRole('dialog')).toBeNull()
    })

    test('モーダルの中身が表示されていないこと', () => {
      expect(screen.queryByTestId('modalContent')).toBeNull()
    })
  })
})
