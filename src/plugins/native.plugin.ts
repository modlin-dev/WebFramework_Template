import { Elysia } from 'elysia'
import fs from 'fs'
import path from 'path'

export function * readFilesSync (dir: string): Generator<string> {
  const files = fs.readdirSync(dir, { withFileTypes: true })

  for (const file of files) {
    if (file.isDirectory()) {
      yield * readFilesSync(path.join(dir, file.name))
    } else {
      yield path.join(dir, file.name)
    }
  }
}

export function nativePlugin (): Elysia {
  const app = new Elysia({ name: 'native' })

  for (const filepath of readFilesSync('dist')) {
    if (filepath.endsWith('index.js')) {
      const endpoint = '/scripts' + filepath.slice(4).replace('index.js', 'react.min.ts')
      app.get(endpoint, async ({ set }) => {
        if (Bun.env.PRODUCTION === 'FALSE') await Bun.write(filepath, Bun.gzipSync(Buffer.from(await Bun.file(filepath).text())))
        set.headers['Content-Type'] = 'text/js'
        set.headers['Content-Encoding'] = 'gzip'
        return Bun.file(filepath)
      })
    }
    if (filepath.endsWith('index.css')) {
      const endpoint = '/styles' + filepath.slice(4).replace('index.css', 'tailwind.min.css')
      app.get(endpoint, async ({ set }) => {
        // if (Bun.env.PRODUCTION === 'FALSE') await Bun.write(filepath, Bun.gzipSync(Buffer.from(await Bun.file(filepath).text())))
        set.headers['Content-Type'] = 'text/css'
        // set.headers['Content-Encoding'] = 'gzip'
        return Bun.file(filepath)
      })
    }
  }

  return app
}

export default nativePlugin
