import React from 'react'

type UseModalResult = [boolean, () => void, () => void]

export const useModal = (): UseModalResult => {
  const [isOpen, setIsOpen] = React.useState(false)

  const openModal = React.useCallback(() => {
    setIsOpen(true)
  }, [])

  const closeModal = React.useCallback(() => {
    setIsOpen(false)
  }, [])

  return [isOpen, openModal, closeModal]
}
