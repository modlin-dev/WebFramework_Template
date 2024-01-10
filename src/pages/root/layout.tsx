import { type JSX } from 'preact'
import type { Metadata } from 'next'
import '../../styles/tailwind.css'

export const metadata: Metadata = {
  title: 'Elysia + Bun + React',
  description: 'Web Framework Template'
}

export default function RootLayout(props: { children: any }): JSX.Element {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={metadata.icons?.toString() ?? 'favicon.ico'} type="image/x-icon" />
        <title>{metadata.title?.toString() ?? ''}</title>
        <meta name="description" content={metadata.description ?? ''} />
        <link rel="stylesheet" href="/styles/tailwind.css" />
        <script src="/scripts/htmx.min.js" />
      </head>
      <body>{props.children}</body>
    </html>
  )
}
