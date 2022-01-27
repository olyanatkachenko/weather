let temperatureButtonC = document.querySelector("#btnradio1")
let temperatureButtonF = document.querySelector("#btnradio2")

let now = new Date()
let date = now.getDate()
let hours = now.getHours()
let minutes = now.getMinutes()
let year = now.getFullYear()
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
let day = days[now.getDay()]

let weatherIcons = {
    "01d": "<i class=\"fas fa-sun\"></i>",
    "02d": "<i class=\"fas fa-cloud-sun\"></i>",
    "03d": "<i class=\"fas fa-cloud\"></i>",
    "04d": "<i class=\"fas fa-cloud-meatball\"></i>",
    "09d": "<i class=\"fas fa-cloud-showers-heavy\"></i>",
    "10d": "<i class=\"fas fa-cloud-sun-rain\"></i>",
    "11d": "<i class=\"fas fa-bolt\"></i>",
    "13d": "<i class=\"far fa-snowflake\"></i>",
    "50d": "<i class=\"fas fa-smog\"></i>",
}

let months = ["January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"]
let month = months[now.getMonth()]

// Called on button click
function searchButtonChange(event) {
    event.preventDefault()
    let searchInput = document.querySelector("#search-field")

    updateWeather(searchInput.value)
}

function showTemperature(response) {
    console.log(response)
    let temperature = Math.round(response.data.main.temp);
    let city = response.data.name

    let iconName = response.data.weather[0].icon;
    iconName = iconName.replace("n", "d")

    let todayCitySpan = document.querySelector("#todayCity")
    todayCitySpan.innerHTML = `Today in ${city}`

    let dateSpan = document.querySelector("#date")
    dateSpan.innerHTML = `${day} ${hours}:${minutes}, ${date} ${month} ${year} `

    let iconImg = document.querySelector("#weatherIcon")
    iconImg.innerHTML = weatherIcons[iconName]

    let span = document.querySelector("#temperatures")
    span.innerHTML = `${temperature} ${units()}`
    showDetails(response)
}

function units() {
    if (temperatureButtonC.checked) {
        return "°C"
    } else {
        return "°F"
    }
}

function unitsSpeed() {
    if (temperatureButtonC.checked) {
        return "km/h"
    } else {
        return "mph"
    }
}

function showDetails(response) {
    let description = response.data.weather[0].description;
    let feels_like = response.data.main.feels_like;
    let humidity= response.data.main.humidity;
    let wind = response.data.wind.speed;
    let detailsP = document.querySelector("#generalInfo")
    detailsP.innerHTML = `Generally ${description}. Temps feel like ${feels_like} ${units()}. Wind speed is ${wind} ${unitsSpeed()}. ${humidity}% relative humidity.`
}


function updateWeather(city) {
    let units = "metric";
    if (temperatureButtonF.checked) {
        units = "imperial"
    }
    let apiKey = "268beb25749e6f290fbbc1676ed3c56a";
    let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
    let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=${units}`;

    axios.get(apiUrl).then(showTemperature);
}

function showPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let units = "metric";
    if (temperatureButtonF.checked) {
        units = "imperial"
    }
    let apiKey = "268beb25749e6f290fbbc1676ed3c56a";
    let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
    let apiUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

    axios.get(apiUrl).then(showTemperature);
}

function currentFormSubmit(event) {
    event.preventDefault()
    navigator.geolocation.getCurrentPosition(showPosition);
}

let formCurrent = document.querySelector("#current-form")
formCurrent.addEventListener("submit", currentFormSubmit)

let formSearch = document.querySelector("#search-form")
formSearch.addEventListener("submit", searchButtonChange)

updateWeather("Kyiv")



