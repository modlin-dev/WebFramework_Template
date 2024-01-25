import { type JSX } from 'react'

function Cursor (): JSX.Element {
  return (
    <div
      id="live-cursor"
      style={{ height: 20, width: 20 }}
      className="fixed bg-yellow-400 rounded-full pointer-events-none"
    >
    </div>
  )
}

export default Cursor
