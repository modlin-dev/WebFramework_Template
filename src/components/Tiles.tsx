function Tiles (): JSX.Element {
  return (
    <div className="flex justify-center items-center flex-row gap-4">
      <video className="w-16 h-48 bg-black dark:bg-white rounded-md mt-24"></video>
      <video className="w-16 h-72 bg-black dark:bg-white rounded-md mb-16"></video>
      <video className="w-16 h-80 bg-black dark:bg-white rounded-md mt-20"></video>
      <video className="w-16 h-80 bg-black dark:bg-white rounded-md mb-20"></video>
      <video className="w-16 h-72 bg-black dark:bg-white rounded-md mt-16"></video>
      <video className="w-16 h-48 bg-black dark:bg-white rounded-md mb-24"></video>
    </div>
  )
}

export default Tiles
