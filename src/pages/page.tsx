import { type App } from 'app/server'
import { edenTreaty } from '@elysiajs/eden'
import Tiles from 'components/tiles'
import NavBar from 'components/navbar'

function Home (): JSX.Element {
  // --
  let wasDisconnected = false
  function websocket (): void {
    const app = edenTreaty<App>('ws://localhost')
    const server = app.server.subscribe()

    server.on('close', () => {
      console.log('[WS] Disconnected')
      wasDisconnected = true
      websocket()
    })
    server.on('open', () => {
      console.log('[WS] Connected')
      if (wasDisconnected) {
        window.location.reload()
      }
    })
  }
  websocket()

  function hover (is: boolean): void {
    if (is) {
      const cursor = document.getElementById('live-cursor')
      if (cursor !== null) {
        cursor.style.height = '80px'
        cursor.style.width = '80px'
        cursor.style.marginTop = '-40px'
        cursor.style.marginLeft = '-40px'
      }
    } else {
      const cursor = document.getElementById('live-cursor')
      if (cursor !== null) {
        cursor.style.height = '20px'
        cursor.style.width = '20px'
        cursor.style.marginTop = '-10px'
        cursor.style.marginLeft = '-10px'
      }
    }
  }
  // --
  return (
    <main className="bg-white dark:bg-black w-full">
      <NavBar />
      <section className="flex flex-col items-center justify-center h-screen w-full bg-white dark:bg-black">
        <h1 className="text-black dark:text-white font-sans text-8xl font-bold absolute left-32 top-64">
          Ship your App 🚀
        </h1>
        <Tiles />
      </section>
      <section className="flex flex-col items-center justify-center h-screen w-full bg-white dark:bg-black">
        <h1 className="text-black dark:text-white font-sans text-6xl font-bold">How it works?</h1>
      </section>
    </main>
  )
}

export default Home
