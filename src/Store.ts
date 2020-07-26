export class Store {
  static _instance = new Store()

  stotage = localStorage

  private prefix = 'tracker-'

  static get instance() {
    return this._instance
  }

  fetchAllByDay(day: string): Tracker[] {
    return JSON.parse(this.stotage.getItem(`${this.prefix}${day}`) || '[]')
  }

  save(day: string, value: Tracker[]) {
    this.stotage.setItem(`${this.prefix}${day}`, JSON.stringify(value))
  }
}
