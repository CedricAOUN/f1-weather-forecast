"use client";
import { useEffect, useState } from "react";
import {
  currentGP,
  isAnySessionLive,
  nearestSession,
  TrackSessions,
} from "@/app/utils/countdownUtil";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useCountdownContext } from "@/app/context/CountdownContext";

interface Props {
  races: [];
}

export const Countdown = (props: Props) => {
  const { countdownEnded, setCountdownEnded } = useCountdownContext();
  const [loading, setLoading] = useState(true);
  const [target, setTarget] = useState<Date>(null);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [liveSession, setLiveSession] = useState<string>();
  // isAnySessionLive(TrackSessions(currentGP(props.races))),

  useEffect(() => {
    const fetchData = async () => {
      setTarget(nearestSession(TrackSessions(await currentGP())).date);
      setLiveSession(isAnySessionLive(TrackSessions(await currentGP())));
    };

    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoading(false);
      const now = new Date();
      const difference = target?.getTime() - now.getTime();

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
        setTarget(nearestSession(TrackSessions(currentGP())).date);
        setLiveSession(isAnySessionLive(TrackSessions(currentGP())));
        setCountdownEnded(countdownEnded + 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [target]);

  return (
    <>
      {loading ? (
        <AiOutlineLoading3Quarters
          className="animate-spin mx-auto"
          size={32}
        ></AiOutlineLoading3Quarters>
      ) : (
        (target == null && <p>Countdown unavailable right now.</p>) || (
          <p className="text-xl">
            {days} Days, {hours} Hours, {minutes} Minutes, {seconds} Seconds
          </p>
        )
      )}
      <p className="text-center">
        {!!liveSession ? `🟢 ${liveSession} is live!` : ""}
      </p>
    </>
  );
};
