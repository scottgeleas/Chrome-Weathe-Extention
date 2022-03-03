const apiKey = '6aab536680d25358aa622219c8452f38';
const form = document.querySelector('form');
const cityInput = document.getElementById('city-input');
const stateInput = document.getElementById('state-input');
const city = document.getElementById('city');
const iconEl = document.querySelector('img');
const descriptionEl = document.getElementById('description');
const tempEl = document.getElementById('temp');
const maxEl = document.getElementById('max-temp');
const minEl = document.getElementById('min-temp');
const windEl = document.getElementById('wind');

// getCoords takes in the geocode URL from OpenWeatherAPI and returns the latitude and longitude of the given city and state
async function getCoords(url) {
    try {
        const response = await fetch(url);
        const location = await response.json();
        city.textContent = `Current Weather for ${location[0].name}`;
        const lat = location[0].lat;
        const lon = location[0].lon;
        const coords = {
            lat,
            lon,
        };
        return coords;
    } catch (err) {
        console.log(err);
    }
}
// getWeather takes in the current weather URL from OpenWeatherAPI and returns an object with weather data
async function getWeather(url) {
    try {
        const response = await fetch(url);
        const weather = await response.json();
        return weather;
    } catch (err) {
        console.log(err);
    }
}
const getStateCode = (state) => {
    return stateCodes[state];
};

//capitalize turns the first letter of each word to uppercase and returns the newly formatted string
function capitalize(description) {
    const words = description.split(' ');
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }

    return words.join(' ');
}

async function renderWeather(e) {
    e.preventDefault();
    try {
        const cityName = cityInput.value.toLowerCase().trim();
        // state turns whatever they typed in into a string with no uppercase and no spaces
        const state = stateInput.value.toLowerCase().trim().split(' ').join('');
        const stateCode = getStateCode(state);

        const geocodeUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${stateCode},US&appid=${apiKey}`;
        const coords = await getCoords(geocodeUrl);
        const lat = coords.lat;
        const lon = coords.lon;

        const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
        const weather = await getWeather(weatherUrl);

        //picking info off of the weather object and adding that text to the html
        iconEl.setAttribute(
            'src',
            `http://openweathermap.org/img/w/${weather.weather[0].icon}.png`
        );
        descriptionEl.textContent = capitalize(weather.weather[0].description);
        tempEl.textContent = `Current Temperature: ${weather.main.temp}°F`;
        minEl.textContent = `Low: ${weather.main.temp_min}°F`;
        maxEl.textContent = `High: ${weather.main.temp_max}°F`;
        windEl.textContent = `Wind Speed: ${weather.wind.speed}mph`;
        
    } catch (err) {
        console.log(err);
    }
}

form.addEventListener('submit', renderWeather);
