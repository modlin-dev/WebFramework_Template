import { Elysia, t as T } from 'elysia'
import { cors } from '@elysiajs/cors'
import { servePlugin } from '../plugins/serve.plugin.ts'
import { loggerPlugin } from '../plugins/logger.plugin.ts'
import logger from 'terminal/logger'
import { Chalk } from 'terminal/chalk'
import { Gradient, rgb } from 'terminal/gradient'
import { renderToString } from 'react-dom/server'
import { URL } from '../modules/ssr'
import React from 'react'

const app = new Elysia()
  .use(servePlugin()) // Serves a Public Directory
  .use(loggerPlugin()) // Use only on Developement
  .use(cors()) // Enables CORS
  .get('/', async ({ set }) => {
    if (Bun.env.MODE === 'PRODUCTION') {
      set.headers['Content-Encoding'] = 'gzip'
      return Bun.file('src/html/home.html')
    } else {
      const { default: RootLayout } = await import('../pages/home/layout')
      const { default: Loading } = await import('../components/loading')
      const { default: App } = await import('../pages/home/page')

      await Bun.build({
        entrypoints: ['src/pages/home/script.tsx'],
        outdir: 'public/scripts',
        naming: 'home.min.js',
        target: 'browser',
        minify: true
      })

      const html = renderToString(
        <RootLayout>
          <Loading />
          <App />
          <script src="/scripts/home.min.js" async defer />
        </RootLayout>
      )
      await Bun.write('src/html/home.html', Bun.gzipSync(Buffer.from('<!DOCTYPE html>' + html)))

      set.headers['Content-Encoding'] = 'gzip'
      return Bun.file('src/html/home.html')
    }
  }) // Homepage
  .ws('/server', {
    message (_ws, _message) {},
    body: T.String(),
    response: T.String()
  })
  .all('*', async ({ set }) => {
    if (Bun.env.MODE === 'PRODUCTION') {
      set.headers['Content-Encoding'] = 'gzip'
      set.status = 404
      return Bun.file('src/html/not_found.html')
    } else {
      const { default: RootLayout } = await import('../pages/not_found/layout')
      const { default: Loading } = await import('../components/loading')
      const { default: App } = await import('../pages/not_found/page')

      await Bun.build({
        entrypoints: ['src/pages/not_found/script.tsx'],
        outdir: 'public/scripts',
        naming: 'not_found.min.js',
        target: 'browser',
        minify: true
      })

      const html = renderToString(
        <RootLayout>
          <Loading />
          <App />
          <script src="/scripts/not_found.min.js" async defer />
        </RootLayout>
      )
      await Bun.write(
        'src/html/not_found.html',
        Bun.gzipSync(Buffer.from('<!DOCTYPE html>' + html))
      )

      set.headers['Content-Encoding'] = 'gzip'
      set.headers['Content-Type'] = 'text/html; charset=utf8'
      set.status = 404
      return '<!DOCTYPE html>' + html
    }
  }) // 404 Page
  .listen(80, (server) => {
    const Elysia = new Gradient({
      colors: [rgb(129, 140, 248), rgb(192, 132, 252)],
      midpoint: 10,
      text: 'ElysiaJS'
    })

    logger.custom(
      '\n',
      `🦊 ${Elysia.toForgroundText()} is ready in ${Date.now() - logger.ptime} ms`
    )
    logger.custom(
      Chalk.Forground.Blue('      HTTP'),
      URL('http', server.hostname, server.port),
      '\n            ',
      URL('https', server.hostname, server.port),
      ' <-- Production'
    )
    logger.custom(
      Chalk.Forground.Magenta('      WS  '),
      URL('ws', server.hostname, server.port),
      '\n            ',
      URL('wss', server.hostname, server.port),
      '   <-- Production'
    )
  })

export type App = typeof app
