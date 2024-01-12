import React, { useState } from 'react'
import { type App } from '../app/server'
import { edenTreaty } from '@elysiajs/eden'

function Loading (): React.ReactNode {
  // --
  const [getStyle, setStyle] = useState<any>({ visibility: 'hidden' })
  const [getClass, setClass] = useState(
    'bg-white dark:bg-black flex justify-center items-center h-screen w-screen gap-8 flex-col animate-fade fixed invisible transition-all'
  )

  const server = edenTreaty<App>('http://localhost').server.subscribe()

  server.on('close', () => {
    setStyle({ visibility: 'visible', opacity: 1 })
    setClass(
      'bg-white dark:bg-black flex justify-center items-center h-screen w-screen gap-8 flex-col fixed transition-all'
    )
    setTimeout(() => {
      window.location.reload()
    }, 2000)
  })
  // --
  return (
    <div style={getStyle} className={getClass}>
      <svg
        version="1.1"
        id="Layer_1"
        x="0px"
        y="0px"
        viewBox="0 0 110.96 62.27"
        width={64}
        className="dark:invert"
      >
        <g>
          <path
            d="M35.81,33.4L11.59,9.18c-0.15-0.15-0.34-0.3-0.49-0.45c-0.07-0.07-0.15-0.11-0.23-0.19c-0.11-0.07-0.19-0.15-0.3-0.22
  s-0.19-0.11-0.3-0.19c-0.07-0.04-0.19-0.11-0.26-0.15C9.9,7.94,9.79,7.86,9.71,7.83C9.6,7.79,9.53,7.71,9.41,7.68
  S9.23,7.6,9.11,7.56S8.89,7.49,8.78,7.45s-0.23-0.04-0.3-0.07C8.36,7.34,8.25,7.3,8.14,7.3C8.03,7.26,7.91,7.26,7.76,7.26
  c-0.11,0-0.19-0.04-0.3-0.04c-0.45-0.04-0.9-0.04-1.35,0c-0.11,0-0.19,0.04-0.3,0.04S5.59,7.3,5.44,7.3
  C5.33,7.34,5.21,7.34,5.1,7.38C4.99,7.41,4.88,7.41,4.8,7.45C4.69,7.49,4.58,7.53,4.46,7.56s-0.23,0.07-0.3,0.11
  c-0.11,0.04-0.19,0.07-0.3,0.15c-0.11,0.04-0.23,0.11-0.3,0.15C3.45,8.01,3.38,8.09,3.3,8.13C3.19,8.2,3.11,8.24,3,8.31
  S2.81,8.46,2.7,8.54C2.63,8.61,2.55,8.65,2.48,8.73c-0.19,0.15-0.34,0.3-0.49,0.45l0,0l0,0c-0.15,0.15-0.3,0.34-0.45,0.49
  C1.46,9.74,1.43,9.81,1.35,9.89C1.28,10,1.2,10.08,1.12,10.19c-0.07,0.11-0.11,0.19-0.19,0.3c-0.04,0.07-0.11,0.19-0.15,0.26
  c-0.04,0.11-0.11,0.22-0.15,0.3c-0.04,0.11-0.11,0.19-0.15,0.3c-0.04,0.11-0.07,0.19-0.11,0.3s-0.07,0.22-0.11,0.34
  s-0.04,0.22-0.07,0.3c-0.04,0.11-0.07,0.22-0.07,0.34C0.08,12.74,0.08,12.85,0.08,13c0,0.11-0.04,0.19-0.04,0.3
  C0,13.53,0,13.75,0,13.98v34.28c0,3.79,3.07,6.86,6.86,6.86l0,0c3.79,0,6.86-3.07,6.86-6.86V30.51l12.52,12.53
  c2.66,2.66,7.01,2.66,9.71,0l0,0C38.48,40.41,38.48,36.06,35.81,33.4z"
          />
          <path
            d="M75.15,33.4L99.38,9.18c0.15-0.15,0.34-0.3,0.49-0.45c0.08-0.07,0.15-0.11,0.23-0.19c0.11-0.07,0.19-0.15,0.3-0.22
  s0.19-0.11,0.3-0.19c0.08-0.04,0.19-0.11,0.26-0.15c0.11-0.04,0.23-0.11,0.3-0.15c0.11-0.04,0.19-0.11,0.3-0.15s0.19-0.07,0.3-0.11
  c0.11-0.04,0.23-0.07,0.34-0.11s0.23-0.04,0.3-0.07c0.11-0.04,0.23-0.07,0.34-0.07c0.11-0.04,0.23-0.04,0.38-0.04
  c0.11,0,0.19-0.04,0.3-0.04c0.45-0.04,0.9-0.04,1.35,0c0.11,0,0.19,0.04,0.3,0.04s0.23,0.04,0.38,0.04
  c0.11,0.04,0.23,0.04,0.34,0.07s0.23,0.04,0.3,0.07c0.11,0.04,0.23,0.07,0.34,0.11s0.23,0.07,0.3,0.11
  c0.11,0.04,0.19,0.07,0.3,0.15c0.11,0.04,0.23,0.11,0.3,0.15c0.11,0.04,0.19,0.11,0.26,0.15c0.11,0.07,0.19,0.11,0.3,0.19
  s0.19,0.15,0.3,0.22c0.08,0.07,0.15,0.11,0.23,0.19c0.19,0.15,0.34,0.3,0.49,0.45l0,0l0,0c0.15,0.15,0.3,0.34,0.45,0.49
  c0.08,0.07,0.11,0.15,0.19,0.22c0.08,0.11,0.15,0.19,0.23,0.3s0.11,0.19,0.19,0.3c0.04,0.07,0.11,0.19,0.15,0.26
  c0.04,0.11,0.11,0.22,0.15,0.3c0.04,0.11,0.11,0.19,0.15,0.3s0.08,0.19,0.11,0.3c0.04,0.11,0.08,0.22,0.11,0.34
  c0.04,0.11,0.04,0.22,0.08,0.3c0.04,0.11,0.08,0.22,0.08,0.34c0.04,0.11,0.04,0.22,0.04,0.38c0,0.11,0.04,0.19,0.04,0.3
  c0.04,0.22,0.04,0.45,0.04,0.68v34.28c0,3.79-3.08,6.86-6.86,6.86l0,0c-3.79,0-6.86-3.07-6.86-6.86V30.51L84.71,43.04
  c-2.66,2.66-7.01,2.66-9.71,0l0,0C72.49,40.41,72.49,36.06,75.15,33.4z"
          />
          <path
            d="M60.04,4.08l-21.6,48.56c-1.54,3.45,0,7.5,3.49,9.04l0,0c3.45,1.54,7.5,0,9.04-3.49l21.6-48.56c1.54-3.45,0-7.5-3.49-9.04
  l0,0C65.63-0.95,61.58,0.63,60.04,4.08z"
          />
        </g>
      </svg>
      <line className="w-40 h-2 rounded-full border-black dark:border-white border overflow-hidden">
        <div className="h-full bg-black dark:bg-white animate-loading" />
      </line>
      <audio autoPlay={true} src="/audio/intro.mp3" />
    </div>
  )
}

export default Loading
