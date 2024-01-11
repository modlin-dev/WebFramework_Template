import { Elysia, t as T } from 'elysia'
import { cors } from '@elysiajs/cors'
import { compression } from 'elysia-compression'
import { Gradient, rgb } from 'terminal/gradient'
import logger from 'terminal/logger'
import { URL, readAllFiles } from '../modules/ssr'
import { renderToReadableStream } from 'react-dom/server'

function staticPlugin (data?: { path?: string, prefix?: string }) {
  const app = new Elysia({ name: 'staticPlugin' })
  for (const file of readAllFiles(data?.path ?? 'public')) {
    app.get((data?.prefix ?? '/') + file.slice(7), ({ set }) => {
      if (file.endsWith('.gz')) {
        set.headers['Content-Encoding'] = 'gzip'
        set.headers['Accept-Encoding'] = 'gzip, deflate, br, zstd'
      }
      return Bun.file(file)
    })
  }
  return app
}

const app = new Elysia()
  .use(cors()) // Enables CORS
  .use(staticPlugin())
  // .use(compression())
  .get('/', async ({ set }) => {
    const { default: RootLayout } = await import('../pages/home/layout')
    const { default: Loading } = await import('../components/loading')
    const { default: App } = await import('../pages/home/page')

    const html = await renderToReadableStream(
      <RootLayout>
        <Loading />
        <App />
        <script src={'/scripts/home.min.js'} async defer />
      </RootLayout>
    )

    await Bun.build({
      entrypoints: ['src/pages/home/script.tsx'],
      outdir: 'public/scripts',
      naming: 'home.min.js',
      target: 'browser',
      minify: true
    })

    set.headers['Content-Type'] = 'text/plain, text/html; charset=utf-8'
    // set.headers['Content-Encoding'] = 'gzip'
    // set.headers['Accept-Encoding'] = 'gzip, deflate, br, zstd'
    set.status = 200
    return new Response(html, {
      status: 200,
      headers: { 'Content-Type': 'text/html; charset=utf-8' }
    })
  }) // Homepage
  .get(
    '/styles/:stylesheet',
    ({ params, set }) => {
      if (params.stylesheet.endsWith('.gz')) {
        set.headers['Content-Encoding'] = 'gzip'
        set.headers['Accept-Encoding'] = 'gzip, deflate, br, zstd'
      }
      return Bun.file(`src/styles/${params.stylesheet}`)
    },
    {
      params: T.Object({
        stylesheet: T.String()
      })
    }
  )
  .ws('/server', {
    message (_ws, _message) {},
    body: T.String(),
    response: T.String()
  })
  .all('*', async ({ set }) => {
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
        <script src={'/scripts/not_found.min.js'} async={true} defer={true} />
      </RootLayout>
    )

    set.headers['Content-Type'] = 'text/html; charset=utf-8'
    set.headers['Content-Encoding'] = 'br'
    set.headers['Accept-Encoding'] = 'gzip, compress, br'
    set.status = 200
    return '<!DOCTYPE html>' + html
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
