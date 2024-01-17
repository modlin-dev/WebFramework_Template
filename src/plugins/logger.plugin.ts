import { Elysia } from 'elysia'
import logger from 'terminal/logger'
import { Chalk } from 'terminal/chalk'

export function loggerPlugin (): Elysia {
  return new Elysia({ name: 'Logger' }).onRequest(({ request, set }) => {
    const Method = request.method
      .replace('GET', Chalk.Forground.RGB(107, 221, 154, 'GET'))
      .replace('POST', Chalk.Forground.RGB(255, 228, 126, 'POST'))
      .replace('PUT', Chalk.Forground.RGB(116, 174, 246, 'PUT'))
      .replace('PATCH', Chalk.Forground.RGB(192, 168, 225, 'PATCH'))
      .replace('DELETE', Chalk.Forground.RGB(247, 154, 142, 'DELETE'))
      .replace('HEAD', Chalk.Forground.RGB(107, 221, 154, 'HEAD'))
      .replace('OPTIONS', Chalk.Forground.RGB(241, 94, 176, 'OPTIONS'))

    function Status (status: number): string {
      if (status > 499) {
        return Chalk.Forground.Red(status.toString())
      }
      if (status > 399) {
        return Chalk.Forground.Orange(`${status} Not Found`)
      }
      if (status > 299) {
        return Chalk.Forground.White(`${status} Found`)
      }
      if (status > 199) {
        return Chalk.Forground.Green(`${status} OK`)
      }
      return Chalk.Forground.Cyan(status.toString())
    }

    const sliced = request.url.split('/')
    const Endpoint = Chalk.Forground.Cyan(request.url.slice(7 + sliced[2].length))

    const WSEndPoints = [
      '/server'
    ]

    function Protocol (): string {
      const protocol = sliced[0].replace(':', '').toUpperCase()
      const endpoint = request.url.slice(7 + sliced[2].length)

      if (protocol.startsWith('HTTP')) {
        if (WSEndPoints.some((value) => endpoint === value)) {
          if (protocol.endsWith('S')) return Chalk.Forground.Magenta('WSS')
          return Chalk.Forground.Magenta('WS')
        }
        return Chalk.Forground.Blue(protocol)
      }
      return Chalk.Forground.White(protocol)
    }

    logger.log(Method, Endpoint, Protocol(), Status(set.status ?? 100))
  })
}

export default loggerPlugin
