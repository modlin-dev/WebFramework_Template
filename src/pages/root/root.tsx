import { useState } from "react";

function Root(): JSX.Element {
  const [count, setCount] = useState(0);

  return (
    <main className="flex justify-center items-center gap-6 flex-col h-screen">
      Hello, world!
      <button
        className="bg-black rounded-full p-4 pt-2 pb-2 text-white"
        onClick={() => {
          setCount(count + 1);
        }}
      >
        {count}. Click Me!
      </button>
    </main>
  );
}

export default Root;
