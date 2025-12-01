import React from 'react';

const LoadingSpinner = ({ label = 'Loading' }) => (
  <div className="flex items-center gap-3 text-sm text-slate-400">
    <span className="h-4 w-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
    <span>{label}</span>
  </div>
);

export default LoadingSpinner;
