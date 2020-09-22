import { useState, useCallback } from 'react'

type UseModalResult = [boolean, (open: boolean) => void]

export const useModal = (): UseModalResult => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleModal = useCallback((open: boolean) => {
    setIsOpen(open)
  }, [])

  return [isOpen, toggleModal]
}
