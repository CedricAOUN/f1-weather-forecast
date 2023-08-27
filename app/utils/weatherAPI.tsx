import { differenceInMilliseconds } from "date-fns";

const axios = require("axios");
const { sub } = require("date-fns");

export const getForecast = async (lat: number, lng: number) => {
  let key = process.env.NEXT_PUBLIC_WEATHER_KEY;
  return await axios
    .get(
      `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${lat},${lng}&days=3&aqi=yes&alerts=no`,
    )
    .catch((e) => {
      console.error(e);
      return null;
    });
};

export function sessionIsNear(date: Date) {
  const today = new Date();
  const fiveDaysAgo = sub(today, { days: 2 });
  const difference = today.getTime() - fiveDaysAgo.getTime();

  return date.getTime() - difference < today.getTime();
}
