import { renderHook, HookResult } from '@testing-library/react-hooks'
import { useTrackerCopy, UseTrackerCopyResult } from './useTrackerCopy'

describe('useTrackerCopy', () => {
  let result: HookResult<UseTrackerCopyResult>

  beforeEach(() => {
    const trackers: ActiveTracker[] = [
      {
        id: '0',
        name: 'foo',
        key: 100,
        timers: [
          {
            id: '0',
            start: new Date('2000-01-01 10:00:00'),
            end: new Date('2000-01-01 13:00:00'),
            minute: 180,
          },
        ],
      },
      {
        id: '1',
        name: 'bar',
        key: 300,
        timers: [
          {
            id: '0',
            start: new Date('2000-01-01 15:00:00'),
            end: new Date('2000-01-01 18:00:00'),
            minute: 180,
          },
        ],
      },
    ]

    result = renderHook(() => useTrackerCopy(trackers)).result
  })

  test('daily 用のコピーができること', () => {
    expect(result.current.arrangeTrackerDataDaily).toBe(`・foo: 3.0\n・bar: 3.0\n`)
  })

  test('工数入力用のコピーができること', () => {
    expect(result.current.arrangeTrackerDataWork).toBe(
      ` document.getElementById('new_time_entry_100_0_hours').value = 3.0;\n document.getElementById('new_time_entry_300_0_hours').value = 3.0;\n`
    )
  })
})
