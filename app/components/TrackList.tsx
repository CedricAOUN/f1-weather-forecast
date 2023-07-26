import {TrackItem} from "@/app/components/TrackItem";
import {currentDate, isLiveSession, TrackSessions} from "@/app/utils/countdownUtil";

interface Props {
    races: []
}


export const TrackList = async (props: Props) => {
    let tracks = props.races

    return (
        <>
            <h1 className='text-white py-16 text-start text-5xl outline-1 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]'>Remaining Races:</h1>
            <ul className='flex flex-col gap-5 w-auto'>
                {tracks.map((track: any) =>
                    (new Date(`${track.date} ${track.time}` ) >= currentDate || isLiveSession(new Date(`${track.date} ${track.time}`), true)) &&
                    <TrackItem key={track.round} name={track.raceName} weekend_date={track.date} country={track.Circuit.Location.country}
                               latLng={[track.Circuit.Location.lat, track.Circuit.Location.long]}
                               sessions={TrackSessions(track)} trackImg={track.track_img}
                    ></TrackItem>
            )}
            </ul>
        </>
    );
};