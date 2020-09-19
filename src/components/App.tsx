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
    <>
      <Header title="timer" />
      <div className="container mx-auto">
        <Home todaysTrackers={todaysTrackers} today={today} />
      </div>
    </>
  )
}

export default App
