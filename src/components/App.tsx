import * as React from 'react'
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
  return <Home initialData={initialData} />
}

export default App
