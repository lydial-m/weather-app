//show Date & Time

function showDate(date) {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let months = [
    "January",
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
    "December",
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

  let todaysTime = `${currentHour}:${currentMinutes}`;
  return todaysTime;
}

let todaysDate = document.querySelector("#current-date");
let todaysTime = document.querySelector("#current-time");

todaysDate.innerHTML = showDate(new Date());
todaysTime.innerHTML = showTime(new Date());

//showcity & display Temperature
function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = `${temperature}`;

  let description = response.data.weather[0].main;
  let currentDescription = document.querySelector("#current-description");
  currentDescription.innerHTML = `${description}`;

  let humidity = response.data.main.humidity;
  let currentHumidity = document.querySelector("#humidity");
  currentHumidity.innerHTML = `Humidity: ${humidity}%`;

  let wind = Math.round(response.data.wind.speed);
  let currentWind = document.querySelector("#wind");
  currentWind.innerHTML = `Wind: ${wind}m/s`;

  let city = response.data.name;
  let cityHeading = document.querySelector("h1");
  cityHeading.innerHTML = `${city}`;
  console.log(response);
}

function showCity(event) {
  event.preventDefault();
  let cityInputValue = document.querySelector("#city-input-value");
  let cityHeading = document.querySelector("h1");
  cityHeading.innerHTML = `${cityInputValue.value}`;

  let apiKey = "743bee57fddbfaf52447193a87d5dd25";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInputValue.value}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

let inputCity = document.querySelector("#input-city-form");
inputCity.addEventListener("submit", showCity);

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

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getPosition);
