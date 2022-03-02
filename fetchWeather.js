apiKey= "6aab536680d25358aa622219c8452f38"

const cityName = "los angeles"
const stateCode = "US-CA"
const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${stateCode}&appid=${apiKey}`
// const weatherUrl = `api.openweathermap.org/data/2.5/weather?q=${cityName},${stateCode}&appid=${apiKey}`


async function getWeather(url) {
    const response = await fetch(url)
    const data = await response.json()
console.log(data)
}

getWeather(geoUrl)