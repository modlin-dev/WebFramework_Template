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

export function servePlugin (_data?: { path?: string | 'public', prefix?: string | '/' }): Elysia {
  const app = new Elysia({ name: 'serve' })

  const data = {
    path: _data?.path ?? 'public',
    prefix: _data?.prefix ?? '/'
  }

  for (const file of readFilesSync(data.path)) {
    app.get(data.prefix + file.slice(data.path.length + 1), () => Bun.file(file))
  }

  return app
}

export default servePlugin
