import { Elysia } from 'elysia'
import { isValidElement } from 'react'
import { renderToString } from 'react-dom/server'
import node_path from 'path'
const DOCTYPE = (type: string | 'html'): string => `<!DOCTYPE ${type}>`

export function compilePlugin (): Elysia {
  return new Elysia().onAfterHandle(async ({ response, path }) => {
    if (isValidElement(response)) {
      const html = renderToString(response)
      await Bun.write(node_path.join('dist', path, 'index.html'), Bun.gzipSync(Buffer.from(DOCTYPE('html') + html)))
    }
    if (response === String()) {
      // Add Handlers
    }
  })
}
