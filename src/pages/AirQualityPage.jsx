import React from 'react';
import { useGeolocation } from '../hooks/useGeolocation.js';
import { useAQI } from '../hooks/useAQI.js';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import ErrorBanner from '../components/ErrorBanner.jsx';
import AQICard from '../components/AQICard.jsx';

const AirQualityPage = () => {
  const { coords, permissionError, loading: geoLoading } = useGeolocation();
  const { aqi, loading, error } = useAQI(coords);

  if (geoLoading || loading) {
    return <LoadingSpinner label="Loading air quality…" />;
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl sm:text-2xl font-semibold text-slate-50">
          Air Quality
        </h1>
        <p className="text-xs text-slate-400">
          Local particles and gases from the nearest station.
        </p>
      </div>

      {permissionError && <ErrorBanner message={permissionError} />}
      {error && <ErrorBanner message={error} />}

      <AQICard aqi={aqi} />
    </div>
  );
};

export default AirQualityPage;
