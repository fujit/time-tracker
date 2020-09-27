import { createNewTracker, updatePauseTimer } from './TrackerLogic'

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
      name: 'reservoir dogs',
      inProgress: true,
      day: '1993-04-24',
      timers: [{ id: '0', start: new Date('1993-04-24 18:00:00') }],
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
