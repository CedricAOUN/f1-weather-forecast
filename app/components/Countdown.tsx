"use client";
import { useEffect, useState } from "react";
import {
  closestSession,
  currentGP,
  isAnySessionLive,
  nextSessionDate,
  TrackSessions,
} from "@/app/utils/countdownUtil";
import loadingGif from "../../public/loading.gif";

interface Props {
  races: [];
}

export const Countdown = (props: Props) => {
  nextSessionDate(props.races);
  const [loading, setLoading] = useState(true);
  const [target, setTarget] = useState(closestSession);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [liveStatus, setLiveStatus] = useState<boolean>(false);
  const [liveSession, setLiveSession] = useState<string>("");

  const currentGrandPrix = currentGP(props.races);

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
        nextSessionDate(props.races);
        setTarget(closestSession);
      }
    }, 1000);

    if (currentGrandPrix != null) {
      const session = isAnySessionLive(TrackSessions(currentGrandPrix));
      setLiveStatus(session != "" ? true : false);
      setLiveSession(session);
    }

    return () => clearInterval(interval);
  }, [target]);

  return (
    <>
      <p className="text-center">
        {liveStatus ? `🟢 ${liveSession} is live right now!` : ""}
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
