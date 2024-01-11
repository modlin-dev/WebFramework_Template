import { type JSX, type ReactNode } from 'preact/compat'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Elysia + Bun + React',
  description: 'Web Framework Template'
}

export default function RootLayout({ children }: { children: ReactNode }): JSX.Element {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{metadata.title?.toString() ?? ''}</title>
        <meta name="description" content={metadata.description ?? ''} />
        <link rel="icon" href={metadata.icons?.toString() ?? '/favicon.ico'} type="image/x-icon" />
        <link
          rel="stylesheet"
          href="/styles/tailwind.css"
          media="all"
          disabled={false}
          defer={true}
          async={true}
        />
      </head>
      <body>
        {children}
        <script src="/scripts/htmx.min.js.gz" async={true} defer={true} />
      </body>
    </html>
  )
}
