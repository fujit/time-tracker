import { getDiff } from './DateUtil'

export const createNewTracker = (
  id: string,
  trackerName: string,
  today: string,
  start: Date,
  key?: number
): Tracker => {
  return {
    id,
    key,
    name: trackerName.trim(),
    inProgress: true,
    day: today,
    timers: [{ id: '0', start }],
    isActive: true,
  }
}

export const updatePauseTimer = (tracker: Tracker, endTime: Date) => {
  const targetTimer = tracker.timers.find((timer) => !timer.end)

  if (!targetTimer) {
    return
  }

  const minute = getDiff(targetTimer.start, endTime, 'minute', true)

  const newTimer: Timer = {
    id: targetTimer.id,
    start: targetTimer.start,
    end: endTime,
    minute,
  }

  return newTimer
}

export const getNextTimerId = (timers: Timer[]) =>
  (
    timers.reduce((previous, current) => Math.max(previous, parseInt(current.id, 10)), 0) + 1
  ).toString()
