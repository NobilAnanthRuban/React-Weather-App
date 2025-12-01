import React from 'react';
import MetricChip from './MetricChip.jsx';

const colorClassByKey = {
  good: 'from-aqi-good/30 to-emerald-500/20 border-aqi-good/70',
  moderate: 'from-aqi-moderate/30 to-yellow-500/20 border-aqi-moderate/70',
  unhealthy: 'from-aqi-unhealthy/30 to-orange-500/20 border-aqi-unhealthy/70',
  veryUnhealthy: 'from-aqi-veryUnhealthy/30 to-red-500/20 border-aqi-veryUnhealthy/70',
  hazardous: 'from-aqi-hazardous/30 to-fuchsia-500/20 border-aqi-hazardous/70'
};

const AQICard = ({ aqi }) => {
  if (!aqi) {
    return (
      <div className="glass-card p-5 sm:p-6 flex flex-col gap-3">
        <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
          Air Quality
        </p>
        <p className="text-sm text-slate-300">
          Waiting for nearest station data…
        </p>
      </div>
    );
  }

  const accent = colorClassByKey[aqi.colorKey] || colorClassByKey.moderate;

  return (
    <div
      className={`glass-card p-5 sm:p-6 bg-gradient-to-br ${accent} shadow-neon`}
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-slate-200">
            Air Quality Index
          </p>
          <div className="flex items-end gap-2 mt-2">
            <p className="text-3xl font-semibold text-white">
              {aqi.index != null ? Math.round(aqi.index) : '—'}
            </p>
            <p className="text-sm text-slate-200">{aqi.category}</p>
          </div>
          <p className="mt-1 text-[11px] text-slate-100/80">
            {aqi.location}, {aqi.city} • {aqi.country}
          </p>
        </div>
        <div className="flex flex-col gap-1 text-right text-xs text-slate-100">
          <p>Good: 0–30</p>
          <p>Moderate: 31–60</p>
          <p>Unhealthy: 61–90</p>
          <p>Very Unhealthy: 91–120</p>
          <p>Hazardous: 121+</p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <MetricChip
          label="PM2.5"
          value={aqi.components.pm25 ?? '—'}
          unit={aqi.unit}
          accent="text-emerald-100"
        />
        <MetricChip
          label="PM10"
          value={aqi.components.pm10 ?? '—'}
          unit={aqi.unit}
          accent="text-yellow-100"
        />
        <MetricChip
          label="NO₂"
          value={aqi.components.no2 ?? '—'}
          unit={aqi.unit}
          accent="text-orange-100"
        />
        <MetricChip
          label="O₃"
          value={aqi.components.o3 ?? '—'}
          unit={aqi.unit}
          accent="text-fuchsia-100"
        />
      </div>
    </div>
  );
};

export default AQICard;
