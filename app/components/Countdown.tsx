"use client";
import { useEffect, useState } from "react";
import {
  closestSession,
  currentGP,
  isAnySessionLive,
  nearestSession,
  TrackSessions,
} from "@/app/utils/countdownUtil";
import loadingGif from "../../public/loading.gif";
import { add } from "date-fns";

interface Props {
  races: [];
}

export const Countdown = (props: Props) => {
  const [loading, setLoading] = useState(true);
  const [target, setTarget] = useState(
    nearestSession(TrackSessions(currentGP(props.races))).date,
  );
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [liveSession, setLiveSession] = useState<string>(
    isAnySessionLive(TrackSessions(currentGP(props.races))),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setLoading(false);
      const now = new Date();
      const difference = target.getTime() - now.getTime();

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      setDays(d);

      const h = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      setHours(h);

      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      setMinutes(m);

      const s = Math.floor((difference % (1000 * 60)) / 1000);
      setSeconds(s);

      if (d <= 0 && h <= 0 && m <= 0 && s <= 0) {
        setLoading(true);
        clearInterval(interval);
        setTarget(nearestSession(TrackSessions(currentGP(props.races))).date);
        setLiveSession(isAnySessionLive(TrackSessions(currentGP(props.races))));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [target]);

  return (
    <>
      <p className="text-center">
        {!!liveSession ? `🟢 ${liveSession} is live right now!` : ""}
      </p>
      {loading ? (
        <img
          className="object-center"
          src={loadingGif.src}
          height="30px"
          width="30px"
        ></img>
      ) : (
        <p className="text-xl">
          {days} Days, {hours} Hours, {minutes} Minutes, {seconds} Seconds
        </p>
      )}
    </>
  );
};
