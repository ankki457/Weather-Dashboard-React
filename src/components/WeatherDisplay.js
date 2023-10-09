// WeatherDisplay.js
import React from 'react';

function WeatherDisplay({ data, units }) {
  const { name, weather, main, wind } = data;
  const { description, icon } = weather[0];

  const getWeatherIconUrl = (icon) => {
    return `https://openweathermap.org/img/wn/${icon}${
      units === 'metric' ? '@2x.png' : '.png'
    }`;
  };

  return (
    <div className="weather-card">
      <div className="weather-header">
        <h2>{name}</h2>
        <img src={getWeatherIconUrl(icon)} alt={description} />
      </div>
      <div className="weather-info">
        <div>
          <p>
            Temperature: {main.temp}&deg;{units === 'metric' ? 'C' : 'F'}
          </p>
          <p>Description: {description}</p>
        </div>
        <div>
          <p>Humidity: {main.humidity}%</p>
          <p>Wind Speed: {wind.speed} m/s</p>
        </div>
      </div>
    </div>
  );
}

export default WeatherDisplay;
