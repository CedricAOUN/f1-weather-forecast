"use client";
import { Tooltip } from "flowbite-react";
import { useEffect, useState } from "react";
import { GiWindsock } from "react-icons/gi";
import { IoWaterSharp } from "react-icons/io5";
import { getForecast } from "@/app/utils/weatherAPI";
import { isLiveSession, isPastSession } from "@/app/utils/countdownUtil";
import { format } from "date-fns";

interface Props {
  latLng: [number, number];
  sessionStart?: Date;
  sessionEnd?: Date;
  sessionName: string;
  dataAvailable: boolean;
}

export const WeatherIcons = (props: Props) => {
  const iconClasses = "h-10";
  const [dataIsAvailable, setDataIsAvailable] = useState(props.dataAvailable);
  const [infoMessage, setInfoMessage] = useState(
    "Precise weather data not available yet. Try within 3 days.",
  );
  const [weatherData, setWeatherData] = useState<any>();
  const [startWeather, setStartWeather] = useState<any>();
  const [endWeather, setEndWeather] = useState<any>();

  useEffect(() => {
    const fetchWeatherData = async () => {
      await getForecast(props.latLng[0], props.latLng[1]).then((res) => {
        sortWeather(res);
      });
    };

    if (isPastSession(props.sessionEnd)) {
      setDataIsAvailable(false);
      setInfoMessage("Session is over");
    }

    if (props.dataAvailable && !isPastSession(props.sessionEnd)) {
      fetchWeatherData();
    }
  }, []);

  async function sortWeather(res: any) {
    let forecast_day: any;

    forecast_day = await res.data.forecast.forecastday.find((day) => {
      if (day.date == format(props.sessionStart, "yyyy-MM-dd")) {
        return day;
      }
    });

    let forecast_startHour: any = await forecast_day?.hour.find((hour) => {
      if (
        format(new Date(hour.time), "HH") == format(props.sessionStart, "HH")
      ) {
        return hour;
      }
    });

    let forecast_endHour: any = await forecast_day?.hour.find((hour) => {
      if (format(new Date(hour.time), "HH") == format(props.sessionEnd, "HH")) {
        return hour;
      }
    });

    if (isLiveSession(props.sessionStart, props.sessionName == "Race")) {
      setStartWeather(res.data.current);
    } else {
      setStartWeather(forecast_startHour);
    }
    setEndWeather(forecast_endHour);
  }

  return (
    <>
      {" "}
      {dataIsAvailable ? (
        <div className="flex flex-1 justify-center">
          <div className="basis-1/2 w-max bg-green-400 bg-opacity-50 flex gap-4 my-auto justify-center border-neutral-400 border-r-2">
            <Tooltip
              content={`${startWeather?.condition.text}${
                !isLiveSession(props.sessionStart, props.sessionName == "Race")
                  ? `, Chance of Rain: ${startWeather?.chance_of_rain}%`
                  : " - Live weather"
              }`}
              id="default"
            >
              <img
                src={startWeather?.condition.icon}
                className="inline-block h-10"
              />
            </Tooltip>
            <Tooltip
              content={`Wind Speed: ${startWeather?.wind_kph}KMH - Wind Direction: ${startWeather?.wind_dir}`}
              id="wind"
            >
              <GiWindsock
                className={`${iconClasses} fill-red-700`}
                size={"20"}
              ></GiWindsock>
            </Tooltip>
            <Tooltip
              content={`Percipitation: ${startWeather?.precip_mm}`}
              id="percip"
            >
              <IoWaterSharp
                className={`${iconClasses} fill-cyan-500`}
                size={"20"}
              ></IoWaterSharp>
            </Tooltip>
          </div>
          <div className="basis-1/2 w-max bg-red-400 bg-opacity-50 flex gap-4 my-auto justify-center border-neutral-400 border-l-2">
            <Tooltip
              content={`${endWeather?.condition.text}, Chance of Rain: ${endWeather?.chance_of_rain}%`}
              id="default"
            >
              <img
                src={endWeather?.condition.icon}
                className="inline-block h-10"
              />
            </Tooltip>
            <Tooltip
              content={`Wind Speed: ${endWeather?.wind_kph}KMH - Wind Direction: ${endWeather?.wind_dir}`}
              id="wind"
            >
              <GiWindsock
                className={`${iconClasses} fill-red-700`}
                size={"20"}
              ></GiWindsock>
            </Tooltip>
            <Tooltip
              content={`Percipitation: ${endWeather?.precip_mm}`}
              id="percip"
            >
              <IoWaterSharp
                className={`${iconClasses} fill-cyan-500`}
                size={"20"}
              ></IoWaterSharp>
            </Tooltip>
          </div>
        </div>
      ) : (
        <p className="py-2 px-2 text-neutral-400 bg-amber-300 bg-opacity-50 w-full text-center">
          {infoMessage}
        </p>
      )}
    </>
  );
};
