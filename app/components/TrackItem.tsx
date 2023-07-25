'use client'
import {useState} from "react";

interface Props {
    name: string,
    weekend_date: string,
    country: string,
    latLng: [number, number],
}



export const TrackItem = (props: Props) => {
    const [open, setOpen] = useState(false)
    const handleOpen = () => {
        open ? setOpen(false) : setOpen(true)
    }

    return (
        <li className='bg-gray-600 hover:bg-gray-800 border-r-2 border-b-2 border-t-2 p-3 rounded-r-lg border-red-700 ' onClick={handleOpen}>
            <p>{props.name} - {props.country} - {props.weekend_date}</p>
            <div className={`accordion-container ${open ? 'open' : ''}`}>
                <div>
                    <iframe width="50%" height="500px" src={open ? `https://openweathermap.org/weathermap?basemap=map&cities=false&layer=radar&lat=${props.latLng[0]}&lon=${props.latLng[1]}&zoom=10` : 'about:blank'} name="myIframe" id="myIframe"></iframe>
                </div>
            </div>
        </li>
    );
};