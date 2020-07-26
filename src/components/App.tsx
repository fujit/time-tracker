import * as React from 'react'
import { Header } from './Pages/Header'
import { Home } from './Pages/Home'
import * as DateUtil from '../utils/DateUtil'
import { Store } from '../Store'

const App: React.FC = () => {
  const store = Store.instance
  const initialData = store.fetchAllByDay(DateUtil.getCurrentDay())

  return (
    <>
      <Header title="time-tracker" />
      <Home initialData={initialData} store={store} />
    </>
  )
}

export default App
