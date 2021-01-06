/* The purpose of this javascript file is to handle the forecast functionality,
 *  by locating the user and displaying the weather in their region.
 */

// API URLS
// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
//

// CONSTANTS
const apiKey = 'a5c4b1ad9bf022fcd03739fec6e2ee60';

// api.openweathermap.org/data/2.5/forecast?lat=49.833574399999996&lon=-97.117798&appid=a5c4b1ad9bf022fcd03739fec6e2ee60

// DOM SELECTORS
const currentTemp = document.querySelector('.temp');
const highTemp = document.querySelectorAll('.high');
const lowTemp = document.querySelectorAll('.low');
const conditionIcon = document.querySelectorAll('.condition-icon');
const conditionDescription = document.querySelectorAll('.description');
const day = document.querySelectorAll('.forecast-day');

// OBTAINING GEOLOCATION

navigator.geolocation.getCurrentPosition((position) => {
  const longitude = position.coords.longitude;
  const latitude = position.coords.latitude;
  getFiveDayForecast(latitude, longitude);
  getCurrentWeather(latitude, longitude);
});

// API CALLS
async function getFiveDayForecast(latitude, longitude) {
  const response = await fetch(
    `http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
  );
  const resp = await response.json();

  const dayOne = resp.list.slice(0, 8);
  const dayTwo = resp.list.slice(8, 16);
  const dayThree = resp.list.slice(16, 24);
  const dayFour = resp.list.slice(24, 32);
  const dayFive = resp.list.slice(32, 40);

  const daysArr = [dayOne, dayTwo, dayThree, dayFour, dayFive];
  const forecast = document.getElementById('forecast-div');
  forecast.innerHTML = '';

  daysArr.forEach((day) => {
    forecastDayHtml = createHTMLDayForecast(day);
    forecast.insertAdjacentHTML('beforeend', forecastDayHtml);
  });
}

async function getCurrentWeather(latitude, longitude) {
  const response = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
  );
  const resp = await response.json();
  createHTMLCurrentForecast(resp);
}

// DOM MANIPULATION

function createHTMLCurrentForecast(currentWeather) {
  const currentCondition = document.getElementById('current-conditions');
  const temp = Math.round(currentWeather.main.temp - 273.15);

  currentCondition.innerHTML = `
        <h2>Current Conditions</h2>
        <img
          class="condition-icon"
          src="http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png"
        />
        <div class="current">
          <div class="temp">${temp}℃</div>
          <div class="condition">${currentWeather.weather[0].description}</div>
        </div>`;
}

function createHTMLDayForecast(dayWeatherArray) {
  const d = new Date(dayWeatherArray[0].dt_txt);
  const weekday = d.toLocaleString('en-ca', { weekday: 'long' });
  let dailyHigh = dayWeatherArray[0].main.temp_max;
  let dailyLow = dayWeatherArray[0].main.temp_min;
  const forecastIcon = dayWeatherArray[4].weather[0].icon;
  const forecastDescription = dayWeatherArray[4].weather[0].description;

  dayWeatherArray.forEach((forecastRecord) => {
    if (forecastRecord.main.temp_max > dailyHigh) {
      dailyHigh = forecastRecord.main.temp_max;
    }
    if (forecastRecord.main.temp_min < dailyLow) {
      dailyLow = forecastRecord.main.temp_min;
    }
  });

  dailyHigh = Math.round(dailyHigh - 273.15);
  dailyLow = Math.round(dailyLow - 273.15);

  return `<div class="day">
          <h3 class="forecast-day">${weekday}</h3>
          <img
            class="condition-icon"
            src="http://openweathermap.org/img/wn/${forecastIcon}@2x.png"
          />
          <div class="description">${forecastDescription}</div>
          <div class="temp">
            <span class="high">${dailyHigh}℃</span>/<span class="low">${dailyLow}℃</span>
          </div>`;
}
