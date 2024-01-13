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

function serve (_data?: { path?: string | 'public', prefix?: string | '/' }): Elysia {
  const app = new Elysia({ name: 'serve' })
  const data = {
    path: _data?.path ?? 'public',
    prefix: _data?.prefix ?? '/'
  }
  const gzip = ['.html', '.css', '.js', '.wasm']

  for (const file of readFilesSync(data.path)) {
    app.get(data.prefix + file.slice(data.path.length + 1), async ({ set }) => {
      const File = Bun.file(file)
      if (Bun.env.MODE === 'PRODUCTION') {
        if (gzip.some((ext) => file.endsWith(ext))) set.headers['Content-Encoding'] = 'gzip'
        return File
      } else {
        if (gzip.some((ext) => file.endsWith(ext))) {
          await Bun.write(file, Bun.gzipSync(Buffer.from(await File.text())))
          set.headers['Content-Encoding'] = 'gzip'
        }
        return File
      }
    })
  }

  return app
}

export default serve
