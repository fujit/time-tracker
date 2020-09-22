import type { AppProps } from 'next/app'
import '../styles/tailwind.css'

const App = ({ Component, pageProps }: AppProps) => <Component {...pageProps} />

export default App
