import { hydrateRoot } from 'react-dom/client'
import RootLayout from './layout'
import App from './page'

hydrateRoot(
  document,
  <RootLayout>
    <App />
    <script src="/scripts/home.min.js" async defer />
  </RootLayout>
)
