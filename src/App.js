// App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import UnitToggle from './components/UnitToggle';
import ErrorMessage from './components/ErrorMessage';

const API_KEY = '389ef28e034b401063c584f8d428a53d';
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [units, setUnits] = useState('metric'); // Default to Celsius

  useEffect(() => {
    if (weatherData) {
      document.title = `Weather in ${weatherData.name}`;
    } else {
      document.title = 'Weather Dashboard';
    }
  }, [weatherData]);

  const handleSearch = async (city) => {
    try {
      const data = await fetchWeatherData(city, units);
      setWeatherData(data);
      setErrorMessage(null);
    } catch (error) {
      setWeatherData(null);
      setErrorMessage('City not found or API request failed.');
    }
  };

  const fetchWeatherData = async (city, units) => {
    try {
      const response = await fetch(`${API_URL}?q=${city}&units=${units}&appid=${API_KEY}`);
      if (!response.ok) {
        throw new Error('City not found');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Weather Dashboard</h1>
      </header>
      <main className="app-main">
        <SearchBar onSearch={handleSearch} />
        <UnitToggle units={units} onToggle={(newUnits) => setUnits(newUnits)} />
        <div className="app-content">
          {errorMessage && <ErrorMessage message={errorMessage} />}
          {weatherData && <WeatherDisplay data={weatherData} units={units} />}
        </div>
      </main>
      <footer className="app-footer">
        <p>&copy; {new Date().getFullYear()} Weather Dashboard</p>
      </footer>
    </div>
  );
}

export default App;
