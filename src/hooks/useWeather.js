import { useEffect, useState } from 'react';
import { getWeatherByCoords } from '../utils/api.js';
import { parseWeatherResponse } from '../utils/weatherUtils.js';

export const useWeather = (coords, units) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(Boolean(coords));
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!coords) return;
    let cancelled = false;

    const run = async () => {
      setLoading(true);
      setError(null);
      try {
        const raw = await getWeatherByCoords(coords.lat, coords.lon, units);
        if (cancelled) return;
        setWeather(parseWeatherResponse(raw, units));
      } catch (err) {
        if (!cancelled) setError(err.message || 'Failed to load weather.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [coords?.lat, coords?.lon, units]);

  return { weather, loading, error };
};
