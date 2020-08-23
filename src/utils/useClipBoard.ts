import React from 'react'

type UseClipBoardReturn = [(value: string) => void, boolean]

export const useClipBoard = (): UseClipBoardReturn => {
  const [isCopied, setIsCopied] = React.useState(false)

  const onCopy = React.useCallback((value: string) => {
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

  React.useEffect(() => {
    if (isCopied) {
      setTimeout(() => {
        setIsCopied(false)
      }, 1000 * 5)
    }
  }, [isCopied])

  return [onCopy, isCopied]
}
