import { block } from 'million/react'
import React, { useState } from 'react'
import { edenTreaty } from '@elysiajs/eden'
import { type App } from '../../app/server'

const Block = block(function Home (): React.ReactNode {
  // --
  const [count, setCount] = useState(0)
  const [isConnected, setConnected] = useState(false)
  const server = edenTreaty<App>('http://localhost').server.subscribe()

  server.on('message', (message) => {
    console.log(message.data)
  })
  server.on('open', () => {
    console.log('[WS] Connected')
    setConnected(true)
  })
  server.on('close', () => {
    console.log('[WS] Disconnected')
    setConnected(false)
  })
  server.on('error', () => {
    console.log('[WS] Connecting')
    setConnected(false)
  })
  // --
  return (
    <main className="flex justify-start items-center gap-6 flex-col h-screen">
      <nav className="w-full h-20 bg-slate-50 border-b border-slate-700 dark:bg-black dark:border-slate-300" />
      <button
        className="bg-black rounded-full p-4 pt-2 pb-2 text-white"
        onClick={() => {
          setCount(count + 1)
          if (isConnected) {
            server.send(`Checking for updates ${count}`)
            setConnected(false)
          }
        }}
      >
        {count}. Click Me!
      </button>
      <img
        alt="Catboy"
        width={256}
        height={256}
        decoding="async"
        data-nimg="1"
        src={'/images/catboy.webp'}
      />
    </main>
  )
})

export default Block
