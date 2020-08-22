import React from 'react'
import * as styles from './TrackerList.scss'
import { clipboardCopy } from '../../utils/Util'
import { CopyIcon } from '../Icon/Icon'

type TrackerSummary = {
  name: string | null
  time: string | null
}

type Props = {
  isDisplayCopiedMessage: boolean
  copySummary: () => void
}

const Component: React.FC<Props> = ({ isDisplayCopiedMessage, copySummary }) => (
  <>
    <CopyIcon width={35} height={35} onClick={copySummary} />
    {isDisplayCopiedMessage && <p className={styles.copiedMessage}>Copied</p>}
  </>
)

export const TrackerCopy: React.FC = () => {
  const [isDisplayCopiedMessage, setIsDisplayCopiedMessage] = React.useState(false)

  const arrangeTrackerData = (summary: TrackerSummary[]) => {
    // TODO: 複数種類
    const copyData = summary.reduce(
      (previous, current) => `${previous}・ ${current.name}: ${current.time} \n`,
      ''
    )

    return copyData
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
      name: name.getAttribute('value'),
      time: timeList[index].textContent,
    }))

    const copyData = arrangeTrackerData(trackerSummary)
    const result = clipboardCopy(copyData)

    if (result) {
      setIsDisplayCopiedMessage(true)

      setTimeout(() => {
        setIsDisplayCopiedMessage(false)
      }, 1000 * 5)
    }
  }

  return <Component isDisplayCopiedMessage={isDisplayCopiedMessage} copySummary={copySummary} />
}
