const axios = require('axios');

const API_KEY = process.env.GOOGLE_MAPS_API_KEY;

async function getCoordinatesForAddress(address) {
    console.log("address is = ", address);
    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${API_KEY}`);
    const data = response.data;

    if (!data || data.status === 'ZERO_RESULTS') {
        const error = new Error('Could not find location for the specified address.');
        error.code = 422;
        throw error;
    }

    console.log("data is = ", data);
    const coordinates = data.results[0].geometry.location;

    return coordinates;
}

module.exports = getCoordinatesForAddress;