import { GetStaticProps } from 'next'
import Layout from '../components/Layout'
import { Tracker } from '../components/Tracker'
import { getCurrentDay } from '../utils/DateUtil'

type Props = {
  todaysTrackers: Tracker[]
  today: string
}

const IndexPage = ({ todaysTrackers, today }: Props) => (
  <Layout title="time-tracker">
    <Tracker todaysTrackers={todaysTrackers} today={today} />
  </Layout>
)

export const getStaticProps: GetStaticProps = async () => {
  // const response = await fetch('http://0.0.0.0:8888/trackers')
  const url = process.env.apiPath
  const response = await fetch(`${url}/trackers`)
  const todaysTrackers: Tracker[] = response.ok ? await response.json() : []

  return {
    props: {
      todaysTrackers,
      today: getCurrentDay(),
    },
  }
}

export default IndexPage
