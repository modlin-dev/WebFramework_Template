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

  for (const file of readFilesSync('dist')) {
    if (file.endsWith('index.js')) {
      app.get('/scripts' + file.slice(4).replace('index.js', 'typescript.min.js'), async ({ set }) => {
        if (Bun.env.PRODUCTION === 'FALSE') await Bun.write(file, Bun.gzipSync(Buffer.from(await Bun.file(file).text())))
        set.headers['Content-Encoding'] = 'gzip'
        return Bun.file(file)
      })
    }
    if (file.endsWith('index.css')) {
      app.get('/styles' + file.slice(4).replace('index.css', 'tailwind.min.css'), async ({ set }) => {
        if (Bun.env.PRODUCTION === 'FALSE') await Bun.write(file, Bun.gzipSync(Buffer.from(await Bun.file(file).text())))
        set.headers['Content-Encoding'] = 'gzip'
        return Bun.file(file)
      })
    }
  }

  return app
}

export default nativePlugin
