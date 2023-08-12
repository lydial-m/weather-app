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
  let currentTemp = document.querySelector("#current-temp");
  let currentDescription = document.querySelector("#current-description");
  let currentHumidity = document.querySelector("#humidity");
  let currentWind = document.querySelector("#wind");
  let cityHeading = document.querySelector("h1");

  currentTemp.innerHTML = Math.round(response.data.main.temp);
  currentDescription.innerHTML = response.data.weather[0].main;
  currentHumidity.innerHTML = response.data.main.humidity;
  currentWind.innerHTML = Math.round(response.data.wind.speed);
  cityHeading.innerHTML = response.data.name;
}

function showCity(city) {
  let apiKey = "743bee57fddbfaf52447193a87d5dd25";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input-value").value;
  showCity(city);
}

let inputCity = document.querySelector("#input-city-form");
inputCity.addEventListener("submit", handleSubmit);

showCity("Perth");

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
