import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Elysia + Bun + React',
  description: 'Web Framework Template'
}

function RootLayout (props: { children: React.ReactNode }): JSX.Element {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#ffffff" />
        <title>{metadata.title?.toString() ?? ''}</title>
        <meta name="description" content={metadata.description ?? ''} />
        <link rel="icon" href={metadata.icons?.toString() ?? '/favicon.ico'} type="image/x-icon" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body
        onMouseMove={(event) => {
          const cursor = document.getElementById('live-cursor')
          if (cursor !== null) {
            cursor.style.top = event.clientY - 10 + 'px'
            cursor.style.left = event.clientX - 10 + 'px'
          }
        }}
        className="bg-white dark:bg-black cursor-none select-none scrollbar-thin scrollbar-thumb-neutral-300 scrollbar-track-transparent"
      >
        {props.children}
        <link rel="stylesheet" href="/styles/tailwind.min.css" type="text/css" media="all" />
      </body>
    </html>
  )
}

export default RootLayout
