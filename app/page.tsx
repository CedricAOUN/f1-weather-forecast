"use client";
import { TrackList } from "@/app/components/TrackList";
import { addTrackImgs, getTracks } from "@/app/utils/tracksAPI";
import { Countdown } from "@/app/components/Countdown";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { currentGP } from "@/app/utils/countdownUtil";
import Script from "next/script";

export default function Home() {
  const [races, setRaces] = useState<any>(null);
  const [apiError, setApiError] = useState<boolean>(false);

  useEffect(() => {
    async function getRaces() {
      const response = await getTracks();
      if (response == null) {
        setApiError(true);
      } else {
        let races = await response.data.MRData.RaceTable.Races;
        await addTrackImgs(races);
        setRaces(races);
      }
    }

    getRaces();
  }, []);

  if (races === null) {
    return (
      <>
        {
          <div className="flex justify-center items-center h-screen w-screen">
            {apiError ? (
              <p className="text-center py-auto text-red-700">
                {" "}
                There seems to be an error retrieving data from the API. Please
                try again later...
              </p>
            ) : (
              <p className="text-center py-auto text-red-700">
                {" "}
                <span>
                  <AiOutlineLoading3Quarters
                    className="animate-spin mx-auto"
                    size={32}
                    color={"red"}
                  ></AiOutlineLoading3Quarters>
                </span>
                Loading...
              </p>
            )}
          </div>
        }
      </>
    );
  }

  return (
    <>
      <header>
        <h1
          className={`text-center italic p-6 bg-neutral-900 text-neutral-100 drop-shadow-md font-bold border-b-2 border-white text-4xl 
          bg-gradient-to-br from-red-800 from-60% to-neutral-300 opacity-90`}
        >
          Formula 1 - Weather Forecast
        </h1>
      </header>
      <div className="flex h-10 justify-center flex-col items-center m-2">
        <h1 className="pt-16 pb-5 text-white">Time Until Next Session:</h1>
        <div className="box-border border-amber-300 bg-opacity-40 bg-black p-3 text-white">
          <Countdown races={races}></Countdown>
        </div>
      </div>

      <div className="container p-4 lg:px-24 max-w-full min-h-[85vh]">
        <h1 className="text-white py-16 text-start text-5xl outline-1 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
          Remaining Races:
        </h1>
        <TrackList races={races}></TrackList>
      </div>
      <div className="container">
        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GTAG_KEY}`}
        ></Script>
        <Script id={"google-analytics"}>
          {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${process.env.NEXT_PUBLIC_GTAG_KEY}');`}
        </Script>
      </div>
    </>
  );
}
