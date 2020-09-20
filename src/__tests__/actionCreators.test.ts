import * as creators from '../actionCreators'
import * as types from '../actionTypes'

describe('actions', () => {
  test('計測を開始するアクションが作成されること', () => {
    const name = 'test'
    const day = '2020-09-18'
    const startTime = new Date('2020-09-18 10:00')

    const expectedAction = {
      type: types.START,
      payload: { name, day, startTime },
    }
    expect(creators.start(name, day, startTime)).toStrictEqual(expectedAction)
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
    const id = 'test'
    const endTime = new Date('2020-09-18 19:00')

    const expectedAction = {
      type: types.PAUSE,
      payload: { id, endTime },
    }
    expect(creators.pause(id, endTime)).toStrictEqual(expectedAction)
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
