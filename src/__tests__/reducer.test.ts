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
      const state = reducer(initialState(), {
        type: types.START,
        payload: {
          id: 'test',
          name: 'test',
          day: '2020-09-18',
          startTime: new Date('2020-09-18 11:00:00'),
        },
      })

      expect(state).toStrictEqual({
        trackers: [
          {
            id: 'test',
            name: 'test',
            day: '2020-09-18',
            inProgress: true,
            timers: [
              {
                id: '0',
                start: new Date('2020-09-18 11:00:00'),
              },
            ],
            isActive: true,
          },
        ],
        inProgressId: 'test',
      })
    })
  })

  describe('RESTART', () => {
    test('should handle RESTART', () => {
      const state = reducer(initialState(initialStateStopping), {
        type: types.RESTART,
        payload: { id: '202009181111345', startTime: new Date('2020-09-18 14:00:00') },
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
        payload: { id: '202009181111345', startTime: new Date('2020-09-18 14:00:00') },
      })

      expect(state).toStrictEqual(state)
    })
  })

  describe('PAUSE', () => {
    test('should handle PAUSE', () => {
      const state = reducer(initialState(initialStateInProgress), {
        type: types.PAUSE,
        payload: { id: '202009181111345', endTime: new Date('2020-09-18 18:00:00') },
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
              },
            ],
            isActive: true,
          },
        ],
        inProgressId: undefined,
      })
    })

    test('進行していない場合は、現在の state を返す', () => {
      const state = reducer(initialState(initialStateStopping), {
        type: types.PAUSE,
        payload: { id: '202009181111345', endTime: new Date('2020-09-18 18:00:00') },
      })

      expect(state).toStrictEqual(state)
    })
  })

  describe('UPDATE_NAME', () => {
    test('should handle UPDATE_NAME', () => {
      const state = reducer(initialState(initialStateStopping), {
        type: types.UPDATE_NAME,
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
      const state = reducer(initialState(initialStateStopping), {
        type: types.UPDATE_TIMER,
        payload: {
          trackerId: '202009181111345',
          timerId: '0',
          startTimer: new Date('2020-09-18 10:00:00'),
          endTimer: new Date('2020-09-18 13:00:00'),
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
