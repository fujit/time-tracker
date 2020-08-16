import * as types from './actionTypes'

export function start(name: string, day: string, startTime: Date) {
  return { type: types.START, payload: { name, day, startTime } }
}

export function restart(id: string, startTime: Date) {
  return { type: types.RESTART, payload: { id, startTime } }
}

export function pause(id: string) {
  return { type: types.PAUSE, payload: { id } }
}

export function updateName(id: string, name: string) {
  return { type: types.UPDATE_NAME, payload: { id, name } }
}

export function updateTimer(trackerId: string, timerId: string, startTimer: Date, endTimer: Date) {
  return { type: types.UPDATE_TIMER, payload: { trackerId, timerId, startTimer, endTimer } }
}
