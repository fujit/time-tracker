type Tracker = {
  id: string
  name: string
  day: string
  inProgress: boolean
  timers: Timer[]
}

type Timer = {
  start: Date
  end: Date
  minute: number
}
