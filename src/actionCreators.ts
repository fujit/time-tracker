import * as types from './actionTypes'

export function start(newTracker: Tracker) {
  return { type: types.START, payload: { newTracker } }
}

export function restart(trackerId: string, nextTimerId: string, startTime: Date) {
  return { type: types.RESTART, payload: { trackerId, nextTimerId, startTime } }
}

export function pause(trackerId: string, updatedTimer: Timer) {
  return { type: types.PAUSE, payload: { trackerId, updatedTimer } }
}

export function rename(id: string, name: string, projectKey?: number) {
  return { type: types.RENAME, payload: { id, name, projectKey } }
}

export function updateTimer(trackerId: string, updatedTimer: Timer) {
  return { type: types.UPDATE_TIMER, payload: { trackerId, updatedTimer } }
}

export function deleteTimer(trackerId: string, timerId: string) {
  return { type: types.DELETE_TIMER, payload: { trackerId, timerId } }
}

export function removeTracker(trackerId: string) {
  return { type: types.REMOVE_TRACKER, payload: { trackerId } }
}

export function restoreTracker(trackerId: string) {
  return { type: types.RESTORE_TRACKER, payload: { trackerId } }
}
