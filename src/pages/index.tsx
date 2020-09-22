import Layout from '../components/Layout'
import { Tracker } from '../components/Tracker'

// TODO: 本日のトラッカー一覧と日付を取得する
const IndexPage = () => (
  <Layout title="time-tracker">
    <Tracker todaysTrackers={[]} today="2020-09-21" />
  </Layout>
)

export default IndexPage
