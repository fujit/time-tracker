import * as React from 'react'
import { Header } from './Pages/Header'
import { Home } from './Pages/Home'

const App: React.FC = () => {
  const initialData: Tracker[] = [
    {
      name: 'initial',
      inProgress: false,
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
