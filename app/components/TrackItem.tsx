import {getTracks} from "@/app/utils/tracksAPI";

interface Props {
    name: string,
    weekend_date: string,
    country: string,
}



export const TrackItem = async (props: Props) => {
    const Tracks = await getTracks();

    return (
        <li className='bg-gray-600 hover:bg-gray-800 border-r-2 border-b-2 border-t-2 p-3 rounded-r-lg border-red-700 '>
            <p>{props.name} - {props.country} - {props.weekend_date}</p>
        </li>
    );
};