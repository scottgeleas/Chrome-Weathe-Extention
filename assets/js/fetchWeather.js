const apiKey = '6aab536680d25358aa622219c8452f38';
const form = document.querySelector('form');
const cityInput = document.getElementById('city-input');
const stateInput = document.getElementById('state-input');
const iconEl = document.querySelector('img');
const tempEl = document.getElementById('temp');
const descriptionEl = document.getElementById('description');
const humidityEl = document.getElementById('humidity');
const windEl = document.getElementById('wind');

// getCoords takes in the geocode URL from OpenWeatherAPI and returns the latitude and longitude of the given city and state
async function getCoords(url) {
    const response = await fetch(url);
    const location = await response.json();
    // console.log(location);
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

const stateCodes = {
    alaska: 'US-AK',
    alabama: 'US-AL',
    arkansas: 'US-AR',
    arizona: 'US-AZ',
    california: 'US-CA',
    colorado: 'US-CO',
    connecticut: 'US-CT',
    delaware: 'US-DE',
    florida: 'US-FL',
    georgia: 'US-GA',
    hawaii: 'US-HI',
    iowa: 'US-IA',
    idaho: 'US-ID',
    illinois: 'US-IL',
    indiana: 'US-IN',
    kansas: 'US-KS',
    kentucky: 'US-KY',
    louisiana: 'US-LA',
    massachusetts: 'US-MA',
    maryland: 'US-MD',
    maine: 'US-ME',
    michigan: 'US-MI',
    minnesota: 'US-MN',
    missouri: 'US-MO',
    mississippi: 'US-MS',
    montana: 'US-MT',
    northcarolina: 'US-NC',
    northdakota: 'US-ND',
    nebraska: 'US-NE',
    newhampshire: 'US-NH',
    newjersey: 'US-NJ',
    newmexico: 'US-NM',
    nevada: 'US-NV',
    newyork: 'US-NY',
    ohio: 'US-OH',
    oklahoma: 'US-OK',
    oregon: 'US-OR',
    pennsylvania: 'US-PA',
    rhodeisland: 'US-RI',
    southcarolina: 'US-SC',
    southdakota: 'US-SD',
    tennessee: 'US-TN',
    texas: 'US-TX',
    utah: 'US-UT',
    virginia: 'US-VA',
    vermont: 'US-VT',
    washington: 'US-WA',
    wisconsin: 'US-WI',
    westvirginia: 'US-WV',
    wyoming: 'US-WY',
};

const getStateCode = (state) => {
    return stateCodes[state];
};

async function renderWeather(e) {
    e.preventDefault();

    const cityName = cityInput.value.toLowerCase().trim();
    const state = stateInput.value.toLowerCase().trim().split(' ').join('');
    const stateCode = getStateCode(state)
    console.log(state, stateCode);
    const geocodeUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${stateCode},US&appid=${apiKey}`;
    const coords = await getCoords(geocodeUrl);
    const lat = coords.lat;
    const lon = coords.lon;
    const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
    const weather = await getWeather(weatherUrl);
    // console.log(weather);
    descriptionEl.textContent = weather.weather[0].main;
    tempEl.textContent = `Current Temperature: ${weather.main.temp}°F`;
    humidityEl.textContent = `Humidity: ${weather.main.humidity}%`;
    windEl.textContent = `Wind Speed: ${weather.wind.speed}mph`;
    // iconEl.setAttribute('src', weather.weather[0].icon)
}

form.addEventListener('submit', renderWeather);
