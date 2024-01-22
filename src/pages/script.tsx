import { hydrateRoot } from 'react-dom/client'
import RootLayout from './layout'
import App from './page'
import Cursor from 'components/cursor'

hydrateRoot(
  document,
  <RootLayout>
    <App />
    <Cursor />
    <script src="/scripts/home.min.js" async defer />
  </RootLayout>
)
