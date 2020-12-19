import React, { VFC, CSSProperties } from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import ReactModal from 'react-modal'
import { Modal } from '../components/Modal'

type WrapperProps = {
  isOpen: boolean
  onRequestClose: () => void
  styles?: CSSProperties
}

const Wrapper: VFC<WrapperProps> = ({ isOpen, onRequestClose, styles }) => {
  ReactModal.setAppElement(document.createElement('div'))
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} styles={styles}>
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

  describe('パラメータ', () => {
    beforeEach(() => {
      onRequestClose = jest.fn()
      const customStyles: CSSProperties = {
        backgroundColor: 'green',
      }
      render(<Wrapper isOpen onRequestClose={onRequestClose} styles={customStyles} />)
    })

    test('指定したスタイルを適用できること', () => {
      expect(screen.getByRole('dialog')).toHaveStyle('background-color: green')
    })
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
