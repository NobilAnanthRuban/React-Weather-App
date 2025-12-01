import React from 'react';

const MetricChip = ({ label, value, unit, accent }) => {
  return (
    <div className="flex flex-col gap-1 px-3 py-2 rounded-2xl bg-slate-900/70 border border-slate-700/70">
      <span className="text-[10px] uppercase tracking-wide text-slate-400">
        {label}
      </span>
      <span className={`text-sm font-semibold ${accent || 'text-slate-100'}`}>
        {value}
        {unit && <span className="text-xs ml-0.5 text-slate-400">{unit}</span>}
      </span>
    </div>
  );
};

export default MetricChip;
