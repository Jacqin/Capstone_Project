import axios from 'axios';

const WEATHER_API_KEY = '1763f365d8f73841397f341020f9a1d7';
const BASE_URL = 'https://api.openweathermap.org/data/3.0/onecall';

export const getWeatherSummary = async (lat, lon, customUrl = null) => {
  try {
    let response;
    
    if (customUrl) {
      // Use the custom URL if provided
      response = await axios.get(customUrl);
    } else {
      // Use the default API call
      response = await axios.get(`${BASE_URL}/overview`, {
        params: {
          lat,
          lon,
          appid: WEATHER_API_KEY,
          units: 'metric' // Using metric units for consistency
        }
      });
    }

    const data = response.data;
    
    // Generate a human-readable summary
    const summary = generateWeatherSummary(data);
    
    return {
      summary,
      rawData: data
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw new Error('Failed to fetch weather data');
  }
};

const generateWeatherSummary = (data) => {
  const {
    weather_overview,
    temperature,
    feels_like,
    pressure,
    humidity,
    wind_speed,
    weather_description
  } = data;

  return `
Current Weather Summary:
- Temperature: ${temperature}°C (Feels like: ${feels_like}°C)
- Weather: ${weather_description}
- Pressure: ${pressure} hPa
- Humidity: ${humidity}%
- Wind Speed: ${wind_speed} m/s

${weather_overview}
  `.trim();
};

export const convertTemperature = (temp, fromUnit, toUnit) => {
  let celsius;
  
  // Convert to Celsius first
  switch (fromUnit.toLowerCase()) {
    case 'celsius':
      celsius = temp;
      break;
    case 'fahrenheit':
      celsius = (temp - 32) * 5/9;
      break;
    case 'kelvin':
      celsius = temp - 273.15;
      break;
    default:
      throw new Error('Invalid temperature unit');
  }

  // Convert from Celsius to target unit
  switch (toUnit.toLowerCase()) {
    case 'celsius':
      return celsius;
    case 'fahrenheit':
      return (celsius * 9/5) + 32;
    case 'kelvin':
      return celsius + 273.15;
    default:
      throw new Error('Invalid temperature unit');
  }
}; 