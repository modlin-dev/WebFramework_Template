import React, { type JSX } from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404 - Page Not Found',
  description: 'Opps, seems like you entered the wrong page!'
}

function RootLayout ({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{metadata.title?.toString() ?? ''}</title>
        <meta name="description" content={metadata.description ?? ''} />
        <link rel="icon" href={metadata.icons?.toString() ?? '/favicon.ico'} type="image/x-icon" />
        <link
          rel="stylesheet"
          href="/styles/tailwind.css"
          type="text/css"
          media="all"
        />
      </head>
      <body>
        {children}
        <script src="/scripts/htmx.min.js" async defer />
      </body>
    </html>
  )
}

export default RootLayout
