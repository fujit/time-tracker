import React, { FC, CSSProperties } from 'react'
import ReactModal from 'react-modal'

type Props = {
  isOpen: boolean
  onRequestClose: () => void
  style: ReactModal.Styles
}

const Component: FC<Props> = ({ children, ...props }) => (
  <ReactModal {...props} shouldCloseOnEsc shouldCloseOnOverlayClick>
    {children}
  </ReactModal>
)

type ContainerProps = {
  isOpen: boolean
  onRequestClose: () => void
  styles?: CSSProperties
}

export const Modal: FC<ContainerProps> = ({ isOpen, onRequestClose, styles, children }) => {
  if (process.env.NODE_ENV !== 'test') {
    ReactModal.setAppElement('#app')
  }

  const style: ReactModal.Styles = {
    overlay: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    content: {
      position: 'relative',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      minHeight: '400px',
      maxHeight: '500px',
      minWidth: '400px',
      maxWidth: '100%',
      ...styles,
    },
  }

  return <Component {...{ isOpen, onRequestClose, style, children }} />
}
