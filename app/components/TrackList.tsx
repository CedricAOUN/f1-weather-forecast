"use client";
import { TrackItem } from "@/app/components/TrackItem";
import { isLiveSession, TrackSessions } from "@/app/utils/countdownUtil";
import { useState } from "react";

interface Props {
  races: [];
}

interface Track {
  season: string;
}

export const TrackList = (props: Props) => {
  let tracks = props.races;
  let season = (tracks[tracks.length - 1] as Track)?.season;
  const [openId, setOpenId] = useState<number | null>(null);

  function handleOpen(id: number) {
    if (openId == id) {
      setOpenId(null);
    } else {
      setOpenId(id);
    }
  }

  function seasonIsOver(tracks) {
    let lastRace = tracks[tracks.length - 1];

    let lastRaceDateTime = new Date(`${lastRace.date} ${lastRace.time}`);
    console.log(lastRaceDateTime);
    return !(
      lastRaceDateTime >= new Date() || isLiveSession(lastRaceDateTime, true)
    );
  }

  return (
    <>
      {seasonIsOver(tracks) ? (
        <div className={"flex h-[50vh] justify-center flex-col"}>
          <h1
            className={
              "text-white text-xl text-center outline-1 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
            }
          >
            F1 {season} season is over! Please check back in February/March of{" "}
            {parseInt(season) + 1}.
          </h1>
        </div>
      ) : (
        <></>
      )}
      <ul className="flex flex-col gap-5 w-auto">
        {tracks.map((track: any, index) => {
          return (
            (new Date(`${track.date} ${track.time}`) >= new Date() ||
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
                onClick={() => handleOpen(track.round)}
                isOpen={openId === track.round}
              ></TrackItem>
            )
          );
        })}
      </ul>
    </>
  );
};
