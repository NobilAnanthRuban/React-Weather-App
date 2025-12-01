import React from 'react';

const ErrorBanner = ({ message }) => {
  if (!message) return null;
  return (
    <div className="glass-card border border-neo-danger/60 text-sm text-rose-200 bg-rose-900/40 px-4 py-3 flex items-start gap-2">
      <span className="text-lg">⚠️</span>
      <p>{message}</p>
    </div>
  );
};

export default ErrorBanner;
