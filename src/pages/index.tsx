import { GetServerSideProps } from 'next'
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

export const getServerSideProps: GetServerSideProps = async () => {
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
