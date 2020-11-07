import { GetServerSideProps } from 'next'
import Layout from '../components/Layout'
import { TrackerHistory } from '../components/TrackerHistory'
import { getCurrentDay, add, format } from '../utils/DateUtil'
import { Mongo } from '../utils/Mongo'

type Props = {
  pastTrackers: PastTracker[]
}

const HistoryPage = ({ pastTrackers }: Props) => (
  <Layout title="history">
    <TrackerHistory trackers={pastTrackers} />
  </Layout>
)

export const getServerSideProps: GetServerSideProps = async () => {
  const mongo = new Mongo(
    process.env.MONGO_USER ?? '',
    process.env.MONGO_PASSWORD ?? '',
    process.env.MONGO_HOST ?? '',
    process.env.MONGO_AUTH_SOURCE ?? '',
    process.env.MONGO_PORT
  )
  const client = await mongo.connect()
  const collection = mongo.getCollection<Tracker>(client, 'time-tracker', 'trackers')

  const today = getCurrentDay()
  const limitDay = format(add(today, -1, 'month'), 'YYYY-MM-DD')
  const pastTrackers = await collection
    .find(
      { day: { $lt: today, $gt: limitDay }, isActive: true },
      { projection: { _id: 0, id: 1, name: 1, day: 1, timers: 1, key: 1 } }
    )
    .sort('day', -1)
    .toArray()

  return {
    props: {
      pastTrackers,
    },
  }
}

export default HistoryPage
