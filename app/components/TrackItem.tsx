'use client'
import {useState} from "react";

interface Props {
    name: string,
    weekend_date: string,
    country: string,
    latLng: [number, number],
    isSprint: boolean,
    isLive: boolean,
}



export const TrackItem = (props: Props) => {
    const displayDate = new Date(props.weekend_date)
    const [open, setOpen] = useState(false)
    const handleOpen = () => {
        open ? setOpen(false) : setOpen(true)
    }
    `${displayDate.getDate()}/${displayDate.getUTCMonth() + 1}`
    return (
        <li className={`${open ? 'bg-red-900 hover:bg-red-800' : 'bg-gray-600 hover:bg-gray-800'} transition-colors duration-500 ease-in border-r-2 border-y-2 p-3 rounded-r-lg border-red-700 shadow-md shadow-red-950`} onClick={handleOpen}>
            <p className='text-start text-2xl pl-5'>{props.name} - {`${displayDate.toDateString()}`}<span className='float-right pr-5'>{props.isLive ? '🟢 Live' : ''}</span></p>
            <div className={`accordion-container mt-3 pl-5 pr-5 ${open ? 'open' : ''}`}>
                <div className='accordion-item'>
                    <div className='border-white border-4 rounded-lg'>
                        <p className='border-b-2 border-white p-2'>First Practice: {}</p>
                        <p className='border-b-2 border-white p-2'>{props.isSprint ? 'Qualifying:' : 'Second Practice:'}</p>
                        <p className='border-b-2 border-white p-2'>{props.isSprint ? 'Sprint Shootout:' : "Third Practice:"}</p>
                        <p className='border-b-2 border-white p-2'>{props.isSprint ? 'Sprint:' : "Qualifying:"}</p>
                        <p className='p-2'>Race: {}</p>
                    </div>
                    <h1 className='text-xl mt-10'>Weather Radar:</h1>
                    <iframe className='p-3 border-cyan-500 border-2 bg-white rounded-lg' width="100%" height="720px" src={open ? `https://openweathermap.org/weathermap?basemap=map&cities=false&layer=radar&lat=${props.latLng[0]}&lon=${props.latLng[1]}&zoom=10` : 'about:blank'} name="myIframe" id="myIframe"></iframe>
                </div>
            </div>
        </li>
    );
};