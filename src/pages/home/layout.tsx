import { block } from 'million/react'
import React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Elysia + Bun + React',
  description: 'Web Framework Template'
}

const Block = block(function RootLayout (props: { children: React.ReactNode }): React.ReactNode {
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
          disabled={false}
          defer={true}
          async={true}
        />
      </head>
      <body>
        {props.children}
        <script src="/scripts/htmx.min.js.gz" async={true} defer={true} />
      </body>
    </html>
  )
})

export default Block
