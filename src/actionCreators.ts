import * as types from './actionTypes'

export function start(name: string, day: string) {
  return { type: types.START, payload: { name, day } }
}

export function restart(id: string) {
  return { type: types.RESTART, payload: { id } }
}

export function pause(id: string) {
  return { type: types.PAUSE, payload: { id } }
}

export function changeName(id: string, name: string) {
  return { type: types.CHANGE_NAME, payload: { id, name } }
}
