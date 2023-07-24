import {getTracks} from "@/app/utils/tracksAPI";
import {TrackItem} from "@/app/components/TrackItem";

export const TrackList = async () => {
    const response = await getTracks();
    const tracks = response.data.MRData.RaceTable.Races

    return (
        <>
            <h1>Remaining Races:</h1>
            <ul className='flex flex-col gap-5 w-auto'>
                {tracks.map((track) => new Date(track.date) > new Date() &&
                    <TrackItem key={track.round} name={track.raceName} weekend_date={track.date} country={track.Circuit.Location.country}></TrackItem>
            )}
            </ul>
        </>
    );
};