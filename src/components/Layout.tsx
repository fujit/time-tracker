import Head from 'next/head'
import { Header } from './Header'

type Props = {
  title?: string
}

const Layout: React.FC<Props> = ({ title = 'time-tracker', children }) => (
  <div id="app">
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="initial-scale=1.0, width-device-width" />
    </Head>
    <Header title="time-tracker" />
    <div className="container mx-auto">{children}</div>
  </div>
)

export default Layout
