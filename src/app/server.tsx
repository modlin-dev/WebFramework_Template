import { Elysia, t as T } from 'elysia'
import { cors } from '@elysiajs/cors'
import { servePlugin } from 'plugins/serve.plugin'
import { loggerPlugin } from 'plugins/logger.plugin'
import { compressPlugin } from 'plugins/compress.plugin'
import { compilePlugin } from 'plugins/compile.plugin'
import logger from 'terminal/logger'
import { Chalk } from 'terminal/chalk'
import { Gradient, rgb } from 'terminal/gradient'
import { URL, Custom, readAllFiles } from 'modules/common.module'
import path from 'path'

const app = new Elysia()
  .use(cors()) // Enables CORS
  .use(compilePlugin()) // Use only on Build
  .use(compressPlugin()) // Compresses requests into gzip
  .use(servePlugin()) // Serves a Public Directory
  .use(loggerPlugin()) // Use only on Developement
  .get('/', async ({ set }) => {
    try {
      if (Bun.env.PRODUCTION === 'FALSE') {
        const { default: RootLayout } = await import('pages/layout')
        const { default: App } = await import('pages/page')
        const { default: Cursor } = await import('components/cursor')

        await Bun.build({
          entrypoints: ['src/pages/script.tsx'],
          outdir: 'dist',
          naming: 'index.js',
          minify: true
        })

        return (
          <RootLayout>
            <App />
            <Cursor />
            <script src="/scripts/react.min.ts" async defer />
          </RootLayout>
        )
      }

      set.headers['Content-Encoding'] = 'gzip'
      return Bun.file(path.join('dist', 'index.html'))
    } catch {
      set.status = 'Internal Server Error'
      return '500 Internal Server Error'
    }
  }) // Homepage
  .ws('/server', {
    message (_ws, _message) {},
    body: T.String(),
    response: T.String()
  }) // Server
  .all('*', async ({ set }) => {
    try {
      if (Bun.env.PRODUCTION === 'FALSE') {
        const { default: RootLayout } = await import('pages/not_found/layout')
        const { default: App } = await import('pages/not_found/page')

        await Bun.build({
          entrypoints: ['src/pages/not_found/script.tsx'],
          outdir: 'dist/*',
          naming: 'index.js',
          minify: true
        })

        set.status = 404
        return (
          <RootLayout>
            <App />
            <script src="/scripts/*/typescript.min.js" async defer />
          </RootLayout>
        )
      }

      set.headers['Content-Encoding'] = 'gzip'
      set.status = 'Not Found'
      return Bun.file(path.join('dist', '*', 'index.html'))
    } catch {
      set.status = 'Internal Server Error'
      return '500 Internal Server Error'
    }
  }) // 404 Page
  .listen(80, (server) => {
    const ElysiaJS = new Gradient({
      colors: [rgb(129, 140, 248), rgb(192, 132, 252)],
      midpoint: 10,
      text: 'ElysiaJS'
    })

    logger.custom(
      '\n',
      `🦊 ${ElysiaJS.toForgroundText()} is ready in ${Date.now() - logger.ptime} ms`
    )
    logger.custom(Chalk.Forground.Blue(Custom('HTTP')), URL('http', server.hostname, server.port))
    logger.custom(Custom(''), URL('https', server.hostname, server.port), ' <-- Production')
    logger.custom(Chalk.Forground.Magenta(Custom('WS')), URL('ws', server.hostname, server.port))
    logger.custom(Custom(''), URL('wss', server.hostname, server.port), '   <-- Production')
  })

for (const filepath of readAllFiles('dist')) {
  console.log('GOT' + filepath)
  if (filepath.endsWith('index.js')) {
    const endpoint = '/scripts' + filepath.slice(4).replace('index.js', 'react.min.ts')
    console.log('WANT TS' + endpoint)
    app.get(endpoint, async ({ set }) => {
      // if (Bun.env.PRODUCTION === 'FALSE') await Bun.write(file, Bun.gzipSync(Buffer.from(await Bun.file(file).text())))
      set.headers['Content-Type'] = 'text/js'
      // set.headers['Content-Encoding'] = 'gzip'
      return Bun.file(filepath)
    })
  }
  if (filepath.endsWith('index.css')) {
    const endpoint = '/styles' + filepath.slice(4).replace('index.css', 'tailwind.min.css')
    console.log('WANT CSS' + endpoint)
    app.get(endpoint, async ({ set }) => {
      // if (Bun.env.PRODUCTION === 'FALSE') await Bun.write(file, Bun.gzipSync(Buffer.from(await Bun.file(file).text())))
      set.headers['Content-Type'] = 'text/css'
      // set.headers['Content-Encoding'] = 'gzip'
      return Bun.file(filepath)
    })
  }
}

export type App = typeof app
