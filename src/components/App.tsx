import * as React from 'react'
import { Header } from './Pages/Header'
import { Home } from './Pages/Home'
import * as DateUtil from '../utils/DateUtil'
import { Store } from '../Store'

const App: React.FC = () => {
  const today = DateUtil.getCurrentDay()
  const store = Store.instance
  const todaysTrackers = store.fetchAllByDay(today)

  return (
    <>
      <Header title="time-tracker" />
      <Home todaysTrackers={todaysTrackers} store={store} today={today} />
    </>
  )
}

export default App
