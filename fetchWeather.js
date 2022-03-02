const apiKey = '6aab536680d25358aa622219c8452f38';
// const weatherUrl = `api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
async function getCoords(url) {
    const response = await fetch(url);
    const data = await response.json();
    const location = data[0];
    const lat = location.lat;
    const lon = location.lon;
    // console.log(lat, lon);
    return {
        lat,
        lon,
    };
}

async function returnWeather() {
    const cityName = 'los angeles';
    const stateCode = 'US-CA';
    const geocodeUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${stateCode}&appid=${apiKey}`;
    const coords = await getCoords(geocodeUrl);
    console.log(coords);
}

returnWeather();
