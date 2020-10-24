type Tracker = {
  id: string
  name: string
  key?: number
  day: string
  inProgress: boolean
  timers: Timer[]
  isActive: boolean
}

type Timer = {
  id: string
  start: Date
  end?: Date
  minute?: number
}

type CalculatedTimer = Required<Timer>

type PastTracker = Pick<Tracker, 'id' | 'day' | 'name' | 'timers'>
