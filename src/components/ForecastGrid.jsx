import React from 'react';
import { formatDay, interpretWeatherCode } from '../utils/weatherUtils.js';

const ForecastGrid = ({ daily, units }) => {
  if (!daily?.length) return null;
  const isMetric = units === 'metric';

  return (
    <div className="glass-card p-4 sm:p-5">
      <p className="text-xs uppercase tracking-[0.25em] text-cyan-300 mb-3">
        7‑Day Forecast
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
        {daily.slice(0, 7).map((d) => (
          <div
            key={d.date}
            className="flex flex-col gap-1 px-3 py-2 rounded-xl bg-slate-900/80 border border-slate-700/60 text-xs"
          >
            <p className="text-[11px] text-slate-400">{formatDay(d.date)}</p>
            <p className="text-sm text-slate-100">
              {Math.round(d.max)}
              {isMetric ? '°' : '°'} / {Math.round(d.min)}
              {isMetric ? '°' : '°'}
            </p>
            <p className="text-[11px] text-slate-400">
              {interpretWeatherCode(d.code)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastGrid;
