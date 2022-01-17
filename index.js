let temperatureButtonC = document.querySelector("#btnradio1")
let temperatureButtonF = document.querySelector("#btnradio2")

let now = new Date()
let date = now.getDate()
let hours = now.getHours()
let minutes = now.getMinutes()
let year = now.getFullYear()
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
let day = days[now.getDay()]

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

    let h1 = document.querySelector("#weather")
    h1.innerHTML = `Today in ${city} ${day} ${date} ${hours}:${minutes} ${month} ${year} `

    let span = document.querySelector("#temperatures")
    if (temperatureButtonC.checked) {
        span.innerHTML = `${temperature} °C`
    } else {
        span.innerHTML = `${temperature} °F`
    }
}

function updateWeather(city) {
    let units = "metric";
    if (temperatureButtonF.checked) {
        units="imperial"
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
        units="imperial"
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



