import * as types from './actionTypes'
import * as creators from './actionCreators'
import { CreatorsToActions } from './creatorsToActions'
import { Store } from './Store'
import * as StringUtil from './utils/StringUtil'
import * as DateUtil from './utils/DateUtil'

const store = Store.instance

export type State = {
  trackers: Tracker[]
  inProgressId: string | undefined
}

export type Actions = CreatorsToActions<typeof creators>

const getNextTimerId = (timers: Timer[]) =>
  (
    timers.reduce((previous, current) => Math.max(previous, parseInt(current.id, 10)), 0) + 1
  ).toString()

function initialState(injects?: Partial<State>): State {
  return {
    trackers: [] as Tracker[],
    inProgressId: undefined,
    ...injects,
  }
}

function reducer(state: State, action: Actions): State {
  switch (action.type) {
    case types.START: {
      if (state.inProgressId) {
        return state
      }

      const id = StringUtil.generateTrackerId()
      const newTracker: Tracker = {
        id,
        name: action.payload.name,
        inProgress: true,
        day: action.payload.day,
        timers: [
          {
            id: '0',
            start: action.payload.startTime,
          },
        ],
      }

      const trackers = [...state.trackers, newTracker]

      store.save(trackers)

      return {
        ...state,
        trackers,
        inProgressId: id,
      }
    }

    case types.RESTART: {
      if (state.inProgressId) {
        return state
      }

      const trackers = state.trackers.map((tracker) =>
        tracker.id === action.payload.id
          ? {
              ...tracker,
              inProgress: true,
              timers: [
                ...tracker.timers,
                { id: getNextTimerId(tracker.timers), start: action.payload.startTime },
              ],
            }
          : tracker
      )

      store.save(trackers)

      return {
        ...state,
        trackers,
        inProgressId: action.payload.id,
      }
    }

    case types.PAUSE: {
      if (!state.inProgressId) {
        return state
      }

      const trackers = state.trackers.map((tracker) =>
        tracker.id === action.payload.id && tracker.inProgress
          ? {
              ...tracker,
              inProgress: false,
              timers: tracker.timers.map((timer) =>
                !timer.end
                  ? {
                      ...timer,
                      end: DateUtil.getCurrentDate(),
                      minute: DateUtil.getTimeFromNow(timer.start, 'minute', true),
                    }
                  : timer
              ),
            }
          : tracker
      )

      store.save(trackers)

      return {
        ...state,
        trackers,
        inProgressId: undefined,
      }
    }

    case types.UPDATE_NAME: {
      const trackers = state.trackers.map((tracker) =>
        tracker.id === action.payload.id ? { ...tracker, name: action.payload.name } : tracker
      )

      store.save(trackers)

      return {
        ...state,
        trackers,
      }
    }

    case types.UPDATE_TIMER: {
      const trackers = state.trackers.map((tracker) =>
        tracker.id === action.payload.trackerId
          ? {
              ...tracker,
              timers: tracker.timers.map((timer) =>
                timer.id === action.payload.timerId
                  ? {
                      ...timer,
                      start: action.payload.startTimer,
                      end: action.payload.endTimer,
                    }
                  : timer
              ),
            }
          : tracker
      )

      store.save(trackers)

      return {
        ...state,
        trackers,
      }
    }

    default:
      throw new Error()
  }
}

export { reducer, initialState }
