export const clipboardCopy = (data: string) => {
  const textarea = document.createElement('textarea')
  textarea.value = data
  document.body.appendChild(textarea)
  textarea.focus()
  textarea.select()
  const res = document.execCommand('copy')
  textarea.remove()

  return res
}
