import { edenTreaty } from '@elysiajs/eden'
import type { App } from './server'

const app = edenTreaty<App>('http://localhost')
const home = await app.scripts['home.min.js'].get()
console.log(home.data)

// const fetch = edenFetch<App>("http://localhost:3000");
