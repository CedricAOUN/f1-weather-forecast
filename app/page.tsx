import {TrackList} from "@/app/components/TrackList";

export default function Home() {

  return (
    <>
      <header>
       <h1 className="text-center bg-red-700 italic p-2 text-white font-bold">Formula 1 - Weather Forecast</h1>
      </header>
      <button className="border-amber-300">Testing Button</button>
      <div className="flex h-10 justify-center flex-col items-center m-2">
        <h1>Time Until Next Weekend:</h1>
        <div className='box-border border-amber-300 bg-opacity-40 bg-black p-3'>
          <p>Countdown</p>
        </div>
      </div>
      <div className="container p-4 max-w-full">
      <TrackList></TrackList>
      </div>
    </>
  )
}
