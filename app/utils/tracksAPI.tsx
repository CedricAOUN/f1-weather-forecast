const axios = require("axios");
import trackImgs from "../../public/tracks.json";

export const getTracks = async () => {
  return await axios.get("https://ergast.com/api/f1/current.json");
};

export const getLastTrack = async () => {
  return await axios.get("http://ergast.com/api/f1/current/last.json");
};

export const getNextTrack = async () => {
  return await axios.get("http://ergast.com/api/f1/current/next.json");
};

export function addTrackImgs(tracks: any[]) {
  tracks.map((track) => {
    trackImgs.tracks.find((trackImg) => {
      if (trackImg.location.city == track.Circuit.Location.locality) {
        return (track.track_img = trackImg.image);
      }
    });
  });
}
