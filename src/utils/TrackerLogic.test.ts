import {
  createNewTracker,
  updatePauseTimer,
  getNextTimerId,
  isValidTimeDuration,
} from './TrackerLogic'

describe('createNewTracker', () => {
  test('Tracker の形式で変換されること', () => {
    const actual = createNewTracker(
      'a',
      'reservoir dogs',
      '1993-04-24',
      new Date('1993-04-24 18:00:00')
    )
    const expected = {
      id: 'a',
      key: undefined,
      name: 'reservoir dogs',
      inProgress: true,
      day: '1993-04-24',
      timers: [{ id: '0', start: new Date('1993-04-24 18:00:00') }],
      isActive: true,
    }
    expect(actual).toStrictEqual(expected)
  })

  test('キー番号で始まる場合は、キーを設定すること', () => {
    const actual = createNewTracker(
      'abc',
      '#100 Joker',
      '2019-12-01',
      new Date('2019-12-01 09:00:00'),
      100
    )

    const expected = {
      id: 'abc',
      key: 100,
      name: '#100 Joker',
      inProgress: true,
      day: '2019-12-01',
      timers: [{ id: '0', start: new Date('2019-12-01 09:00:00') }],
      isActive: true,
    }
    expect(actual).toStrictEqual(expected)
  })

  test('名前の前後の空白は削除されること', () => {
    const actual = createNewTracker(
      'QED',
      '#200 The Dark Knight ',
      '2008-08-09',
      new Date('2008-08-09 09:00:00'),
      200
    )

    const expected = {
      id: 'QED',
      key: 200,
      name: '#200 The Dark Knight',
      inProgress: true,
      day: '2008-08-09',
      timers: [{ id: '0', start: new Date('2008-08-09 09:00:00') }],
      isActive: true,
    }
    expect(actual).toStrictEqual(expected)
  })
})

describe('updatePauseTimer', () => {
  test('計測中のトラッカーがある場合、停止後のタイマーを返すこと', () => {
    const tracker: Tracker = {
      id: 'b',
      name: 'Interstellar',
      inProgress: true,
      day: '2014-11-22',
      timers: [{ id: '0', start: new Date('2014-11-22 10:00:00') }],
      isActive: true,
    }
    const actual = updatePauseTimer(tracker, new Date('2014-11-22 12:49:00'))

    expect(actual).toStrictEqual({
      id: '0',
      start: new Date('2014-11-22 10:00:00'),
      end: new Date('2014-11-22 12:49:00'),
      minute: 169,
    })
  })

  test('計測中のトラッカーがない場合は何も返さないこと', () => {
    const tracker: Tracker = {
      id: 'c',
      name: 'STAR TREK',
      inProgress: false,
      day: '2009-05-29',
      timers: [
        {
          id: '0',
          start: new Date('2009-05-29 10:00:00'),
          end: new Date('2009-05-29 12:06:00'),
          minute: 126,
        },
      ],
      isActive: true,
    }
    const actual = updatePauseTimer(tracker, new Date('2009-05-29 13:00:00'))
    expect(actual).toBe(undefined)
  })
})

describe('getNextTimerId', () => {
  test('インクリメント後のタイマー ID を返却すること', () => {
    const timers: Timer[] = [
      {
        id: '0',
        start: new Date('2000-01-01 01:00:00'),
        end: new Date('2000-01-01 02:00:00'),
        minute: 60,
      },
    ]
    const actual = getNextTimerId(timers)
    expect(actual).toBe('1')
  })

  test('タイマーが何もない場合は1を返すこと', () => {
    expect(getNextTimerId([])).toBe('1')
  })
})

describe('isValidTimeDuration', () => {
  describe('NG', () => {
    test('開始時間の方が遅い', () => {
      const start: Time = {
        hour: '11',
        minute: '10',
      }

      const end: Time = {
        hour: '8',
        minute: '10',
      }

      expect(isValidTimeDuration(start, end)).toBeFalsy()
    })

    test('時間が同じで、開始分の方が遅い', () => {
      const start: Time = {
        hour: '10',
        minute: '30',
      }

      const end: Time = {
        hour: '10',
        minute: '29',
      }

      expect(isValidTimeDuration(start, end)).toBeFalsy()
    })
  })

  describe('OK', () => {
    test('開始時間の方が早い', () => {
      const start: Time = {
        hour: '8',
        minute: '10',
      }

      const end: Time = {
        hour: '11',
        minute: '10',
      }

      expect(isValidTimeDuration(start, end)).toBeTruthy()
    })

    test('時間が同じで、開始分の方が早い', () => {
      const start: Time = {
        hour: '8',
        minute: '9',
      }

      const end: Time = {
        hour: '8',
        minute: '10',
      }

      expect(isValidTimeDuration(start, end)).toBeTruthy()
    })

    test('開始と終了が同じ', () => {
      const start: Time = {
        hour: '8',
        minute: '9',
      }

      const end: Time = {
        hour: '8',
        minute: '9',
      }

      expect(isValidTimeDuration(start, end)).toBeTruthy()
    })

    test('開始時間の方が早くて、開始分の方が遅い', () => {
      const start: Time = {
        hour: '8',
        minute: '50',
      }

      const end: Time = {
        hour: '10',
        minute: '9',
      }

      expect(isValidTimeDuration(start, end)).toBeTruthy()
    })
  })
})
