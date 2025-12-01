import React, { useMemo } from 'react';
import { useGeolocation } from '../hooks/useGeolocation.js';
import { useWeather } from '../hooks/useWeather.js';
import { useAQI } from '../hooks/useAQI.js';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import ErrorBanner from '../components/ErrorBanner.jsx';
import UnitToggle from '../components/UnitToggle.jsx';
import { useLocalStorage } from '../hooks/useLocalStorage.js';
import { formatDay } from '../utils/weatherUtils.js';
import { useClock } from '../hooks/useClock.js';

const Dashboard = ({ cityCoords }) => {
  const { coords, permissionError, loading: geoLoading } = useGeolocation();
  const [units, setUnits] = useLocalStorage('neo-units', 'metric');

  // prefer searched city, fallback to device coords
  const activeCoords =
    cityCoords && cityCoords.lat && cityCoords.lon
      ? { lat: cityCoords.lat, lon: cityCoords.lon }
      : coords;

  const { weather, loading: weatherLoading, error: weatherError } = useWeather(
    activeCoords,
    units
  );
  const { aqi, loading: aqiLoading, error: aqiError } = useAQI(activeCoords);

  const isLoading = geoLoading || weatherLoading || aqiLoading;
  const today = weather?.daily?.[0];
  const isMetric = units === 'metric';

  // temperature curve from all daily points
  const curve = useMemo(() => {
    const days = weather?.daily;
    if (!days || !days.length) return null;

    const max = Math.max(...days.map((d) => d.max));
    const min = Math.min(...days.map((d) => d.min));
    const span = max - min || 1;
    const lastIndex = Math.max(1, days.length - 1);

    const points = days.map((d, i) => {
      const ratio = (d.max - min) / span;
      const x = (i / lastIndex) * 100;
      const y = 50 - ratio * 30; // fits viewBox 0–60
      return { date: d.date, x, y };
    });

    const path = points
      .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
      .join(' ');

    return { points, max, min, path };
  }, [weather?.daily]);

  const { time, date, hourDeg, minuteDeg, secondDeg } = useClock();

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold text-slate-50">
            Weather Overview
          </h1>
          <p className="text-[11px] sm:text-xs text-slate-400">
            Real‑time atmospheric conditions at your selected location.
          </p>
        </div>
        <div className="scale-95 sm:scale-100 origin-right">
          <UnitToggle units={units} onChange={setUnits} />
        </div>
      </div>

      {permissionError && <ErrorBanner message={permissionError} />}

      {isLoading && !weather && !aqi && (
        <LoadingSpinner label="Syncing with the atmosphere…" />
      )}

      {(weatherError || aqiError) && (
        <ErrorBanner message={weatherError || aqiError} />
      )}

      {/* Main hero card */}
      {weather && (
        <div
          className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 bg-white/10 backdrop-blur-xl shadow-[0_18px_60px_rgba(15,23,42,0.7)]"
          style={{
            backgroundImage: "url('/backgrounds/clouds-hero.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {/* subtle dark overlay for readability */}
          <div className="absolute inset-0 bg-slate-900/40" />

          <div className="relative z-10 px-4 sm:px-6 lg:px-10 py-6 sm:py-8 flex flex-col lg:flex-row gap-6 lg:gap-10">
            {/* Left: temp, description, clock, curve */}
            <div className="flex-1 space-y-4">
              <p className="text-xs sm:text-sm text-slate-200/80">
                Today • {weather.timezone || 'Local time zone'}
              </p>

              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-6">
                {/* Temperature block */}
                <div>
                  <div className="flex items-end gap-3 sm:gap-4">
                    <p className="text-5xl sm:text-6xl lg:text-7xl font-light text-slate-50 leading-none">
                      {Math.round(weather.current.temperature)}°
                    </p>
                    {today && (
                      <div className="flex flex-col text-slate-200/80 text-xs sm:text-sm">
                        <span>
                          H {Math.round(today.max)}
                          {isMetric ? '°' : '°'}
                        </span>
                        <span>
                          L {Math.round(today.min)}
                          {isMetric ? '°' : '°'}
                        </span>
                      </div>
                    )}
                  </div>
                  <p className="mt-2 sm:mt-3 text-xl sm:text-2xl lg:text-3xl font-light text-slate-100/90 tracking-wide">
                    {weather.current.description}
                  </p>
                </div>

                {/* Clock block */}
                <div className="w-full sm:w-auto flex items-center sm:flex-col gap-3 text-slate-100/90">
                  <div className="analog-clock scale-90 sm:scale-100">
                    <div
                      className="analog-clock-hand analog-hour-hand"
                      style={{
                        transform: `translateX(-50%) rotate(${hourDeg}deg)`
                      }}
                    />
                    <div
                      className="analog-clock-hand analog-minute-hand"
                      style={{
                        transform: `translateX(-50%) rotate(${minuteDeg}deg)`
                      }}
                    />
                    <div
                      className="analog-clock-hand analog-second-hand"
                      style={{
                        transform: `translateX(-50%) rotate(${secondDeg}deg)`
                      }}
                    />
                    <div className="analog-clock-center" />
                  </div>
                  <div className="flex flex-col text-xs sm:text-sm">
                    <span className="font-medium tracking-wide">{time}</span>
                    <span className="text-slate-300/90">{date}</span>
                  </div>
                </div>
              </div>

              {/* Mini metrics row */}
              <div className="mt-3 sm:mt-4 flex flex-wrap gap-3 sm:gap-4 text-[11px] sm:text-xs text-slate-100/90">
                <Metric label="Humidity" value={`${weather.current.humidity}%`} />
                <Metric
                  label="Wind"
                  value={`${Math.round(weather.current.windSpeed)} ${
                    isMetric ? 'km/h' : 'mph'
                  }`}
                />
                <Metric
                  label="Visibility"
                  value={
                    weather.current.visibility != null
                      ? `${weather.current.visibility.toFixed(1)} ${
                          isMetric ? 'km' : 'mi'
                        }`
                      : '—'
                  }
                />
              </div>

              {/* Weekly curve */}
              {curve && (
                <div className="mt-4 sm:mt-6">
                  <svg viewBox="-2 1 105 40" className="w-full">
                    <path
                      d={curve.path}
                      fill="none"
                      stroke="rgba(248,250,252,0.9)"
                      strokeWidth="1.4"
                    />
                    {curve.points.map((p) => (
                      <circle
                        key={p.date}
                        cx={p.x}
                        cy={p.y}
                        r={1.6}
                        fill="rgba(248,250,252,0.95)"
                      />
                    ))}
                    {curve.points[0] && (
                      <g
                        transform={`translate(${curve.points[0].x}, ${
                          curve.points[0].y - 8
                        })`}
                      >
                        <polygon
                          points="0,0 -2,-4 2,-4"
                          fill="rgba(248,250,252,0.95)"
                        />
                      </g>
                    )}
                  </svg>

                  <div className="relative mt-1 h-4 text-[10px] sm:text-[11px] text-slate-200/80">
                    {curve.points.map((p) => (
                      <span
                        key={p.date}
                        className="absolute -translate-x-1/2 whitespace-nowrap"
                        style={{ left: `${p.x}%` }}
                      >
                        {formatDay(p.date).split(' ')[0]}
                      </span>
                    ))}
                  </div>

                  <div className="mt-2 flex justify-between text-[10px] text-slate-400">
                    <span>
                      Max {Math.round(curve.max)}
                      {isMetric ? '°' : '°'}
                    </span>
                    <span>
                      Min {Math.round(curve.min)}
                      {isMetric ? '°' : '°'}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Right: AQI & snapshot */}
            <div className="w-full lg:w-72 flex flex-col gap-3 sm:gap-4">
              <div className="glass-card p-4 sm:p-5">
                <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-slate-300">
                  Status
                </p>
                <p className="mt-2 sm:mt-3 text-sm text-slate-100/90">
                  {aqi?.category || 'Analyzing air quality…'}
                </p>
                {aqi?.index != null && (
                  <p className="mt-1 text-2xl sm:text-3xl font-light text-slate-50">
                    {Math.round(aqi.index)}
                  </p>
                )}
                <p className="mt-3 sm:mt-4 text-[10px] sm:text-[11px] text-slate-400">
                  {aqi
                    ? 'Estimated safety based on nearby sensors.'
                    : 'Using nearby environmental data where available.'}
                </p>
              </div>

              <div className="glass-card p-4 sm:p-5">
                <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-slate-300">
                  Snapshot
                </p>
                <div className="mt-2 sm:mt-3 space-y-1.5 sm:space-y-2 text-[11px] sm:text-xs text-slate-200/90">
                  <p>
                    Feels like{' '}
                    <span className="font-semibold">
                      {Math.round(weather.current.feelsLike)}
                      {isMetric ? '°' : '°'}
                    </span>
                  </p>
                  {today && (
                    <p>
                      Sunrise{' '}
                      <span className="font-semibold">
                        {new Date(today.sunrise).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>{' '}
                      • Sunset{' '}
                      <span className="font-semibold">
                        {new Date(today.sunset).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Metric = ({ label, value }) => (
  <div className="flex flex-col gap-0.5">
    <span className="text-[9px] sm:text-[10px] uppercase tracking-wide text-slate-300/80">
      {label}
    </span>
    <span className="text-xs sm:text-sm text-slate-100/90">{value}</span>
  </div>
);

export default Dashboard;
