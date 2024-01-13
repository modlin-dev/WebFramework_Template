import { hydrateRoot } from 'react-dom/client'
import RootLayout from './layout'
import Loading from '../../components/loading'
import App from './page'

hydrateRoot(
  document,
  <RootLayout>
    <Loading />
    <App />
  </RootLayout>
)
