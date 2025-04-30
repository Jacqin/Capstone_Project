import React, { useState } from 'react';
import WeatherSummary from './components/WeatherSummary';
import './styles/WeatherSummary.css';
import './styles/App.css';

function App() {
  const [coordinates, setCoordinates] = useState({
    latitude: 30.1925,
    longitude: 82.6146
  });
  const [customUrl, setCustomUrl] = useState('');
  const [useCustomUrl, setUseCustomUrl] = useState(false);

  const handleUrlSubmit = (e) => {
    e.preventDefault();
    try {
      const url = new URL(customUrl);
      const params = new URLSearchParams(url.search);
      const lat = params.get('lat');
      const lon = params.get('lon');
      
      if (lat && lon) {
        setCoordinates({
          latitude: parseFloat(lat),
          longitude: parseFloat(lon)
        });
        setUseCustomUrl(true);
      } else {
        alert('Invalid URL: Missing latitude or longitude parameters');
      }
    } catch (error) {
      alert('Invalid URL format');
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Weather Summary App</h1>
      </header>
      <main className="app-main">
        <div className="url-input-container">
          <form onSubmit={handleUrlSubmit} className="url-form">
            <input
              type="text"
              value={customUrl}
              onChange={(e) => setCustomUrl(e.target.value)}
              placeholder="Enter OpenWeatherMap API URL"
              className="url-input"
            />
            <button type="submit" className="submit-button">
              Get Weather Summary
            </button>
          </form>
          {useCustomUrl && (
            <div className="current-coordinates">
              Current Location: {coordinates.latitude}, {coordinates.longitude}
            </div>
          )}
        </div>
        <WeatherSummary
          latitude={coordinates.latitude}
          longitude={coordinates.longitude}
        />
      </main>
    </div>
  );
}

export default App; 