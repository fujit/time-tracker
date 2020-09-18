import React from 'react'
import { Tracker } from '../components/Tracker'

type Props = {
  todaysTrackers: Tracker[]
  today: string
}

export const Home: React.FC<Props> = (props) => <Tracker {...props} />
