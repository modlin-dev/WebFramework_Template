import { Elysia, t as T } from 'elysia'
import { cors } from '@elysiajs/cors'
import { Gradient, rgb } from 'terminal/gradient'
import { Chalk } from 'terminal/chalk'
import logger from 'terminal/logger'
import { URL } from '../modules/ssr'
import serve from '../plugins/serve.plugin.ts'
import { renderToString } from 'react-dom/server'
import React from 'react'

const app = new Elysia()
  .use(cors()) // Enables CORS
  .use(serve()) // Serves a Public Directory
  // .use(compression())
  // .use(loggerPlugin())
  .onRequest(({ request, set }) => {
    const Method = request.method
      .replace('GET', Chalk.Forground.Blue('GET'))
      .replace('POST', Chalk.Forground.Green('POST'))
      .replace('PUT', '\x1B[38mPUT\x1B[0m')
      .replace('DELETE', Chalk.Forground.Red('DELETE'))
      .replace('PATCH', Chalk.Forground.Orange('PATCH'))
      .replace('CONNECT', Chalk.Forground.Cyan('CONNECT'))
      .replace('HEAD', Chalk.Forground.White('HEAD'))
      .replace('OPTIONS', Chalk.Forground.Magenta('OPTIONS'))

    logger.log(Method, Chalk.Forground.Cyan(request.url), set.status)
  })
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
      return Bun.file('src/html/not_found.html')
    } else {
      const { default: RootLayout } = await import('../pages/not_found/layout')
      const { default: Loading } = await import('../components/loading')
      const { default: App } = await import('../pages/not_found/page')

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
      await Bun.build({
        entrypoints: ['src/pages/not_found/script.tsx'],
        outdir: 'public/scripts',
        naming: 'not_found.min.js',
        target: 'browser',
        minify: true
      })

      // set.headers['Content-Encoding'] = 'gzip'
      // set.headers['Accept-Encoding'] = 'gzip, deflate, br, zstd'
      set.headers['Content-Type'] = 'text/html; charset=utf8'
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
      '      HTTP',
      URL('http', server.hostname, server.port),
      '\n            ',
      URL('https', server.hostname, server.port),
      ' <-- Production'
    )
    logger.custom(
      '      WS  ',
      URL('ws', server.hostname, server.port),
      '\n            ',
      URL('wss', server.hostname, server.port),
      '   <-- Production'
    )
  })

export type App = typeof app
