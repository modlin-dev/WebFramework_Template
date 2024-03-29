import Elysia from 'elysia'
import { isValidElement } from 'react'
import { renderToString } from 'react-dom/server'
const DOCTYPE = (type: string | 'html'): string => `<!DOCTYPE ${type}>`

export function compressPlugin (): Elysia {
  return new Elysia({
    name: 'compressPlugin'
  })
    .onAfterHandle(async ({ response, set }) => {
      if (isValidElement(response)) {
        const html = renderToString(response)
        set.headers['Content-Encoding'] = 'gzip'
        set.headers['Content-Type'] = 'text/html; charset=utf-8'
        return new Response(Bun.gzipSync(Buffer.from(DOCTYPE('html') + html)))
      }
      // Add more Handlers
    })
}

export default compressPlugin
