import React, { useEffect, useState } from 'react';
import SearchAutocomplete from './SearchAutocomplete.jsx';
import { useGeolocation } from '../hooks/useGeolocation.js';
import { reverseGeocodeCity } from '../utils/api.js';

const TopBar = ({ onCityChange, onMenuClick }) => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [deviceCity, setDeviceCity] = useState(null);
  const { coords, loading, permissionError } = useGeolocation();

  useEffect(() => {
    if (!coords || permissionError) return;

    let cancelled = false;
    const run = async () => {
      try {
        const city = await reverseGeocodeCity(coords.lat, coords.lon);
        if (!cancelled) setDeviceCity(city);
      } catch {
        if (!cancelled) setDeviceCity(null);
      }
    };
    run();

    return () => {
      cancelled = true;
    };
  }, [coords?.lat, coords?.lon, permissionError]);

  const activeLabel =
    selectedCity?.name
      ? `${selectedCity.name}${
          selectedCity.country ? ', ' + selectedCity.country : ''
        }`
      : deviceCity?.name
      ? `${deviceCity.name}${
          deviceCity.country ? ', ' + deviceCity.country : ''
        }`
      : null;

  return (
    <header className="sticky top-0 z-30">
      <div className="flex items-center gap-3 px-3 sm:px-4 lg:px-8 xl:px-12 py-3">
        {/* Mobile menu button */}
        <button
          type="button"
          onClick={onMenuClick}
          className="lg:hidden inline-flex items-center justify-center h-9 w-9 rounded-full bg-white/10 border border-white/20 text-slate-100"
          aria-label="Open navigation"
        >
          ☰
        </button>

        {/* Left: title + location badges */}
        <div className="flex flex-col gap-1">
          <p className="text-xs sm:text-sm font-semibold tracking-wide text-slate-100">
            Climatic Dashboard
          </p>
          <div className="flex flex-wrap items-center gap-2">
            {activeLabel && !permissionError && (
              <span className="inline-flex items-center gap-1 text-[11px] text-slate-200 bg-white/10 px-2 py-1 rounded-full">
                <span>📍</span>
                <span>{activeLabel}</span>
              </span>
            )}
            {permissionError && (
              <span className="inline-flex items-center gap-1 text-[11px] text-amber-300 bg-amber-500/15 px-2 py-1 rounded-full">
                <span>⚠️</span>
                <span>Location blocked</span>
              </span>
            )}
          </div>
        </div>

        {/* Right: search bar */}
        <div className="ml-auto w-full max-w-xl">
          <SearchAutocomplete
            onSelect={(city) => {
              setSelectedCity(city);
              onCityChange?.(city);
            }}
          />
        </div>
      </div>
    </header>
  );
};

export default TopBar;
