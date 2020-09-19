import React from 'react'
import { Header } from './Header'
import { Home } from '../Pages/Tracker'
import * as DateUtil from '../utils/DateUtil'
import { Store } from '../Store'

const App: React.FC = () => {
  const today = DateUtil.getCurrentDay()
  const store = Store.instance
  const todaysTrackers = store.fetchAllByDay(today)

  return (
    <div className="container mx-auto">
      <Header title="timer" />
      <Home todaysTrackers={todaysTrackers} today={today} />
    </div>
  )
}

export default App
