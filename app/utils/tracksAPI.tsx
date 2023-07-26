const axios = require('axios');
import trackImgs from '../../public/tracks.json';


export const getTracks = async () => {
    return await axios.get('https://ergast.com/api/f1/current.json')
}


export function addTrackImgs(tracks: any[]) {
    tracks.map((track) => {
        trackImgs.tracks.find((trackImg) => {
            if(trackImg.location.city == track.Circuit.Location.locality) {
                return track.track_img = trackImg.image;
            }
        })
    })
}