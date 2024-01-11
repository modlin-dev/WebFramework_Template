function NotFound(): JSX.Element {
  // --
  // --
  return (
    <main class="flex justify-center items-center w-full h-screen bg-white dark:bg-black">
      <span class="flex flex-col justify-center items-center gap-2">
        <h1 class="text-black dark:text-white w-36 flex justify-center items-center text-2xl text-center font-mono">
          404
        </h1>
        <div class="h-[1px] bg-slate-500 w-36" />
        <p class="text-black dark:text-white w-36 flex justify-center items-center text-sm text-center font-mono">
          Page Not Found
        </p>
      </span>
    </main>
  )
}

export default NotFound
