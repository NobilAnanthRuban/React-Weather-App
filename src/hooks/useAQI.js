import { useEffect, useState } from 'react';
import { getAQIByCoords } from '../utils/api.js';
import { parseAQIResponse } from '../utils/aqiUtils.js';

export const useAQI = (coords) => {
  const [aqi, setAqi] = useState(null);
  const [loading, setLoading] = useState(Boolean(coords));
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!coords) return;
    let cancelled = false;

    const run = async () => {
      setLoading(true);
      setError(null);
      try {
        const raw = await getAQIByCoords(coords.lat, coords.lon);
        if (cancelled) return;
        setAqi(parseAQIResponse(raw));
      } catch (err) {
        if (!cancelled) setError(err.message || 'Failed to load AQI.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [coords?.lat, coords?.lon]);

  return { aqi, loading, error };
};
