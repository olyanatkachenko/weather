/*
let weather = {
    paris: {
        temp: 19.7,
        humidity: 80
    },
    tokyo: {
        temp: 17.3,
        humidity: 50
    },
    lisbon: {
        temp: 30.2,
        humidity: 20
    },
    "san francisco": {
        temp: 20.9,
        humidity: 100
    },
    moscow: {
        temp: -5,
        humidity: 20
    }
};

let city = prompt("Enter a city");
city = city.toLowerCase();
if (weather[city] !== undefined) {
    let temp = weather[city].temp;
    let degree = Math.round(temp);
    let humidity = weather[city].humidity;
    let fahrenheit = Math.round((temp * 9) / 5 + 32);

    alert(
        `It is currently ${degree}°C (${fahrenheit}°F) in ${city} with a humidity of ${humidity}%`
    );
} else {
    alert(
        `Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${city}`
    );
}
*/
let temperature = 17
let fahrenheitTemp = Math.round((temperature * 9) / 5 + 32);

let temperatureButtonC = document.querySelector("#btnradio1")
let temperatureButtonF = document.querySelector("#btnradio2")

temperatureButtonC.addEventListener("click", updateTemperature)
temperatureButtonF.addEventListener("click", updateTemperature)


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

function updateWeather(city) {
    let h1 = document.querySelector("#weather")
    h1.innerHTML = `Today in ${city} ${day} ${date} ${hours}:${minutes} ${month} ${year} `
    updateTemperature()
}

function updateTemperature() {
    let span = document.querySelector("#temperatures")
    if (temperatureButtonC.checked) {
        span.innerHTML = `${temperature} °C`
    } else {
        span.innerHTML = `${fahrenheitTemp} °F`
    }
}

let form = document.querySelector("#search-form")
form.addEventListener("submit", searchButtonChange)

updateWeather("Kyiv")


