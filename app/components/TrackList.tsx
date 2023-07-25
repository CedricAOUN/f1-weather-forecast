import {TrackItem} from "@/app/components/TrackItem";

interface Props {
    races: []
}


export const TrackList = async (props: Props) => {
    let tracks = props.races

    return (
        <>
            <h1>Remaining Races:</h1>
            <ul className='flex flex-col gap-5 w-auto'>
                {tracks.map((track: any) => new Date(track.date) > new Date() &&
                    <TrackItem key={track.round} name={track.raceName} weekend_date={track.date} country={track.Circuit.Location.country}
                               latLng={[track.Circuit.Location.lat, track.Circuit.Location.long]}></TrackItem>
            )}
            </ul>
        </>
    );
};