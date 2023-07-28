"use client";
import { useEffect, useRef, useState } from "react";
import { isLiveSession } from "@/app/utils/countdownUtil";
import { format, add } from "date-fns";
import { sessionIsNear } from "@/app/utils/weatherAPI";
import { WeatherIcons } from "@/app/components/WeatherIcons";

interface Props {
  name: string;
  weekend_date: string;
  country: string;
  latLng: [number, number];
  sessions: { sessionName: string; date: Date }[];
  trackImg: string;
  round: number;
}

export const TrackItem = (props: Props) => {
  const titleRef = useRef(null);
  const unclickableRef = useRef(null);
  const displayDate = new Date(props.weekend_date);
  const [open, setOpen] = useState(false);
  const handleOpen = (event) => {
    if (event.target != unclickableRef.current) {
      open ? setOpen(false) : setOpen(true);
      if (!open) {
        setTimeout(() => {
          titleRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 700);
      }
    }
  };

  const mockdate = new Date(`2023-07-27 0:0:00Z`);
  const liveSpan = <span className="float-right">🟢 Live</span>;

  function liveDuration(sessionName: string, sessionDate: Date) {
    if (sessionName == "Race") {
      return isLiveSession(sessionDate, true) ? liveSpan : "";
    } else {
      return isLiveSession(sessionDate, false) ? liveSpan : "";
    }
  }

  function formatDate(date: Date, race: boolean) {
    const startDate = format(date, "HH:mm");
    const endDate = format(add(date, { hours: 1 }), "HH:mm");
    const raceEndDate = format(add(date, { hours: 1, minutes: 30 }), "HH:mm");

    return (
      <span className="p-2 justify-self-center">
        <span className="px-2 text-neutral-200 rounded-l-2xl bg-neutral-400">
          {format(date, "E")}
        </span>
        <span className="px-2 bg-green-400 bg-opacity-50 border-r-2 border-neutral-400">
          {startDate}
        </span>
        <span className="bg-red-400 bg-opacity-50 rounded-r-2xl px-2 border-l-2 border-neutral-400">
          {race ? raceEndDate : endDate}
        </span>
      </span>
    );
  }

  function renderSessions(sessions: { sessionName: string; date: Date }[]) {
    let paragraphs = [];
    sessions.map((session, index) => {
      paragraphs.push(
        <div key={`session-${index}`} className="border-b-2 border-neutral-900">
          <p className="py-1 px-2">
            <b className="text-[16px]">{session.sessionName}</b>
            {formatDate(session.date, session.sessionName == "Race")}
            {liveDuration(session.sessionName, session.date)}{" "}
          </p>
          <div className="flex border-t-2 border-neutral-400 p-0 m-0 ">
            <WeatherIcons
              sessionName={session.sessionName}
              dataAvailable={sessionIsNear(session.date)}
              sessionStart={session.date}
              sessionEnd={add(session.date, { hours: 1 })}
              latLng={props.latLng}
            ></WeatherIcons>
          </div>
        </div>,
      );
    });
    return paragraphs;
  }

  return (
    <>
      <li
        ref={titleRef}
        className={`${
          open
            ? "bg-neutral-100 border-x-0 border-y-4"
            : "text-white hover:bg-neutral-100 border-y-4 border-x-4 hover:text-black rounded-xl bg-red-700 "
        } scroll-my-5 group transition-all duration-200 ease-in p-3 border-red-700 shadow-md shadow-red-950`}
        onClick={handleOpen}
      >
        <p className="scroll-auto text-start text-3xl pl-5 font-bold">
          {props.name}
        </p>
        <p
          className={`text-start pl-5 tracking-widest ${
            open ? "" : "group-hover:text-red-700"
          }`}
        >
          {format(props.sessions[0].date, "dd MMM yyyy")} ―{" "}
          {format(displayDate, "dd MMM yyyy")}
        </p>
        <div className={`accordion-container py-2 ${open ? "open" : ""}`}>
          <div className="accordion-item">
            <div className="border-neutral-900 border-2 flex flex-col sm:flex-row">
              <div onClick={(e) => e.stopPropagation()} className="md:w-2/3">
                <h1 className="text-xl p-3 border-b-2 border-neutral-900 bg-red-700 text-white font-light tracking-wider">
                  Sessions:
                </h1>
                {renderSessions(props.sessions)}
                <p className="pl-2">
                  <b>Track Layout:</b>
                </p>
                <img src={props.trackImg} className="mx-auto h-64" />
              </div>
              <div onClick={(e) => e.stopPropagation()} className="w-full">
                <h1 className="text-xl p-3 sm:border-l-2 sm:border-y-0 border-y-2 border-neutral-900 bg-red-700 text-white font-light tracking-wider">
                  Weather Radar:
                </h1>
                <iframe
                  className="min-h-[500px] h-[70svh] sm:h-[80svh] border-neutral-900 sm:border-t-2 sm:border-l-2 bg-white"
                  width="100%"
                  height="100%"
                  src={
                    open
                      ? `https://embed.windy.com/embed2.html?lat=${props.latLng[0]}&lon=${props.latLng[1]}&detailLat=${props.latLng[0]}&detailLon=${props.latLng[1]}&width=500&height=1000&zoom=9&level=surface&overlay=rain&product=ecmwf&menu=&message=&marker=&calendar=now&pressure=&type=map&location=coordinates&detail=true&metricWind=default&metricTemp=default&radarRange=-1`
                      : "about:blank"
                  }
                  name="myIframe"
                  id="myIframe"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </li>
    </>
  );
};
