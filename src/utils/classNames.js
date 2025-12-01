export const cn = (...values) =>
  values
    .flatMap((v) => (typeof v === 'string' ? v : v && typeof v === 'object' ? Object.entries(v).filter(([, on]) => on).map(([cls]) => cls) : []))
    .join(' ');
