import { reducer, initialState, Actions, State } from '../reducer'
import * as types from '../actionTypes'

const initialStateStopping: State = {
  trackers: [
    {
      id: '202009181111345',
      name: 'test',
      inProgress: false,
      day: '2020-09-18',
      timers: [
        {
          id: '0',
          start: new Date('2020-09-18 11:00:00'),
          end: new Date('2020-09-18 12:30:00'),
          minute: 90,
        },
      ],
      isActive: true,
    },
  ],
  inProgressId: undefined,
}

const initialStateInProgress: State = {
  trackers: [
    {
      id: '202009181111345',
      name: 'test',
      inProgress: true,
      day: '2020-09-18',
      timers: [
        {
          id: '0',
          start: new Date('2020-09-18 11:00:00'),
        },
      ],
      isActive: true,
    },
  ],
  inProgressId: '202009181111345',
}

const initialStateUnActive: State = {
  trackers: [
    {
      id: '202009181111345',
      name: 'test',
      inProgress: false,
      day: '2020-09-18',
      timers: [
        {
          id: '0',
          start: new Date('2020-09-18 11:00:00'),
          end: new Date('2020-09-18 12:30:00'),
          minute: 90,
        },
      ],
      isActive: false,
    },
    {
      id: '202009181111560',
      name: 'foo',
      inProgress: false,
      day: '2020-09-18',
      timers: [
        {
          id: '0',
          start: new Date('2020-09-18 17:00:00'),
          end: new Date('2020-09-18 18:00:00'),
          minute: 60,
        },
      ],
      isActive: true,
    },
  ],
  inProgressId: undefined,
}

describe('store reducer', () => {
  test('初期値を返すこと', () => {
    expect(reducer(initialState(), {} as Actions)).toStrictEqual({
      trackers: [],
      inProgressId: undefined,
    })
  })

  describe('START', () => {
    test('should handle START', () => {
      const newTracker: Tracker = {
        id: 'test',
        name: 'test',
        day: '2020-09-18',
        timers: [
          {
            id: '1',
            start: new Date('2020-09-18 10:00'),
          },
        ],
        inProgress: true,
        isActive: true,
      }
      const state = reducer(initialState(), {
        type: types.START,
        payload: { newTracker },
      })

      expect(state).toStrictEqual({
        trackers: [newTracker],
        inProgressId: 'test',
      })
    })
  })

  describe('RESTART', () => {
    test('should handle RESTART', () => {
      const state = reducer(initialState(initialStateStopping), {
        type: types.RESTART,
        payload: {
          trackerId: '202009181111345',
          nextTimerId: '1',
          startTime: new Date('2020-09-18 14:00:00'),
        },
      })

      expect(state).toStrictEqual({
        trackers: [
          {
            id: '202009181111345',
            name: 'test',
            inProgress: true,
            day: '2020-09-18',
            timers: [
              {
                id: '0',
                start: new Date('2020-09-18 11:00:00'),
                end: new Date('2020-09-18 12:30:00'),
                minute: 90,
              },
              {
                id: '1',
                start: new Date('2020-09-18 14:00:00'),
              },
            ],
            isActive: true,
          },
        ],
        inProgressId: '202009181111345',
      })
    })

    test('進行中の場合は、現在の state を返す', () => {
      const state = reducer(initialState(initialStateInProgress), {
        type: types.RESTART,
        payload: {
          trackerId: '202009181111345',
          nextTimerId: '1',
          startTime: new Date('2020-09-18 14:00:00'),
        },
      })

      expect(state).toStrictEqual(state)
    })
  })

  describe('PAUSE', () => {
    test('should handle PAUSE', () => {
      const updatedTimer: Timer = {
        id: '0',
        start: new Date('2020-09-18 11:00'),
        end: new Date('2020-09-18 19:00'),
        minute: 480,
      }
      const state = reducer(initialState(initialStateInProgress), {
        type: types.PAUSE,
        payload: { trackerId: '202009181111345', updatedTimer },
      })

      expect(state).toMatchObject({
        trackers: [
          {
            id: '202009181111345',
            name: 'test',
            inProgress: false,
            day: '2020-09-18',
            timers: [
              {
                id: '0',
                start: new Date('2020-09-18 11:00:00'),
                end: new Date('2020-09-18 19:00'),
                minute: 480,
              },
            ],
            isActive: true,
          },
        ],
        inProgressId: undefined,
      })
    })

    test('進行していない場合は、現在の state を返す', () => {
      const updatedTimer: Timer = {
        id: '1',
        start: new Date('2020-09-18 11:00'),
        end: new Date('2020-09-18 18:00'),
        minute: 480,
      }
      const state = reducer(initialState(initialStateStopping), {
        type: types.PAUSE,
        payload: { trackerId: '202009181111345', updatedTimer },
      })

      expect(state).toStrictEqual(state)
    })
  })

  describe('RENAME', () => {
    test('should handle RENAME', () => {
      const state = reducer(initialState(initialStateStopping), {
        type: types.RENAME,
        payload: { id: '202009181111345', name: 'neo test' },
      })

      expect(state).toStrictEqual({
        trackers: [
          {
            id: '202009181111345',
            name: 'neo test',
            inProgress: false,
            day: '2020-09-18',
            timers: [
              {
                id: '0',
                start: new Date('2020-09-18 11:00:00'),
                end: new Date('2020-09-18 12:30:00'),
                minute: 90,
              },
            ],
            isActive: true,
          },
        ],
        inProgressId: undefined,
      })
    })
  })

  describe('UPDATE_TIMER', () => {
    test('should handle UPDATE_TIMER', () => {
      const updatedTimer: Timer = {
        id: '0',
        start: new Date('2020-09-18 10:00:00'),
        end: new Date('2020-09-18 13:00:00'),
        minute: 180,
      }
      const state = reducer(initialState(initialStateStopping), {
        type: types.UPDATE_TIMER,
        payload: {
          trackerId: '202009181111345',
          updatedTimer,
        },
      })

      expect(state).toStrictEqual({
        trackers: [
          {
            id: '202009181111345',
            name: 'test',
            inProgress: false,
            day: '2020-09-18',
            timers: [
              {
                id: '0',
                start: new Date('2020-09-18 10:00:00'),
                end: new Date('2020-09-18 13:00:00'),
                minute: 180,
              },
            ],
            isActive: true,
          },
        ],
        inProgressId: undefined,
      })
    })
  })

  describe('DELETE_TIMER', () => {
    test('should handle DELETE_TIMER', () => {
      const state = reducer(initialState(initialStateStopping), {
        type: types.DELETE_TIMER,
        payload: { trackerId: '202009181111345', timerId: '0' },
      })

      expect(state).toStrictEqual({
        trackers: [
          {
            id: '202009181111345',
            name: 'test',
            inProgress: false,
            day: '2020-09-18',
            timers: [],
            isActive: true,
          },
        ],
        inProgressId: undefined,
      })
    })
  })

  describe('REMOVE_TRACKER', () => {
    test('should handle REMOVE_TRACKER', () => {
      const state = reducer(initialState(initialStateStopping), {
        type: types.REMOVE_TRACKER,
        payload: { trackerId: '202009181111345' },
      })

      expect(state).toStrictEqual({
        trackers: [
          {
            id: '202009181111345',
            name: 'test',
            inProgress: false,
            day: '2020-09-18',
            timers: [
              {
                id: '0',
                start: new Date('2020-09-18 11:00:00'),
                end: new Date('2020-09-18 12:30:00'),
                minute: 90,
              },
            ],
            isActive: false,
          },
        ],
        inProgressId: undefined,
      })
    })
  })

  describe('RESTORE_TRACKER', () => {
    test('should handle RESTORE_TRACKER', () => {
      const state = reducer(initialState(initialStateUnActive), {
        type: types.RESTORE_TRACKER,
        payload: { trackerId: '202009181111345' },
      })

      expect(state).toStrictEqual({
        trackers: [
          {
            id: '202009181111345',
            name: 'test',
            inProgress: false,
            day: '2020-09-18',
            timers: [
              {
                id: '0',
                start: new Date('2020-09-18 11:00:00'),
                end: new Date('2020-09-18 12:30:00'),
                minute: 90,
              },
            ],
            isActive: true,
          },
          {
            id: '202009181111560',
            name: 'foo',
            inProgress: false,
            day: '2020-09-18',
            timers: [
              {
                id: '0',
                start: new Date('2020-09-18 17:00:00'),
                end: new Date('2020-09-18 18:00:00'),
                minute: 60,
              },
            ],
            isActive: true,
          },
        ],
        inProgressId: undefined,
      })
    })
  })
})
