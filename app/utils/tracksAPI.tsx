const axios = require('axios');


export const getTracks = async () => {
    return await axios.get('https://ergast.com/api/f1/current.json')

}
