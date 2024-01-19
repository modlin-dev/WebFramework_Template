import Elysia from 'elysia'
import { isValidElement } from 'react'
import { renderToString } from 'react-dom/server'

export function compressPlugin (): Elysia {
  return new Elysia({
    name: 'compressPlugin'
  }).onAfterHandle(({ response, set, path }) => {
    if (isValidElement(response)) {
      const html = renderToString(response)
      set.headers['Content-Encoding'] = 'gzip'
      set.headers['Content-Type'] = 'text/html; charset=utf-8'
      return new Response(Bun.gzipSync(Buffer.from('<!DOCTYPE html>' + html)))
    }
    const gzip = ['.html', '.js', '.wasm']
    if (gzip.some((ext) => path.endsWith(ext))) {
      console.log('yes')
      set.headers['Content-Encoding'] = 'gzip'
      return new Response(Bun.gzipSync(Buffer.from(response as string)))
    }
    // Add more Handlers
  })
}

export default compressPlugin
