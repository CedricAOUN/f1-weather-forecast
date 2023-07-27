const axios = require('axios');
const {add} = require('date-fns')


export const getForecast = async (lat: number, lng: number) => {
    return await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=0b05563f86484ee097a191105232607&q=${lat},${lng}&days=3&aqi=yes&alerts=no`)
}


export function sessionIsNear(date: Date) {
    const today = new Date()
}