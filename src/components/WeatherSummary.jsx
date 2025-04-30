import React, { useState, useEffect } from 'react';
import { getWeatherSummary } from '../services/weatherService';

const WeatherSummary = ({ latitude, longitude, customUrl }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setLoading(true);
        const data = await getWeatherSummary(latitude, longitude, customUrl);
        setWeatherData(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch weather data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if ((latitude && longitude) || customUrl) {
      fetchWeatherData();
    }
  }, [latitude, longitude, customUrl]);

  if (loading) {
    return <div className="weather-summary loading">Loading weather data...</div>;
  }

  if (error) {
    return <div className="weather-summary error">{error}</div>;
  }

  if (!weatherData) {
    return <div className="weather-summary">No weather data available</div>;
  }

  return (
    <div className="weather-summary">
      <h2>Weather Summary</h2>
      <div className="weather-details">
        <pre>{weatherData.summary}</pre>
      </div>
      <div className="weather-raw-data">
        <h3>Raw Data</h3>
        <pre>{JSON.stringify(weatherData.rawData, null, 2)}</pre>
      </div>
    </div>
  );
};

export default WeatherSummary; 