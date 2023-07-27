import { TrackItem } from "@/app/components/TrackItem";
import {
  currentDate,
  isLiveSession,
  TrackSessions,
} from "@/app/utils/countdownUtil";

interface Props {
  races: [];
}

export const TrackList = async (props: Props) => {
  let tracks = props.races;

  return (
    <>
      <ul className="flex flex-col gap-5 w-auto">
        {tracks.map((track: any, index) => {
          return (
            (new Date(`${track.date} ${track.time}`) >= currentDate ||
              isLiveSession(new Date(`${track.date} ${track.time}`), true)) && (
              <TrackItem
                key={track.round}
                name={track.raceName}
                weekend_date={track.date}
                country={track.Circuit.Location.country}
                latLng={[
                  track.Circuit.Location.lat,
                  track.Circuit.Location.long,
                ]}
                sessions={TrackSessions(track)}
                trackImg={track.track_img}
                round={track.round}
              ></TrackItem>
            )
          );
        })}
      </ul>
    </>
  );
};