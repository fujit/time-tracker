import { getDiff } from './DateUtil'

export const createNewTracker = (
  id: string,
  trackerName: string,
  today: string,
  start: Date,
  projectKey?: number
): Tracker => {
  return {
    id,
    projectKey,
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

export const isValidTimeDuration = (start: Time, end: Time) => {
  const startHour = parseInt(start.hour, 10)
  const startMinute = parseInt(start.minute, 10)
  const endHour = parseInt(end.hour, 10)
  const endMinute = parseInt(end.minute, 10)

  if (startHour > endHour) {
    return false
  }

  if (startHour === endHour && startMinute > endMinute) {
    return false
  }

  return true
}
