import fs from 'fs'
import path from 'path'
import { Chalk } from 'terminal/chalk'
export function URL(
  protocol: 'ws' | 'wss' | 'http' | 'https',
  hostname: string,
  port: number
): string {
  if (protocol === 'ws') {
    return Chalk.Forground.Magenta(`ws://${hostname}:${port}`)
  }
  if (protocol === 'wss') {
    return Chalk.Forground.Orange(`wss://${hostname}:${port}`)
  }
  if (protocol === 'http') {
    return Chalk.Forground.Cyan(`http://${hostname}:${port}`)
  }

  return Chalk.Forground.Red(`https://${hostname}:${port}`)
}

export function* readAllFiles(dir: string): Generator<string> {
  const files = fs.readdirSync(dir, { withFileTypes: true })

  for (const file of files) {
    if (file.isDirectory()) {
      yield* readAllFiles(path.join(dir, file.name))
    } else {
      yield path.join(dir, file.name)
    }
  }
}
