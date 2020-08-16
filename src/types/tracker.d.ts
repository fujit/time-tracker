type Tracker = {
  id: string
  name: string
  day: string
  inProgress: boolean
  timers: Timer[]
}

type Timer = {
  id: string
  start: Date
  end?: Date
  minute?: number
}

type CalculatedTimer = Required<Timer>
