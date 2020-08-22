import React from 'react'
import ReactModal from 'react-modal'

type Props = {
  isOpen: boolean
  style?: ReactModal.Styles
  onRequestClose: () => void
}

type ContainerProps = {
  id: string
} & Props

const Component: React.FC<Props> = ({ children, ...props }) => (
  <ReactModal {...props} shouldCloseOnEsc shouldCloseOnOverlayClick>
    {children}
  </ReactModal>
)

export const Modal: React.FC<ContainerProps> = ({ id, ...props }) => {
  ReactModal.setAppElement(id)

  return <Component {...props} />
}
