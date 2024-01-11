import { Elysia, t as T } from 'elysia'
import { cors } from '@elysiajs/cors'
import { Gradient, rgb } from 'terminal/gradient'
import logger from 'terminal/logger'
import { URL, readAllFiles } from '../modules/ssr'
import { renderToString } from 'preact-render-to-string'
import zlib from 'zlib'
import { readFileSync } from 'fs'

const app = new Elysia()
  .use(cors()) // Enables CORS
  .get('/', async ({ set }) => {
    const { default: RootLayout } = await import('../pages/home/layout')
    const { default: Loading } = await import('../components/loading')
    const { default: App } = await import('../pages/home/page')

    await Bun.build({
      entrypoints: [`src/pages/home/script.tsx`],
      outdir: 'public/scripts',
      naming: `home.min.js`,
      target: 'browser',
      minify: true
    })

    const html = renderToString(
      <RootLayout>
        <Loading />
        <App />
        <script src={`/scripts/home.min.js`} async defer />
      </RootLayout>
    )

    set.headers['Content-Type'] = 'text/html; charset=utf-8;'
    set.headers['Content-Encoding'] = 'gzip'
    set.headers['Accept-Encoding'] = 'gzip'
    set.status = 200
    return zlib.gzipSync(html).toString('utf-8')
  }) // Homepage
  .get('/styles/:stylesheet', ({ params }) => Bun.file(`src/styles/${params.stylesheet}`), {
    params: T.Object({
      stylesheet: T.String()
    })
  })
  .ws('/server', {
    message(_ws, _message) {},
    body: T.String(),
    response: T.String()
  })
  .all('*', async ({ set }) => {
    const { default: RootLayout } = await import('../pages/not_found/layout')
    const { default: Loading } = await import('../components/loading')
    const { default: App } = await import('../pages/not_found/page')

    await Bun.build({
      entrypoints: [`src/pages/not_found/script.tsx`],
      outdir: 'public/scripts',
      naming: `not_found.min.js`,
      target: 'browser',
      minify: true
    })
    const html = renderToString(
      <RootLayout>
        <Loading />
        <App />
        <script src={`/scripts/not_found.min.js`} async={true} defer={true} />
      </RootLayout>
    )

    set.headers['Content-Type'] = 'text/html; charset=utf-8'
    set.headers['Content-Encoding'] = 'br'
    set.headers['Accept-Encoding'] = 'gzip, compress, br'
    set.status = 200
    return '<!DOCTYPE html>' + html
  }) // 404 Page
for (const file of readAllFiles('public')) {
  app.get(file.slice(6), ({ set }) => {
    if (file.endsWith('.gz')) {
      set.headers['Content-Encoding'] = 'gzip'
      set.headers['Accept-Encoding'] = 'gzip, compress, br'
    }
    set.status = 200
    return Bun.file(file)
  })
}
app.listen(80, (server) => {
  const Elysia = new Gradient({
    colors: [rgb(129, 140, 248), rgb(192, 132, 252)],
    midpoint: 10,
    text: 'ElysiaJS'
  })

  logger.custom('\n', `🦊 ${Elysia.toForgroundText()} is ready in ${Date.now() - logger.ptime} ms`)
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
