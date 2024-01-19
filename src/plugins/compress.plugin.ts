import Elysia from 'elysia'
import { isValidElement } from 'react'
import { renderToString } from 'react-dom/server'

export function compressPlugin (): Elysia {
  return new Elysia({
    name: 'compressPlugin'
  })
    .mapResponse(({ response, path }) => {
      const gzip = ['.html', '.js', '.wasm']
      if (response !== undefined && gzip.some((ext) => path.endsWith(ext))) {
        return new Response(
          Bun.gzipSync(
            Buffer.from(
              typeof response === 'object' ? JSON.stringify(response) : response.toString()
            )
          )
        )
      }
    })
    .onAfterHandle(({ response, set, path }) => {
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
