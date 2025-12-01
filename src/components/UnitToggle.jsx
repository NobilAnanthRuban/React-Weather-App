import React from 'react';

const UnitToggle = ({ units, onChange }) => {
  const isMetric = units === 'metric';
  return (
    <div className="inline-flex items-center rounded-full bg-slate-900/70 border border-slate-700/80 p-1 text-xs">
      <button
        type="button"
        onClick={() => onChange('metric')}
        className={`px-3 py-1 rounded-full transition ${
          isMetric ? 'bg-cyan-500 text-slate-900 shadow-neon' : 'text-slate-400'
        }`}
      >
        °C
      </button>
      <button
        type="button"
        onClick={() => onChange('imperial')}
        className={`px-3 py-1 rounded-full transition ${
          !isMetric
            ? 'bg-cyan-500 text-slate-900 shadow-neon'
            : 'text-slate-400'
        }`}
      >
        °F
      </button>
    </div>
  );
};

export default UnitToggle;
