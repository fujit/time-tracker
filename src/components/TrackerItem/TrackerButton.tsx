import React, { VFC } from 'react'
import { Button } from '../Button'

type Props = {
  trackerId: string
  inProgress: boolean
  openBreakdown: (trackerId: string) => void
  removeTracker: () => void
}

export const TrackerButtonComponent: VFC<Props> = ({
  openBreakdown,
  removeTracker,
  trackerId,
  inProgress,
}) => (
  <div
    className="flex flex-col invisible xl:flex-row lg:flex-row hover-visibility-child"
    data-testid="button-list"
  >
    <Button
      className="mr-4"
      onClick={() => openBreakdown(trackerId)}
      data-testid="breakdown-button"
    >
      内訳を見る
    </Button>
    <Button
      className="mr-4"
      colorType="danger"
      onClick={removeTracker}
      disabled={inProgress}
      data-testid="remove-button"
    >
      削除する
    </Button>
  </div>
)

type ContainerProps = {
  trackerId: string
  inProgress: boolean
  removeTracker: (trackerId: string) => void
  openBreakdown: (trackerId: string) => void
}

export const TrackerButton: VFC<ContainerProps> = ({
  trackerId,
  inProgress,
  removeTracker,
  openBreakdown,
}) => {
  const remove = () => {
    if (!inProgress) {
      removeTracker(trackerId)
    }
  }
  return (
    <TrackerButtonComponent {...{ trackerId, inProgress, openBreakdown, removeTracker: remove }} />
  )
}
