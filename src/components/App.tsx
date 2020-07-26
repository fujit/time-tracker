import * as React from 'react'
import { Header } from './Pages/Header'
import { Home } from './Pages/Home'
import * as StringUtil from '../utils/StringUtil'
import * as DateUtil from '../utils/DateUtil'

const App: React.FC = () => {
  const initialData: Tracker[] = [
    {
      id: StringUtil.generateTrackerId(),
      name: 'initial',
      inProgress: false,
      day: DateUtil.getCurrentDay(),
      timers: [
        {
          start: new Date(),
          end: new Date(),
          minute: 62,
        },
      ],
    },
  ]
  return (
    <>
      <Header title="time-tracker" />
      <Home initialData={initialData} />
    </>
  )
}

export default App
