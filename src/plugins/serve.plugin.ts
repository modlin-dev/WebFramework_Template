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

export function servePlugin (data?: { path?: string, prefix?: string }): Elysia {
  const app = new Elysia({ name: 'serve' })

  for (const file of readFilesSync(data?.path ?? 'public')) {
    app.get(data?.prefix ?? '/' + file.slice((data?.path ?? 'public').length + 1), async ({ set }) => {
      set.headers['Content-Encoding'] = 'gzip'
      return new Response(Buffer.from(await Bun.file(file).text()))
    })
  }

  return app
}

export default servePlugin
