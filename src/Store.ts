import * as DateUtil from './utils/DateUtil'

export class Store {
  static _instance = new Store()

  storage = localStorage

  private prefix = 'tracker-'

  static get instance() {
    return this._instance
  }

  fetchAllByDay(day: string): Tracker[] {
    return JSON.parse(this.storage.getItem(`${this.prefix}${day}`) || '[]')
  }

  save(value: Tracker[]) {
    const day = DateUtil.getCurrentDay()
    this.storage.setItem(`${this.prefix}${day}`, JSON.stringify(value))
  }
}
