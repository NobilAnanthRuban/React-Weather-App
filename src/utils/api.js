import axios from 'axios';

const OPEN_METEO_BASE_URL =
  import.meta.env.VITE_OPEN_METEO_BASE_URL || 'https://api.open-meteo.com/v1';
const OPENAQ_BASE_URL =
  import.meta.env.VITE_OPENAQ_BASE_URL || 'https://api.openaq.org/v2';
const GEOAPIFY_BASE_URL =
  import.meta.env.VITE_GEOAPIFY_BASE_URL || 'https://api.geoapify.com/v1';
const GEOAPIFY_API_KEY = import.meta.env.VITE_GEOAPIFY_API_KEY;

/**
 * Weather from Open-Meteo Forecast API: current, hourly, daily.
 */
export const getWeatherByCoords = async (lat, lon, units = 'metric') => {
  const isMetric = units === 'metric';
  const params = {
    latitude: lat,
    longitude: lon,
    current:
      'temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,wind_direction_10m,weather_code,visibility',
    hourly:
      'temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code,visibility',
    daily:
      'weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,wind_speed_10m_max,wind_gusts_10m_max,sunrise,sunset',
    timezone: 'auto',
    temperature_unit: isMetric ? 'celsius' : 'fahrenheit',
    wind_speed_unit: isMetric ? 'kmh' : 'mph',
    visibility_unit: isMetric ? 'km' : 'miles'
  };

  const url = `${OPEN_METEO_BASE_URL}/forecast`;
  const { data } = await axios.get(url, { params });
  return data;
};

/**
 * Air quality from OpenAQ by nearby coordinates.
 * (Temporarily disabled – v2 is retired, v3 requires migration.)
 */
export const getAQIByCoords = async () => {
  return null;
};

/**
 * Autocomplete city search using Geoapify.
 */
export const searchCities = async (query) => {
  if (!GEOAPIFY_API_KEY) {
    throw new Error('Geoapify API key missing in .env');
  }
  const url = `${GEOAPIFY_BASE_URL}/geocode/autocomplete`;
  const { data } = await axios.get(url, {
    params: {
      text: query,
      apiKey: GEOAPIFY_API_KEY,
      format: 'json',
      limit: 5,
      type: 'city'
    }
  });
  return data;
};

/**
 * Reverse geocode device coordinates to nearest city using Geoapify.
 */
export const reverseGeocodeCity = async (lat, lon) => {
  if (!GEOAPIFY_API_KEY) return null;

  const url = `${GEOAPIFY_BASE_URL}/geocode/reverse`;
  const { data } = await axios.get(url, {
    params: {
      lat,
      lon,
      type: 'city',
      format: 'json',
      apiKey: GEOAPIFY_API_KEY
    }
  });

  const item = data?.results?.[0];
  if (!item) return null;

  return {
    name: item.city || item.town || item.name || '',
    country: item.country || '',
    lat: item.lat,
    lon: item.lon
  };
};
