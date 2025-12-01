const weatherCodeMap = {
  0: 'Clear sky',
  1: 'Mainly clear',
  2: 'Partly cloudy',
  3: 'Overcast',
  45: 'Fog',
  48: 'Depositing rime fog',
  51: 'Light drizzle',
  53: 'Moderate drizzle',
  55: 'Dense drizzle',
  61: 'Slight rain',
  63: 'Moderate rain',
  65: 'Heavy rain',
  71: 'Slight snow',
  73: 'Moderate snow',
  75: 'Heavy snow',
  80: 'Rain showers',
  81: 'Heavy rain showers',
  95: 'Thunderstorm'
};

export const interpretWeatherCode = (code) =>
  weatherCodeMap[code] || 'Unknown';

export const parseWeatherResponse = (data, units) => {
  if (!data) return null;
  const { current, hourly, daily, timezone } = data;

  const hourlyItems = (hourly?.time || []).map((t, idx) => ({
    time: t,
    temperature: hourly.temperature_2m?.[idx],
    humidity: hourly.relative_humidity_2m?.[idx],
    windSpeed: hourly.wind_speed_10m?.[idx],
    code: hourly.weather_code?.[idx],
    visibility: hourly.visibility?.[idx]
  }));

  const dailyItems = (daily?.time || []).map((t, idx) => ({
    date: t,
    code: daily.weather_code?.[idx],
    max: daily.temperature_2m_max?.[idx],
    min: daily.temperature_2m_min?.[idx],
    sunrise: daily.sunrise?.[idx],
    sunset: daily.sunset?.[idx],
    precipSum: daily.precipitation_sum?.[idx],
    precipProb: daily.precipitation_probability_max?.[idx],
    windMax: daily.wind_speed_10m_max?.[idx],
    gustMax: daily.wind_gusts_10m_max?.[idx]
  }));

  return {
    timezone,
    units,
    current: {
      temperature: current?.temperature_2m,
      humidity: current?.relative_humidity_2m,
      feelsLike: current?.apparent_temperature,
      windSpeed: current?.wind_speed_10m,
      windDirection: current?.wind_direction_10m,
      code: current?.weather_code,
      description: interpretWeatherCode(current?.weather_code),
      visibility: current?.visibility
    },
    hourly: hourlyItems,
    daily: dailyItems
  };
};

export const formatHour = (iso) => {
  const d = new Date(iso);
  return d.toLocaleTimeString(undefined, {
    hour: 'numeric'
  });
};

export const formatDay = (iso) => {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });
};
