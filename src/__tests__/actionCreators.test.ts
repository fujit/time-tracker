import * as creators from '../actionCreators'
import * as types from '../actionTypes'

describe('actions', () => {
  test('計測を開始するアクションが作成されること', () => {
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
    const expectedAction = {
      type: types.START,
      payload: { newTracker },
    }
    expect(creators.start(newTracker)).toStrictEqual(expectedAction)
  })

  test('計測を再開するアクションが作成されること', () => {
    const id = 'test'
    const startTime = new Date('2020-09-18 16:00')

    const expectedAction = {
      type: types.RESTART,
      payload: { id, startTime },
    }
    expect(creators.restart(id, startTime)).toStrictEqual(expectedAction)
  })

  test('計測を中断するアクションが作成されること', () => {
    const updatedTimer: Timer = {
      id: '2',
      start: new Date('2020-09-18 10:00'),
      end: new Date('2020-09-18 19:00'),
      minute: 540,
    }
    const trackerId = 'test'

    const expectedAction = {
      type: types.PAUSE,
      payload: { trackerId, updatedTimer },
    }
    expect(creators.pause(trackerId, updatedTimer)).toStrictEqual(expectedAction)
  })

  test('トラッカー名を更新するアクションが作成されること', () => {
    const id = 'test'
    const name = 'test02'

    const expectedAction = {
      type: types.UPDATE_NAME,
      payload: { id, name },
    }
    expect(creators.updateName(id, name)).toStrictEqual(expectedAction)
  })
})
