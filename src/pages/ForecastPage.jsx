import React from 'react';
import { useGeolocation } from '../hooks/useGeolocation.js';
import { useWeather } from '../hooks/useWeather.js';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import ErrorBanner from '../components/ErrorBanner.jsx';
import { useLocalStorage } from '../hooks/useLocalStorage.js';
import { formatDay, interpretWeatherCode } from '../utils/weatherUtils.js';

const ForecastPage = ({ cityCoords }) => {
  const { coords, permissionError, loading: geoLoading } = useGeolocation();
  const [units] = useLocalStorage('neo-units', 'metric');

  const activeCoords =
    cityCoords && cityCoords.lat && cityCoords.lon
      ? { lat: cityCoords.lat, lon: cityCoords.lon }
      : coords;

  const { weather, loading, error } = useWeather(activeCoords, units);
  const isMetric = units === 'metric';

  if (geoLoading || loading) {
    return <LoadingSpinner label="Loading detailed forecast…" />;
  }

  const days = weather?.daily || [];

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold text-slate-50">
          7‑Day Detailed Forecast
        </h1>
        <p className="text-[11px] sm:text-xs text-slate-400">
          Temperature, rain chance, wind, and sun path for each day.
        </p>
      </div>

      {permissionError && <ErrorBanner message={permissionError} />}
      {error && <ErrorBanner message={error} />}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
        {days.slice(0, 7).map((d, idx) => {
          const title = formatDay(d.date);
          const desc = interpretWeatherCode(d.code);
          const precip = d.precipSum != null ? d.precipSum.toFixed(1) : '—';
          const precipProb =
            d.precipProb != null ? `${Math.round(d.precipProb)}%` : '—';
          const wind = d.windMax != null ? Math.round(d.windMax) : '—';
          const gust = d.gustMax != null ? Math.round(d.gustMax) : '—';

          return (
            <article
              key={d.date}
              className="group relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 bg-white/10 backdrop-blur-lg shadow-[0_16px_45px_rgba(15,23,42,0.7)] transition-transform duration-300 hover:-translate-y-1.5"
            >
              <div className="pointer-events-none absolute inset-0 border border-white/10 rounded-2xl sm:rounded-3xl" />

              <div className="relative z-10 p-4 sm:p-5 flex flex-col gap-2.5 sm:gap-3">
                <header className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-slate-300/80">
                      {idx === 0 ? 'Today' : 'Upcoming'}
                    </p>
                    <h2 className="text-sm sm:text-base font-semibold text-slate-50">
                      {title}
                    </h2>
                    <p className="text-[11px] sm:text-xs text-slate-200 mt-0.5 sm:mt-1">
                      {desc}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-base sm:text-lg font-semibold text-slate-50">
                      {Math.round(d.max)}
                      {isMetric ? '°' : '°'}
                    </p>
                    <p className="text-[11px] sm:text-xs text-slate-200/80">
                      Low {Math.round(d.min)}
                      {isMetric ? '°' : '°'}
                    </p>
                  </div>
                </header>

                <div className="h-px bg-gradient-to-r from-transparent via-slate-300/30 to-transparent" />

                <div className="grid grid-cols-2 gap-3 text-[11px] sm:text-xs text-slate-100">
                  <div className="space-y-1">
                    <p className="text-[10px] sm:text-[11px] uppercase tracking-wide text-slate-200/80">
                      Precipitation
                    </p>
                    <p>
                      Total{' '}
                      <span className="font-semibold">
                        {precip}
                        {precip !== '—' ? ' mm' : ''}
                      </span>
                    </p>
                    <p>
                      Chance{' '}
                      <span className="font-semibold">{precipProb}</span>
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] sm:text-[11px] uppercase tracking-wide text-slate-200/80">
                      Wind & Gusts
                    </p>
                    <p>
                      Max{' '}
                      <span className="font-semibold">
                        {wind}
                        {wind !== '—' ? (isMetric ? ' km/h' : ' mph') : ''}
                      </span>
                    </p>
                    <p>
                      Gusts{' '}
                      <span className="font-semibold">
                        {gust}
                        {gust !== '—' ? (isMetric ? ' km/h' : ' mph') : ''}
                      </span>
                    </p>
                  </div>
                </div>

                {d.sunrise && d.sunset && (
                  <div className="mt-2 sm:mt-3">
                    <p className="text-[10px] sm:text-[11px] uppercase tracking-wide text-slate-200/80 mb-1">
                      Sun path
                    </p>
                    <div className="relative h-10 sm:h-12">
                      <svg
                        viewBox="0 0 100 40"
                        className="absolute inset-0 w-full h-full"
                      >
                        <path
                          d="M5 35 Q 50 5 95 35"
                          fill="none"
                          stroke="rgba(226,232,240,0.8)"
                          strokeWidth="1.3"
                          strokeDasharray="3 3"
                        />
                      </svg>

                      <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
                        <img
                          src="/icons/sun.png"
                          alt="Sun"
                          className="w-4 h-4 sm:w-5 sm:h-5 drop-shadow-[0_0_6px_rgba(250,250,210,0.9)] group-hover:scale-110 transition-transform"
                        />
                      </div>

                      <div className="absolute inset-0 flex justify-between items-end text-[9px] sm:text-[10px] text-slate-100">
                        <div className="flex flex-col items-start gap-0.5">
                          <span className="text-[8px] sm:text-[9px] uppercase tracking-wide text-slate-200/80">
                            Sunrise
                          </span>
                          <span>
                            {new Date(d.sunrise).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                        <div className="flex flex-col items-end gap-0.5">
                          <span className="text-[8px] sm:text-[9px] uppercase tracking-wide text-slate-200/80">
                            Sunset
                          </span>
                          <span>
                            {new Date(d.sunset).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default ForecastPage;
