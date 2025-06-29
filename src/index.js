function displayTemperature(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let cityElement = document.querySelector("#current-city");
  let descriptionElement = document.querySelector("#description");
  let iconElement = document.querySelector("#weather-icon");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");

  let temperature = Math.round(response.data.temperature.current);
  let description = response.data.condition.description;
  let iconUrl = response.data.condition.icon_url;
  let humidity = response.data.temperature.humidity;
  let windSpeed = Math.round(response.data.wind.speed);

  temperatureElement.innerHTML = `${temperature}°C`;
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = description;
  iconElement.setAttribute("src", iconUrl);
  iconElement.setAttribute("alt", description);
  humidityElement.innerHTML = `${humidity}%`;
  windElement.innerHTML = `${windSpeed} mph`;
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="forecast-row">`;

  response.data.daily.slice(1, 6).forEach(function (forecastDay) {
    forecastHTML += `
      <div class="forecast-day">
        <div class="forecast-date">${formatDay(forecastDay.time)}</div>
        <img src="${forecastDay.condition.icon_url}" alt="${forecastDay.condition.description}" class="forecast-icon" />
        <div class="forecast-temp">
          <span class="forecast-temp-max">${Math.round(forecastDay.temperature.maximum)}°</span> /
          <span class="forecast-temp-min">${Math.round(forecastDay.temperature.minimum)}°</span>
        </div>
      </div>
    `;
  });

  forecastHTML += `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

function search(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-search").value.trim();
  if (!cityInput) return;

  let apiKey = "b8e4c9bea5b1fcaco0bf15019t432341";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityInput}&key=${apiKey}&units=metric`;
  let forecastUrl = `https://api.shecodes.io/weather/v1/forecast?query=${cityInput}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
  axios.get(forecastUrl).then(displayForecast);
}

// Initialize date and listener
let searchForm = document.querySelector(".search-form");
searchForm.addEventListener("submit", search);

let currentDateElement = document.querySelector("#current-date");
let currentDate = new Date();
currentDateElement.innerHTML = formatDate(currentDate);
