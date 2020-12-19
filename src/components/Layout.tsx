import { FC } from 'react'
import Head from 'next/head'
import { Header } from './Header'

type Props = {
  title?: string
}

const Layout: FC<Props> = ({ title = 'time-tracker', children }) => (
  <div id="app">
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="initial-scale=1.0" />
    </Head>
    <Header title="time-tracker" />
    <div className="container mx-auto my-6">{children}</div>
  </div>
)

export default Layout
