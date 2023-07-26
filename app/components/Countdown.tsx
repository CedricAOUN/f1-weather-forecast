'use client'
import {useEffect, useState} from "react";
import {closestSession, nextSessionDate} from "@/app/utils/countdownUtil";
import loadingGif from '../../public/loading.gif'



interface Props {
    races: []
}

export const Countdown = (props: Props) => {
    nextSessionDate(props.races)
    const [loading, setLoading] = useState(true);
    const [target, setTarget] = useState(closestSession);
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    useEffect(()=> {
        const interval = setInterval( () => {
            setLoading(false)
            const now = new Date();
            const difference = target.getTime() - now.getTime();

            const d = Math.floor(difference / (1000 * 60 * 60 * 24))
            setDays(d)

            const h = Math.floor((difference % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)))
            setHours(h)

            const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            setMinutes(m);

            const s = Math.floor((difference % (1000 * 60)) / 1000);
            setSeconds(s);

            if(d <= 0 && h <= 0 && m <= 0 && s <= 0) {
                setLoading(true)
                clearInterval(interval);
                nextSessionDate(props.races);
                setTarget(closestSession);
            }

        }, 1000)

        return () => clearInterval(interval)
    }, [target])

    return (
        <>
            { loading ? <img className='object-center' src={loadingGif.src} height='30px' width='30px'></img> : <p>{days} Days, {hours} Hours, {minutes} Minutes, {seconds} Seconds</p> }
        </>
    );
};

