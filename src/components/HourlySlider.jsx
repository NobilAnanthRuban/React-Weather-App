import React, { useMemo, useState } from 'react';
import { formatHour } from '../utils/weatherUtils.js';

const HourlySlider = ({ hourly, units }) => {
  const [index, setIndex] = useState(0);
  const isMetric = units === 'metric';

  const maxIndex = useMemo(
    () => Math.max(0, Math.min(23, (hourly || []).length - 1)),
    [hourly]
  );

  if (!hourly?.length) return null;

  const current = hourly[index];

  return (
    <div className="glass-card p-4 sm:p-5">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs uppercase tracking-[0.25em] text-cyan-300">
          Hourly
        </p>
        <p className="text-xs text-slate-400">
          Next {maxIndex + 1} hours • {formatHour(current.time)}
        </p>
      </div>

      <input
        type="range"
        min={0}
        max={maxIndex}
        value={index}
        onChange={(e) => setIndex(Number(e.target.value))}
        className="w-full hourly-slider cursor-pointer mb-3 bg-transparent"
      />

      <div className="flex items-center justify-between text-xs text-slate-300">
        <div className="flex flex-col gap-1">
          <p className="text-[11px] uppercase tracking-wide text-slate-400">
            Temperature
          </p>
          <p className="text-sm text-slate-100">
            {Math.round(current.temperature)}
            {isMetric ? '°C' : '°F'}
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-[11px] uppercase tracking-wide text-slate-400">
            Wind / Humidity
          </p>
          <p className="text-sm text-slate-100">
            {Math.round(current.windSpeed)}
            {isMetric ? ' km/h' : ' mph'} · {current.humidity}
            %
          </p>
        </div>
      </div>
    </div>
  );
};

export default HourlySlider;
