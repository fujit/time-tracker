type Tracker = {
  id: string
  name: string
  projectKey?: number
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

type PastTracker = Pick<Tracker, 'id' | 'day' | 'name' | 'timers' | 'key'>

type ActiveTracker = {
  id: string
  name: string
  key?: number
  timers: Timer[]
}

type Time = {
  hour: string
  minute: string
}

type Project = {
  key: number
  name: string
}
