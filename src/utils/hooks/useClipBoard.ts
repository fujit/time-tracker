import { useState, useEffect, useCallback } from 'react'

type UseClipBoardReturn = [(value: string) => void, boolean]

export const useClipBoard = (): UseClipBoardReturn => {
  const [isCopied, setIsCopied] = useState(false)

  const onCopy = useCallback((value: string) => {
    const textarea = document.createElement('textarea')
    textarea.value = value
    document.body.appendChild(textarea)
    textarea.focus()
    textarea.select()
    const res = document.execCommand('copy')

    if (res) {
      setIsCopied(true)
    }

    textarea.remove()
  }, [])

  useEffect(() => {
    if (isCopied) {
      setTimeout(() => {
        setIsCopied(false)
      }, 1000 * 5)
    }
  }, [isCopied])

  return [onCopy, isCopied]
}
