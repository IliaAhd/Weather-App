"use strict";

// Elements & Items
const apiKey = "4696f5c4d2768c5a45ba478b1fb2b53d";

const weatherDataEl = document.querySelector("#weather-data");
const cityInputEl = document.querySelector("#city-input");
const formEl = document.querySelector("form");

// Functions
const getWeatherData = async function (cityValue) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) throw new Error("Network response was not ok!");

    const data = await response.json();
    const cityName = data.name;
    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;
    const details = [
      `Feels like: ${Math.round(data.main.feels_like)}`,
      `Humidity: ${data.main.humidity}%`,
      `Wind speed: ${data.wind.speed} m/s`,
    ];

    document.querySelector("h1").textContent = cityName;
    weatherDataEl.querySelector(
      ".icon"
    ).innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`;

    weatherDataEl.querySelector(
      ".temperature"
    ).textContent = `${temperature}°C`;

    weatherDataEl.querySelector(".description").textContent = description;

    weatherDataEl.querySelector(".details").innerHTML = details
      .map((detail) => `<div>${detail}</div>`)
      .join("");
    console.log(data);
  } catch (error) {
    weatherDataEl.querySelector(".icon").innerHTML = "";

    weatherDataEl.querySelector(".temperature").textContent = "";

    weatherDataEl.querySelector(".description").textContent =
      "An error happened, please try again later!";

    weatherDataEl.querySelector(".details").innerHTML = "";
  }
};

// Event handlers
formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  const cityValue = cityInputEl.value;
  getWeatherData(cityValue);
  cityInputEl.value = "";
});
