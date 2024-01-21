import { hydrateRoot } from 'react-dom/client'
import RootLayout from './layout'
import App from './page'

hydrateRoot(
  document,
  <RootLayout>
    <App />
    <script src="/scripts/not_found.min.js" async defer />
  </RootLayout>
)
