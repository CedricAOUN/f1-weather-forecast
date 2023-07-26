import {TrackList} from "@/app/components/TrackList";
import {getTracks} from "@/app/utils/tracksAPI";
import {Countdown} from "@/app/components/Countdown";

export default async function Home() {
    const response = await getTracks();
    const races = response.data.MRData.RaceTable.Races;


  return (
    <>
      <header>
       <h1 className="text-center bg-red-700 italic p-6 text-white font-bold border-b-4 border-white text-4xl">Formula 1 - Weather Forecast</h1>
      </header>
      <div className="flex h-10 justify-center flex-col items-center m-2">
        <h1 className="pt-10 text-white">Time Until Next Session:</h1>
        <div className='box-border border-amber-300 bg-opacity-40 bg-black p-3 text-white'>
            <Countdown races={races}></Countdown>
        </div>
      </div>
      <div className="container p-4 max-w-full">
      <TrackList races={races}></TrackList>
      </div>
    </>
  )
}
