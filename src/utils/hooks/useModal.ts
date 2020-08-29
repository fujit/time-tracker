import React from 'react'

type UseModalResult = [boolean, (open: boolean) => void]

export const useModal = (): UseModalResult => {
  const [isOpen, setIsOpen] = React.useState(false)

  const toggleModal = React.useCallback((open: boolean) => {
    setIsOpen(open)
  }, [])

  return [isOpen, toggleModal]
}
