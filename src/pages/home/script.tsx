import React from 'react'
import { hydrateRoot } from 'react-dom/client'
import RootLayout from './layout'
import App from './page'
import Loading from '../../components/loading'

hydrateRoot(
  document,
  <RootLayout>
    <Loading />
    <App />
  </RootLayout>
)
