import * as DateUtil from './utils/DateUtil'

export class Store {
  static _instance = new Store()

  storage = localStorage

  private prefix = 'tracker-'

  static get instance() {
    return this._instance
  }

  fetchAllByDay(day: string): Tracker[] {
    const todaysTrackers: Tracker[] = JSON.parse(
      this.storage.getItem(`${this.prefix}${day}`) || '[]'
    )
    return todaysTrackers.filter((tracker) => tracker.isActive)
  }

  save(value: Tracker[]) {
    const day = DateUtil.getCurrentDay()
    this.storage.setItem(`${this.prefix}${day}`, JSON.stringify(value))
  }
}
