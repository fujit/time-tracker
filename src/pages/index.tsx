import { GetServerSideProps } from 'next'
import Layout from '../components/Layout'
import { Tracker } from '../components/Tracker'
import { getCurrentDay } from '../utils/DateUtil'
import prisma from '../lib/prisma'

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
  const todaysTrackers = await prisma.tracker.findMany()

  const today = getCurrentDay()

  return {
    props: {
      todaysTrackers,
      today,
    },
  }
}

export default IndexPage
