const apiKey = '6aab536680d25358aa622219c8452f38';
// getCoords takes in the geocode URL from OpenWeatherAPI and returns the latitude and longitude of the given city and state
async function getCoords(url) {
    const response = await fetch(url);
    const location = await response.json();
    const lat = location[0].lat;
    const lon = location[0].lon;
    const coords = {
        lat,
        lon,
    };
    return coords;
}
// getWeather takes in the current weather URL from OpenWeatherAPI and returns an object with weather data
async function getWeather(url) {
    const response = await fetch(url);
    const weather = await response.json();
    return weather;
}

async function renderWeather() {
    const cityName = 'boston';
    const stateCode = 'US-MA';
    const geocodeUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${stateCode}&appid=${apiKey}`;
    const coords = await getCoords(geocodeUrl);
    const lat = coords.lat;
    const lon = coords.lon;
    const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    const weather = await getWeather(weatherUrl);
    console.log(weather, coords);
}

renderWeather();
