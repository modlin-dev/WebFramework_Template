function NavBar () {
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
  return (
        <nav className="bg-transparent w-full h-20 flex justify-around items-center fixed">
        <a
          onMouseEnter={() => {
            hover(true)
          }}
          onMouseLeave={() => {
            hover(false)
          }}
          href="/#"
          className="font-mono uppercase text-black dark:text-white"
        >
          <img src="/images/modlin-inc.svg" alt="Modlin Inc." height={24} width={128} />
        </a>
        <a
          onMouseEnter={() => {
            hover(true)
          }}
          onMouseLeave={() => {
            hover(false)
          }}
          href="/get-started"
          className="font-mono uppercase text-black dark:text-slate-200"
        >
          {'Get Started'}
        </a>
        <a
          onMouseEnter={() => {
            hover(true)
          }}
          onMouseLeave={() => {
            hover(false)
          }}
          href="/support"
          className="font-mono uppercase text-black dark:text-slate-200"
        >
          {'Support'}
        </a>
        <a
          onMouseEnter={() => {
            hover(true)
          }}
          onMouseLeave={() => {
            hover(false)
          }}
          href="/about"
          className="font-mono uppercase text-black dark:text-slate-200"
        >
          {'About Us'}
        </a>
        <a
          onMouseEnter={() => {
            hover(true)
          }}
          onMouseLeave={() => {
            hover(false)
          }}
          href="/login"
          className="font-mono uppercase text-black dark:text-slate-200"
        >
          {'Login'}
        </a>
      </nav>
  )
}

export default NavBar
