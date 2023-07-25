import {TrackItem} from "@/app/components/TrackItem";

interface Props {
    races: []
}


export const TrackList = async (props: Props) => {
    let tracks = props.races
    const currentDate = new Date();
    const ONE_HOUR = 60 * 60 * 1000;
    const anHourAgo = Date.now() - ONE_HOUR;

    const mockSession = new Date();
    mockSession.setMinutes(mockSession.getMinutes() - 59) // Testing
    const isLive = (sessionDate: Date): boolean => {
        return sessionDate.getTime() > anHourAgo;
    }


    return (
        <>
            <h1>Remaining Races:</h1>
            <ul className='flex flex-col gap-5 w-auto'>
                {tracks.map((track: any) =>
                    (new Date(`${track.date} ${track.time}` ) >= currentDate || isLive(new Date(`${track.date} ${track.time}`))) &&
                    <TrackItem key={track.round} name={track.raceName} weekend_date={track.date} country={track.Circuit.Location.country}
                               latLng={[track.Circuit.Location.lat, track.Circuit.Location.long]} isSprint={track.hasOwnProperty('Sprint')}
                                isLive={true}
                    ></TrackItem>
            )}
            </ul>
        </>
    );
};