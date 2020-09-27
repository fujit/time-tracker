import { GetServerSideProps } from 'next'
import Layout from '../components/Layout'
import { Tracker } from '../components/Tracker'
import { getCurrentDay } from '../utils/DateUtil'
import { Mongo } from '../utils/Mongo'

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
  const today = getCurrentDay()

  const mongo = new Mongo(
    process.env.MONGO_USER ?? '',
    process.env.MONGO_PASSWORD ?? '',
    process.env.MONGO_HOST ?? '',
    process.env.MONGO_AUTH_SOURCE ?? '',
    process.env.MONGO_PORT
  )
  const client = await mongo.connect()
  const collection = mongo.getCollection<Tracker>(client, 'time-tracker', 'trackers')

  const todaysTrackers = await collection
    .find({ day: today, isActive: true }, { projection: { _id: 0 } })
    .toArray()

  return {
    props: {
      todaysTrackers,
      today,
    },
  }
}

export default IndexPage
