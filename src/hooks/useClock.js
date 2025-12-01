import { useEffect, useState } from 'react';

const pad2 = (n) => String(n).padStart(2, '0');

export const useClock = () => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  const time = `${pad2(hours)}:${pad2(minutes)}:${pad2(seconds)}`; // HH:MM:SS [web:184][web:190]
  const date = `${pad2(now.getDate())}:${pad2(
    now.getMonth() + 1
  )}:${now.getFullYear()}`; // DD:MM:YYYY [web:185][web:195]

  // angles for analog clock
  const secondDeg = seconds * 6;
  const minuteDeg = minutes * 6 + seconds * 0.1;
  const hourDeg = (hours % 12) * 30 + minutes * 0.5;

  return { time, date, hourDeg, minuteDeg, secondDeg };
};
