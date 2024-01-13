import { Elysia } from 'elysia'
import logger from 'terminal/logger'
import { Chalk } from 'terminal/chalk'

export function loggerPlugin (): Elysia {
  const app = new Elysia({ name: 'Logger' }).onRequest(({ request, set }) => {
    const Method = request.method
      .replace('GET', Chalk.Forground.Blue('GET'))
      .replace('POST', Chalk.Forground.Green('POST'))
      .replace('PUT', '\x1B[38mPUT\x1B[0m')
      .replace('DELETE', Chalk.Forground.Red('DELETE'))
      .replace('PATCH', Chalk.Forground.Orange('PATCH'))
      .replace('CONNECT', Chalk.Forground.Cyan('CONNECT'))
      .replace('HEAD', Chalk.Forground.White('HEAD'))
      .replace('OPTIONS', Chalk.Forground.Magenta('OPTIONS'))

    function Status (status: number): string {
      if (status > 499) {
        return Chalk.Forground.Red(status.toString())
      }

      if (status > 399) {
        return Chalk.Forground.Orange(status.toString())
      }

      if (status > 299) {
        return Chalk.Forground.White(status.toString())
      }

      if (status > 199) {
        return Chalk.Forground.Green(status.toString())
      }

      return Chalk.Forground.Cyan(status.toString())
    }

    logger.log(Method, Chalk.Forground.Cyan(request.url), Status(set.status ?? 100))
  })

  return app
}

export default loggerPlugin
