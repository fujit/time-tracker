import * as types from './actionTypes'

export function start(name: string, day: string, startTime: Date) {
  return { type: types.START, payload: { name, day, startTime } }
}

export function restart(id: string, startTime: Date) {
  return { type: types.RESTART, payload: { id, startTime } }
}

export function pause(id: string, endTime: Date) {
  return { type: types.PAUSE, payload: { id, endTime } }
}

export function updateName(id: string, name: string) {
  return { type: types.UPDATE_NAME, payload: { id, name } }
}

export function updateTimer(trackerId: string, timerId: string, startTimer: Date, endTimer: Date) {
  return { type: types.UPDATE_TIMER, payload: { trackerId, timerId, startTimer, endTimer } }
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
