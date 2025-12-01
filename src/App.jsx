import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Dashboard from './pages/Dashboard.jsx';
import ForecastPage from './pages/ForecastPage.jsx';
import AirQualityPage from './pages/AirQualityPage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';
import { ThemeProvider } from './hooks/useTheme.js';

const App = () => {
  return (
    <ThemeProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/forecast" element={<ForecastPage />} />
          <Route path="/air-quality" element={<AirQualityPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </ThemeProvider>
  );
};

export default App;
