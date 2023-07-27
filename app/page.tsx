import {TrackList} from "@/app/components/TrackList";
import {addTrackImgs, getTracks} from "@/app/utils/tracksAPI";
import {Countdown} from "@/app/components/Countdown";
import {WeatherIcons} from "@/app/components/WeatherIcons";

export default async function Home() {
    const response = await getTracks();
    const races = response.data.MRData.RaceTable.Races;
    addTrackImgs(races);


    return (
        <>
            <header>
                <h1 className="text-center italic p-6 bg-neutral-900 text-white font-bold border-b-2 border-white text-4xl">Formula
                    1 - Weather Forecast</h1>
            </header>
            <div className="flex h-10 justify-center flex-col items-center m-2">
                <h1 className="pt-16 pb-5 text-white">Time Until Next Session:</h1>
                <div className='box-border border-amber-300 bg-opacity-40 bg-black p-3 text-white'>
                    <Countdown races={races}></Countdown>
                </div>
            </div>

            <div className="container p-4 md:px-24 max-w-full">
                <h1 className='text-white py-16 text-start text-5xl outline-1 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]'>Remaining
                    Races:</h1>
                <TrackList races={races}></TrackList>
            </div>
        </>
    )
}
