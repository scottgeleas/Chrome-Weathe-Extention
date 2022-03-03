const apiKey = '6aab536680d25358aa622219c8452f38';
const form = document.querySelector('form');
const cityInput = document.getElementById('city-input');
const stateInput = document.getElementById('state-input');

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

async function renderWeather(e) {
    e.preventDefault();
    
    const cityName = cityInput.value.toLowerCase().trim();
    const state = stateInput.value.toLowerCase().trim();
    console.log(cityName, state);
    let stateCode = ''

    switch (state) {
        case 'alaska':
            stateCode = 'US-AK';
            break;
        case 'alabama':
            stateCode = 'US-AL';
            break;
        case 'arkansas':
            stateCode = 'US-AR';
            break;
        case 'arizona':
            stateCode = 'US-AZ';
            break;
        case 'california':
            stateCode = 'US-CA';
            break;
        case 'colorado':
            stateCode = 'US-CO';
            break;
        case 'connecticut':
            stateCode = 'US-CT';
            break;
        case 'delaware':
            stateCode = 'US-DE';
            break;
        case 'florida':
            stateCode = 'US-FL';
            break;
        case 'georgia':
            stateCode = 'US-GA';
            break;
        case 'hawaii':
            stateCode = 'US-HI';
            break;
        case 'iowa':
            stateCode = 'US-IA';
            break;
        case 'idaho':
            stateCode = 'US-ID';
            break;
        case 'illinois':
            stateCode = 'US-IL';
            break;
        case 'indiana':
            stateCode = 'US-IN';
            break;
        case 'kansas':
            stateCode = 'US-KS';
            break;
        case 'kentucky':
            stateCode = 'US-KY';
            break;
        case 'louisiana':
            stateCode = 'US-LA';
            break;
        case 'massachusetts':
            stateCode = 'US-MA';
            break;
        case 'maryland':
            stateCode = 'US-MD';
            break;
        case 'maine':
            stateCode = 'US-ME';
            break;
        case 'michigan':
            stateCode = 'US-MI';
            break;
        case 'minnesota':
            stateCode = 'US-MN';
            break;
        case 'missouri':
            stateCode = 'US-MO';
            break;
        case 'mississippi':
            stateCode = 'US-MS';
            break;
        case 'montana':
            stateCode = 'US-MT';
            break;
        case 'north carolina':
            stateCode = 'US-NC';
            break;
        case 'north dakota':
            stateCode = 'US-ND';
            break;
        case 'nebraska':
            stateCode = 'US-NE';
            break;
        case 'new hampshire':
            stateCode = 'US-NH';
            break;
        case 'new jersey':
            stateCode = 'US-NJ';
            break;
        case 'new mexico':
            stateCode = 'US-NM';
            break;
        case 'nevada':
            stateCode = 'US-NV';
            break;
        case 'new york':
            stateCode = 'US-NY';
            break;
        case 'ohio':
            stateCode = 'US-OH';
            break;
        case 'oklahoma':
            stateCode = 'US-OK';
            break;
        case 'oregon':
            stateCode = 'US-OR';
            break;
        case 'pennsylvania':
            stateCode = 'US-PA';
            break;
        case 'rhode island':
            stateCode = 'US-RI';
            break;
        case 'south carolina':
            stateCode = 'US-SC';
            break;
        case 'south dakota':
            stateCode = 'US-SD';
            break;
        case 'tennessee':
            stateCode = 'US-TN';
            break;
        case 'texas':
            stateCode = 'US-TX';
            break;
        case 'utah':
            stateCode = 'US-UT';
            break;
        case 'virginia':
            stateCode = 'US-VA';
            break;
        case 'vermont':
            stateCode = 'US-VT';
            break;
        case 'washington':
            stateCode = 'US-WA';
            break;
        case 'wisconsin':
            stateCode = 'US-WI';
            break;
        case 'west virginia':
            stateCode = 'US-WV';
            break;
        case 'wyoming':
            stateCode = 'US-WY';
            break;
    }


    const geocodeUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${stateCode}&appid=${apiKey}`;
    const coords = await getCoords(geocodeUrl);
    const lat = coords.lat;
    const lon = coords.lon;
    const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    const weather = await getWeather(weatherUrl);
    console.log(weather, coords);
}

form.addEventListener('submit', renderWeather);
