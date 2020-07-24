type Tracker = {
  name: string
  inProgress: boolean
  timers: Timer[]
}

type Timer = {
  start: Date
  end: Date
  duration: number
}
