"use client";
import { TrackItem } from "@/app/components/TrackItem";
import {
  currentDate,
  isLiveSession,
  TrackSessions,
} from "@/app/utils/countdownUtil";
import { useState } from "react";

interface Props {
  races: [];
}

export const TrackList = (props: Props) => {
  let tracks = props.races;
  const [openId, setOpenId] = useState<number | null>(null);

  function handleOpen(id: number) {
    if (openId == id) {
      setOpenId(null);
    } else {
      setOpenId(id);
    }
  }

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
