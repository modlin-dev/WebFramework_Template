import { type JSX } from 'react'

function NotFound (): JSX.Element {
  // --
  // --
  return (
    <main className="flex justify-center items-center w-full h-screen bg-white dark:bg-black">
      <span className="flex flex-col justify-center items-center gap-2">
        <h1 className="text-black dark:text-white w-36 flex justify-center items-center text-2xl text-center font-mono">
          404
        </h1>
        <div className="h-[1px] bg-slate-500 w-36" />
        <p className="text-black dark:text-white w-36 flex justify-center items-center text-sm text-center font-mono">
          Page Not Found
        </p>
      </span>
    </main>
  )
}

export default NotFound
