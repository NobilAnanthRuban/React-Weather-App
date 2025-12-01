import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: 'http://localhost:5173' }));

app.get('/aqi', async (req, res) => {
  const { lat, lon } = req.query;
  if (!lat || !lon) {
    return res.status(400).json({ error: 'lat and lon required' });
  }

  try {
    const url = 'https://api.openaq.org/v2/latest';
    const { data } = await axios.get(url, {
      params: {
        coordinates: `${lat},${lon}`,
        radius: 15000,
        limit: 1
      }
    });
    res.json(data);
  } catch (err) {
    console.error('AQI proxy error', err?.response?.status, err?.message);
    res.status(500).json({ error: 'Failed to fetch AQI' });
  }
});

app.listen(PORT, () => {
  console.log(`AQI proxy running on http://localhost:${PORT}`);
});
