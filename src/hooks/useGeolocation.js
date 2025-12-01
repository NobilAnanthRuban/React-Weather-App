import { useEffect, useState } from 'react';

export const useGeolocation = () => {
  const [coords, setCoords] = useState(null);
  const [permissionError, setPermissionError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!('geolocation' in navigator)) {
      setPermissionError('Geolocation is not supported in this browser.');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude
        });
        setLoading(false);
      },
      (err) => {
        setPermissionError(err.message || 'Unable to access location.');
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 60000
      }
    );
  }, []);

  return { coords, permissionError, loading };
};
