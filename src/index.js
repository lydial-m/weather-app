//show Date & Time

function showDate(date) {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let currentDay = days[date.getDay()];
  let currentMonth = months[date.getMonth()];
  let currentDate = date.getDate();

  let todaysDate = `${currentDay}, ${currentMonth} ${currentDate}`;
  return todaysDate;
}

function showTime(date) {
  let currentHour = date.getHours();
  let currentMinutes = ("0" + date.getMinutes()).slice(-2);

  let locationButton = document.querySelector("#current-location");
  let weatherContainer = document.querySelector("#weather-container");
  if (currentHour >= 6 && currentHour < 18) {
    weatherContainer.classList.add("weather-container-day");
    locationButton.classList.add("location-button-day");
  } else {
    weatherContainer.classList.add("weather-container-night");
    locationButton.classList.add("location-button-night");
  }

  let todaysTime = `${currentHour}:${currentMinutes}`;
  return todaysTime;
}

//Icons
function showIcon(id) {
  if (id >= 200 && id <= 232) {
    return "fa-solid fa-cloud-bolt";
  } else if ((id >= 300 && id <= 321) || (id >= 520 && id <= 531)) {
    return "fa-solid fa-cloud-rain";
  } else if (id >= 500 && id <= 504) {
    return "fa-solid fa-cloud-sun-rain";
  } else if (id === 511 || (id >= 600 && id <= 622)) {
    return "fa-regular fa-snowflake";
  } else if (id >= 701 && id <= 781) {
    return "fa-solid fa-smog";
  } else if (id === 800) {
    return "fa-solid fa-sun";
  } else if (id >= 801 && id <= 802) {
    return "fa-solid fa-cloud-sun";
  } else if (id >= 803 && id <= 804) {
    return "fa-solid fa-cloud";
  }
}

//showcity & display Temperature
function showTemperature(response) {
  let currentTemp = document.querySelector("#current-temp");
  let currentDescription = document.querySelector("#current-description");
  let maxTemp = document.querySelector("#max-temp-today");
  let minTemp = document.querySelector("#min-temp-today");
  let currentHumidity = document.querySelector("#humidity");
  let currentWind = document.querySelector("#wind");
  let cityHeading = document.querySelector("h1");
  let currentIcon = document.querySelector("#current-icon");

  celsiusTemp = response.data.main.temp;

  currentTemp.innerHTML = Math.round(response.data.main.temp);
  currentDescription.innerHTML = response.data.weather[0].main;
  maxTemp.innerHTML = Math.round(response.data.main.temp_max);
  minTemp.innerHTML = Math.round(response.data.main.temp_min);
  currentHumidity.innerHTML = response.data.main.humidity;
  currentWind.innerHTML = Math.round(response.data.wind.speed);
  cityHeading.innerHTML = response.data.name;
  currentIcon.setAttribute("class", showIcon(response.data.weather[0].id));

  getForecast(response.data.coord);
}

function showTemperatureImperial(response) {
  let currentTemp = document.querySelector("#current-temp");
  let maxTemp = document.querySelector("#max-temp-today");
  let minTemp = document.querySelector("#min-temp-today");

  currentTemp.innerHTML = Math.round(response.data.main.temp);
  maxTemp.innerHTML = Math.round(response.data.main.temp_max);
  minTemp.innerHTML = Math.round(response.data.main.temp_min);

  getForecastImperial(response.data.coord);
}

function showCity(city) {
  let apiKey = "743bee57fddbfaf52447193a87d5dd25";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

function showCityImperial() {
  let currentCity = document.querySelector("h1").textContent;
  let apiKey = "743bee57fddbfaf52447193a87d5dd25";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperatureImperial);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input-value").value;
  showCity(city);
}

//Current location

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "535cacbb3f8a0df0aeb4790235b9541f";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

function getPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

//convert C & F
function showFahrenheitTemp(event) {
  event.preventDefault();
  celsiusToggle.classList.remove("active");
  celsiusToggle.classList.add("inactive");
  fahrenheitToggle.classList.remove("inactive");
  fahrenheitToggle.classList.add("active");

  showCityImperial();
}

function returnToCelcius() {
  let currentCity = document.querySelector("h1").textContent;
  let apiKey = "743bee57fddbfaf52447193a87d5dd25";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

function showCelsiusTemp(event) {
  event.preventDefault();
  celsiusToggle.classList.add("active");
  celsiusToggle.classList.remove("inactive");
  fahrenheitToggle.classList.add("inactive");
  fahrenheitToggle.classList.remove("active");

  returnToCelcius();
}

//Forecast
function getForecast(coordinates) {
  let apiKey = "535cacbb3f8a0df0aeb4790235b9541f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function getForecastImperial(coordinates) {
  let apiKey = "535cacbb3f8a0df0aeb4790235b9541f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 6) {
      let forecastIcon = showIcon(forecastDay.weather[0].id);
      let formattedDay = formatForecastDay(forecastDay.dt);
      let maxTemp = Math.round(forecastDay.temp.max);
      let minTemp = Math.round(forecastDay.temp.min);
      forecastHTML =
        forecastHTML +
        `<div class="col-2 future-forecast-day">
                <i class="${forecastIcon} future-forecast-icon"></i>
                <div class="future-forecast-date">${formattedDay}</div>
                <div class="future-forecast-temp">
                  <span class="future-forecast-max-temp">${maxTemp}&deg;</span
                  ><span class="future-forecast-min-temp"> ${minTemp}&deg;</span>
                </div>
              </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//Global variables

let todaysDate = document.querySelector("#current-date");
let todaysTime = document.querySelector("#current-time");

todaysDate.innerHTML = showDate(new Date());
todaysTime.innerHTML = showTime(new Date());

let celsiusTemp = null;

let inputCity = document.querySelector("#input-city-form");
inputCity.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getPosition);

let fahrenheitToggle = document.querySelector("#fahrenheit-toggle");
fahrenheitToggle.addEventListener("click", showFahrenheitTemp);

let celsiusToggle = document.querySelector("#celsius-toggle");
celsiusToggle.addEventListener("click", showCelsiusTemp);

showCity("Perth");
