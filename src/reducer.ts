import * as types from './actionTypes'
import * as creators from './actionCreators'
import { CreatorsToActions } from './creatorsToActions'
import { Store } from './Store'
import * as StringUtil from './utils/StringUtil'
import * as DateUtil from './utils/DateUtil'

const store = Store.instance

export type State = {
  trackers: Tracker[]
  inProgress: boolean
}

export type Actions = CreatorsToActions<typeof creators>

function initialState(injects?: Partial<State>): State {
  return {
    trackers: [] as Tracker[],
    inProgress: false,
    ...injects,
  }
}

function reducer(state: State, action: Actions): State {
  switch (action.type) {
    case types.START: {
      if (state.inProgress) {
        return state
      }

      const currentDate = DateUtil.getCurrentDate()
      const newTracker: Tracker = {
        id: StringUtil.generateTrackerId(),
        name: action.payload.name,
        inProgress: true,
        day: action.payload.day,
        timers: [
          {
            start: currentDate,
          },
        ],
      }

      const trackers = [...state.trackers, newTracker]

      store.save(trackers)

      return {
        ...state,
        trackers,
        inProgress: true,
      }
    }

    case types.RESTART: {
      if (state.inProgress) {
        return state
      }

      const currentDate = DateUtil.getCurrentDate()
      const trackers = state.trackers.map((tracker) =>
        tracker.id === action.payload.id
          ? {
              ...tracker,
              inProgress: true,
              timers: [...tracker.timers, { start: currentDate }],
            }
          : tracker
      )

      store.save(trackers)

      return {
        ...state,
        trackers,
        inProgress: true,
      }
    }

    case types.PAUSE: {
      if (!state.inProgress) {
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
        inProgress: false,
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

    default:
      throw new Error()
  }
}

export { reducer, initialState }
