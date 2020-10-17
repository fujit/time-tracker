import { useState, useEffect, useCallback } from 'react'

type UseClipBoardReturn = [(value: string) => void, boolean]

export const useClipBoard = (): UseClipBoardReturn => {
  const [isCopied, setIsCopied] = useState(false)

  const onCopy = useCallback((value: string) => {
    // TODO: 許可されていることの確認
    navigator.clipboard.writeText(value).then(() => {
      setIsCopied(true)
    })
  }, [])

  useEffect(() => {
    let id: number
    if (isCopied) {
      id = window.setTimeout(() => {
        setIsCopied(false)
      }, 1000 * 5)
    }
    return () => clearTimeout(id)
  }, [isCopied])

  return [onCopy, isCopied]
}
