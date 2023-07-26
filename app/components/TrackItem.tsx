'use client'
import {useState} from "react";
import { isLiveSession} from "@/app/utils/countdownUtil";

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



    const mockdate = new Date(`2023-07-26 19:50:00Z`)
    const liveSpan = <span className='float-right'>🟢 Live</span>

    function liveDuration(sessionName: string, sessionDate: Date) {
        if(sessionName == 'Race') {
            return isLiveSession(sessionDate, true) ? liveSpan : "";
        } else {
            return isLiveSession(sessionDate, false) ? liveSpan : '';
        }
    }

    function formatDate(date: Date, race: boolean) {
        const startDate = `${date.getHours()}:${date.getMinutes() == 0 ? `00`: date.getMinutes()}`
        const endDate = `${date.getHours() + 1}:${date.getMinutes() == 0 ? '00': date.getMinutes()}`


        return <span className='text-xs bg-neutral-900 rounded-full text-white opacity-50 p-1 px-2 m-2'>{}{startDate} {race ? '' : `- ${endDate}`}</span>
    }
    function renderSessions(sessions: {sessionName: string, date: Date }[]) {
        let paragraphs = [];
        sessions.map((session) => {
            paragraphs.push(<p className='border-b-2 border-neutral-900 p-2'><b>{session.sessionName}</b>{formatDate(session.date, session.sessionName == 'Race')} {liveDuration(session.sessionName, session.date)}   </p>)
        })
        return paragraphs;
    }



    return (
        <li className={`${open ? 'bg-white' : 'text-white hover:bg-white hover:text-black'} bg-red-700 transition-colors duration-200 ease-in border-r-4 border-y-4 p-3 rounded-r-lg border-red-700 shadow-md shadow-red-950`} onClick={handleOpen}>
            <p className='text-start text-2xl pl-5'>{props.name}</p>
            <p className='text-start text-xs pl-5'>{`${props.sessions[0].date.toDateString().substring(8, 11)}${props.sessions[0].date.toDateString().substring(4, 7)} ${props.sessions[0].date.toDateString().substring(11)} - ${displayDate.toDateString().substring(8, 11)}${displayDate.toDateString().substring(4, 7)} ${displayDate.toDateString().substring(11)}`}</p>
            <div className={`accordion-container mt-3 pl-5 pr-5 ${open ? 'open' : ''}`}>
                <div className='accordion-item'>
                    <div className='border-neutral-900 border-4 rounded-lg flex'>
                        <div className='w-2/3 '>
                            <h1 className='text-xl pl-4 border-b-4 border-neutral-900 bg-red-700 text-white'>Sessions:</h1>
                            {renderSessions(props.sessions)}
                            <p className='pl-2'><b>Track Layout:</b></p>
                                <img src={props.trackImg} className='mx-auto'/>
                        </div>
                        <div className='w-full'>
                            <h1 className='text-xl pl-4 border-l-4 border-neutral-900 bg-red-700 text-white'>Weather Radar:</h1>
                            <iframe className='border-neutral-900 border-t-4 border-l-4 bg-white' width="100%" height="500px" src={open ? `https://openweathermap.org/weathermap?basemap=map&cities=false&layer=radar&lat=${props.latLng[0]}&lon=${props.latLng[1]}&zoom=10` : 'about:blank'} name="myIframe" id="myIframe"></iframe>
                        </div>
                    </div>

                </div>
            </div>
        </li>
    );
};