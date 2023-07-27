'use client'
import {useEffect, useState} from "react";
import { isLiveSession } from "@/app/utils/countdownUtil";
import { format, add } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz'

interface Props {
    name: string,
    weekend_date: string,
    country: string,
    latLng: [number, number],
    sessions: {sessionName: string, date: Date}[],
    trackImg: string
}



export const TrackItem = (props: Props) => {
    const displayDate = new Date(props.weekend_date)
    const [open, setOpen] = useState(false)
    const handleOpen = () => {
        open ? setOpen(false) : setOpen(true)
    }

    // useEffect({
    //     if(open) {
    //         if()
    //     }
    // }, [open])



    const mockdate = new Date(`2023-07-27 0:0:00Z`)
    const liveSpan = <span className='float-right'>🟢 Live</span>

    function liveDuration(sessionName: string, sessionDate: Date) {
        if(sessionName == 'Race') {
            return isLiveSession(sessionDate, true) ? liveSpan : "";
        } else {
            return isLiveSession(sessionDate, false) ? liveSpan : '';
        }
    }

    function formatDate(date: Date, race: boolean) {
        const startDate = format(date, 'HH:mm')
        const endDate = format(add(date, {hours: 1}), 'HH:mm')


        return <span className='text-xs bg-neutral-900 rounded-full text-white opacity-50 p-1 px-2 m-2 tracking-widest'>{format(date, 'E')} {startDate} {race ? '' : `- ${endDate}`}</span>
    }
    function renderSessions(sessions: {sessionName: string, date: Date }[]) {
        let paragraphs = [];
        sessions.map((session) => {
            paragraphs.push(<p className='border-b-2 border-neutral-900 p-2'><b className='text-[16px]'>{session.sessionName}</b>{formatDate(session.date, session.sessionName == 'Race')} {liveDuration(session.sessionName, session.date)}   </p>)
        })
        return paragraphs;
    }

    // function renderRadar(weekendDate: Date) {
    //
    //     if(weekendDate)
    // }



    return (
        <li className={`${open ? 'bg-neutral-100 border-x-0 border-y-4' : 'text-white hover:bg-neutral-100 border-y-4 border-x-4 hover:text-black rounded-xl bg-red-700'} transition-all duration-200 ease-in p-3 border-red-700 shadow-md shadow-red-950`} onClick={handleOpen}>
            <p className='text-start text-3xl pl-5 font-bold'>{props.name}</p>
            <p className={`text-start pl-5 tracking-widest`}>{format(props.sessions[0].date, 'dd MMM yyyy')} ― {format(displayDate, 'dd MMM yyyy')}</p>
            <div className={`accordion-container mt-3 pl-5 pr-5 ${open ? 'open' : ''}`}>
                <div className='accordion-item'>
                    <div className='border-neutral-900 border-2 flex'>
                        <div className='w-2/3 '>
                            <h1 className='text-xl p-3 border-b-2 border-neutral-900 bg-red-700 text-white font-light tracking-wider'>Sessions:</h1>
                            {renderSessions(props.sessions)}
                            <p className='pl-2'><b>Track Layout:</b></p>
                                <img src={props.trackImg} className='mx-auto'/>
                        </div>
                        <div className='w-full'>
                            <h1 className='text-xl p-3 border-l-2 border-neutral-900 bg-red-700 text-white font-light tracking-wider'>Weather Radar:</h1>
                            <iframe className='border-neutral-900 border-t-2 border-l-2 bg-white' width="100%" height="500px" src={open ? `https://embed.windy.com/embed2.html?lat=${props.latLng[0]}&lon=${props.latLng[1]}&detailLat=${props.latLng[0]}&detailLon=${props.latLng[1]}&width=500&height=500&zoom=9&level=surface&overlay=rain&product=ecmwf&menu=&message=&marker=&calendar=now&pressure=&type=map&location=coordinates&detail=true&metricWind=default&metricTemp=default&radarRange=-1` : 'about:blank'} name="myIframe" id="myIframe"></iframe>
                        </div>
                    </div>

                </div>
            </div>
        </li>
    );
};
