import { hydrate } from 'preact'
import RootLayout from './layout'
import App from './page'
import Loading from '../../components/loading'

hydrate(
  <RootLayout>
    <Loading />
    <App />
  </RootLayout>,
  document
)
