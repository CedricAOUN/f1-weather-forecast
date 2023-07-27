"use client";
import { Tooltip, Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { FaTemperatureLow } from "react-icons/fa";
import { GiWindsock } from "react-icons/gi";
import { IoWaterSharp } from "react-icons/io5";

interface WeatherProps {
  text: string;
  rainChance: number;
  wind: { speed: number; dir: string };
  temp: string;
  percip: number;
  rainGuarantee: boolean;
}

interface Props {
  icon?: string;
  sessionStart?: { WeatherProps: WeatherProps };
  sessionEnd?: { WeatherProps: WeatherProps };
  dataAvailable: boolean;
}

export const WeatherIcons = (props: Props) => {
  const iconClasses = "h-10";

  return (
    <>
      {" "}
      {props.dataAvailable ? (
        <div className="flex flex-1 justify-center">
          <div className="basis-1/2 w-max bg-green-400 bg-opacity-50 flex gap-4 my-auto justify-center border-neutral-400 border-r-2">
            <Tooltip content="Sunny, 86% Chance of rain." id="default">
              <img
                src={"//cdn.weatherapi.com/weather/64x64/day/299.png"}
                className="inline-block h-10"
              />
            </Tooltip>
            <Tooltip content="Sunny, 86% Chance of rain." id="temp">
              <FaTemperatureLow
                className={iconClasses}
                size={"20"}
              ></FaTemperatureLow>
            </Tooltip>
            <Tooltip content="Sunny, 86% Chance of rain." id="wind">
              <GiWindsock className={iconClasses} size={"20"}></GiWindsock>
            </Tooltip>
            <Tooltip content="Sunny, 86% Chance of rain." id="percip">
              <IoWaterSharp className={iconClasses} size={"20"}></IoWaterSharp>
            </Tooltip>
          </div>
          <div className="basis-1/2 w-max bg-red-400 bg-opacity-50 flex gap-4 my-auto justify-center border-neutral-400 border-l-2">
            <Tooltip content="Sunny, 86% Chance of rain." id="default">
              <img
                src={"//cdn.weatherapi.com/weather/64x64/day/299.png"}
                className="inline-block h-10"
              />
            </Tooltip>
            <Tooltip content="Sunny, 86% Chance of rain." id="temp">
              <FaTemperatureLow
                className={iconClasses}
                size={"20"}
              ></FaTemperatureLow>
            </Tooltip>
            <Tooltip content="Sunny, 86% Chance of rain." id="wind">
              <GiWindsock className={iconClasses} size={"20"}></GiWindsock>
            </Tooltip>
            <Tooltip content="Sunny, 86% Chance of rain." id="percip">
              <IoWaterSharp className={iconClasses} size={"20"}></IoWaterSharp>
            </Tooltip>
          </div>
        </div>
      ) : (
        <p className="py-2 px-2 text-neutral-400">
          Weather Info unavailable. Try within 3 days.
        </p>
      )}
    </>
  );
};
