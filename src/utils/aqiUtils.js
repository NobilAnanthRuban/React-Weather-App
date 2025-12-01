export const parseAQIResponse = (data) => {
  const result = data?.results?.[0];
  if (!result) return null;

  const measurements = result.measurements || [];

  const pm25 = measurements.find((m) => m.parameter === 'pm25');
  const pm10 = measurements.find((m) => m.parameter === 'pm10');
  const no2 = measurements.find((m) => m.parameter === 'no2');
  const o3 = measurements.find((m) => m.parameter === 'o3');

  // Use PM2.5 as a proxy index if available
  const pm25Value = pm25?.value ?? null;
  const index = pm25Value ?? pm10?.value ?? no2?.value ?? o3?.value ?? null;

  const { label, colorKey } = classifyAQI(index);

  return {
    location: result.location,
    city: result.city,
    country: result.country,
    index,
    category: label,
    colorKey,
    components: {
      pm25: pm25?.value ?? null,
      pm10: pm10?.value ?? null,
      no2: no2?.value ?? null,
      o3: o3?.value ?? null
    },
    unit: pm25?.unit || pm10?.unit || no2?.unit || o3?.unit || 'µg/m³'
  };
};

export const classifyAQI = (value) => {
  if (value == null) {
    return { label: 'Unknown', colorKey: 'moderate' };
  }
  if (value <= 30) return { label: 'Good', colorKey: 'good' };
  if (value <= 60) return { label: 'Moderate', colorKey: 'moderate' };
  if (value <= 90) return { label: 'Unhealthy', colorKey: 'unhealthy' };
  if (value <= 120)
    return { label: 'Very Unhealthy', colorKey: 'veryUnhealthy' };
  return { label: 'Hazardous', colorKey: 'hazardous' };
};
