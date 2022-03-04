const apiKey = '6aab536680d25358aa622219c8452f38';
const form = document.querySelector('form');
const cityInput = document.getElementById('city-input');
const stateInput = document.getElementById('state-input');
const informationEl = document.getElementById('information');
const errorEl = document.getElementById('error');
const city = document.getElementById('city');
const iconEl = document.getElementById('icon');
const descriptionEl = document.getElementById('description');
const tempEl = document.getElementById('temp');
const humidityEl = document.getElementById('humidity');
const windEl = document.getElementById('wind');
const feelsEl = document.getElementById('feels-like');

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

// capitalize turns the first letter of each word to uppercase and returns the newly formatted string
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
        // hide previous search information if searching again
        informationEl.setAttribute('class', 'hide');

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

        // if user's search fails and they try again this clears the errorEl before showing information
        errorEl.textContent = '';
        // if successful clear inputs and show the information section
        cityInput.value = '';
        stateInput.value = '';
        informationEl.removeAttribute('class');

        iconEl.setAttribute(
            'src',
            `http://openweathermap.org/img/w/${weather.weather[0].icon}.png`
        );
        // sets the alt attribute to the description of weather
        iconEl.setAttribute('alt', weather.weather[0].description);

        // humidity data seems inaccurate for my location but is accurate for other locations, humidity is more useful to add then min/max temp
        descriptionEl.textContent = capitalize(weather.weather[0].description);
        tempEl.textContent = `Current Temperature: ${Math.round(weather.main.temp)}°F`;
        humidityEl.textContent = `Humidity: ${weather.main.humidity}%`;
        windEl.textContent = `Wind Speed: ${Math.round(weather.wind.speed)}mph`;
        feelsEl.textContent = `Feels Like: ${Math.round(weather.main.feels_like)}°F`;
    } catch (err) {
        console.log(err);
        errorEl.innerHTML =
            'Unable to find that city.<br />Please check spelling and try again.';
        errorEl.removeAttribute('class');
    }
}

form.addEventListener('submit', renderWeather);
