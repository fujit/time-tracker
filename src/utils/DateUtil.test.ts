import { getDiff, format, updateTime, add } from './DateUtil'

describe('Diff', () => {
  test('2020-01-01 と 2020-01-01 の差は1日であること', () => {
    expect(getDiff(new Date('2020-01-01'), new Date('2020-01-02'), 'day')).toBe(1)
  })

  test('2020-01-01 と 2020-01-02 の差は24時間であること', () => {
    expect(getDiff(new Date('2020-01-01'), new Date('2020-01-02'), 'hour')).toBe(24)
  })

  test('2020-01-01 10:00:00 と 2020-01-01 10:10:00 の差は10分であること', () => {
    expect(
      getDiff(new Date('2020-01-01 10:00:00'), new Date('2020-01-01 10:10:00'), 'minute')
    ).toBe(10)
  })

  test('2020-01-01 10:00:00 と 2020-01-01 10:30:00 の差は0時間であること', () => {
    expect(getDiff(new Date('2020-01-01 10:00:00'), new Date('2020-01-01 10:30:00'), 'hour')).toBe(
      0
    )
  })

  test('2020-01-01 10:00:00 と 2020-01-01 10:30:00 の差は0.5時間であること', () => {
    expect(
      getDiff(new Date('2020-01-01 10:00:00'), new Date('2020-01-01 10:30:00'), 'hour', true)
    ).toBe(0.5)
  })
})

describe('format', () => {
  test('デフォルトのフォーマットで整形されること', () => {
    expect(format('20200101111230')).toBe('2020-01-01 11:12:30')
  })

  test('指定したフォーマットで整形されること', () => {
    expect(format(new Date('2020-01-01 11:11:11'), 'YYYY/MM/DD')).toBe('2020/01/01')
  })
})

describe('updateTime', () => {
  test('時間を12:00に変更できること', () => {
    expect(updateTime(new Date('2020-01-01 09:00:00'), '12:00')).toStrictEqual(
      new Date('2020-01-01 12:00:00')
    )
  })
})

describe('add', () => {
  test('1日後の日付に変更できること', () => {
    expect(add('2020-01-01 10:00:00', 1, 'day')).toStrictEqual(new Date('2020-01-02 10:00:00'))
  })

  test('1ヶ月前の日付にできること', () => {
    expect(add('2020-10-10 10:00:00', -1, 'month')).toEqual(new Date('2020-09-10 10:00:00'))
  })
})
