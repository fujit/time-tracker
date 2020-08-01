import * as React from 'react'
import classNames from 'classnames/bind'
import * as styles from './Icon.scss'
import copy from '../../assets/img/copy.svg'

type TrackerSummary = {
  name: string | null
  time: string | null
}

type Props = {
  className?: string
} & JSX.IntrinsicElements['img']

const Component: React.FC<Props> = ({ ...props }) => (
  <img {...props} src={copy} alt="copy_icon" width={35} height={35} />
)

export const CopyIcon: React.FC<Props> = (props) => {
  const arrangeTrackerData = (summary: TrackerSummary[]) => {
    // TODO: 複数種類
    const copyData = summary.reduce(
      (previous, current) => `${previous}${current.name}: ${current.time} \n`,
      ''
    )

    return copyData
  }

  const clipboardCopy = (data: string) => {
    const textarea = document.createElement('textarea')
    textarea.value = data
    document.body.appendChild(textarea)
    textarea.focus()
    textarea.select()
    document.execCommand('copy')

    textarea.remove()
  }

  const copySummary = () => {
    // 値取得
    const nameList = Array.from(document.getElementsByClassName('trackerName'))
    const timeList = Array.from(document.getElementsByClassName('trackerTime'))

    // TODO: エラーハンドリング

    if (nameList.length !== timeList.length) {
      return
    }

    const trackerSummary: TrackerSummary[] = nameList.map((name, index) => ({
      name: name.textContent,
      time: timeList[index].textContent,
    }))

    const copyData = arrangeTrackerData(trackerSummary)
    clipboardCopy(copyData)
  }

  return (
    <Component
      {...props}
      className={classNames.bind(styles)('icon', props.className)}
      onClick={copySummary}
    />
  )
}
