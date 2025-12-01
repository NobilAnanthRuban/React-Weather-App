import React from 'react';
import MetricChip from './MetricChip.jsx';
import { interpretWeatherCode } from '../utils/weatherUtils.js';

const WeatherCard = ({ weather }) => {
  if (!weather?.current) return null;
  const { current, units } = weather;
  const isMetric = units === 'metric';

  return (
    <div className="glass-card p-5 sm:p-6 flex flex-col gap-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">
            Now
          </p>
          <div className="flex items-end gap-3 mt-2">
            <p className="text-4xl sm:text-5xl font-semibold text-slate-50">
              {Math.round(current.temperature)}
              <span className="text-2xl align-top ml-1">
                {isMetric ? '°C' : '°F'}
              </span>
            </p>
            <p className="text-sm text-slate-400">
              Feels like {Math.round(current.feelsLike)}
              {isMetric ? '°' : ''}
            </p>
          </div>
          <p className="mt-2 text-sm text-slate-300">
            {current.description || interpretWeatherCode(current.code)}
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className="text-4xl">🌐</span>
          <div className="flex gap-2 mt-1">
            <MetricChip
              label="Wind"
              value={Math.round(current.windSpeed)}
              unit={isMetric ? 'km/h' : 'mph'}
            />
            <MetricChip label="Humidity" value={current.humidity} unit="%" />
          </div>
        </div>
      </div>

      <div className="mt-2 flex flex-wrap gap-2">
        <MetricChip
          label="Visibility"
          value={current.visibility?.toFixed?.(1) ?? '—'}
          unit={isMetric ? 'km' : 'mi'}
        />
        <MetricChip
          label="Wind direction"
          value={`${Math.round(current.windDirection)}°`}
        />
      </div>
    </div>
  );
};

export default WeatherCard;
