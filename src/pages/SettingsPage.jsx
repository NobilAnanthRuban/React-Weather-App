import React from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage.js';

const Settings = () => {
  const [units, setUnits] = useLocalStorage('neo-units', 'metric');
  const [theme, setTheme] = useLocalStorage('neo-theme', 'dark');
  const [windUnit, setWindUnit] = useLocalStorage('neo-wind-unit', 'kmh');
  const [refreshInterval, setRefreshInterval] = useLocalStorage(
    'neo-refresh-interval',
    '30'
  );
  const [bgStyle, setBgStyle] = useLocalStorage('neo-bg-style', 'image');
  const [animations, setAnimations] = useLocalStorage('neo-animations', 'on');

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold text-slate-50">
          Settings
        </h1>
        <p className="text-[11px] sm:text-xs text-slate-400">
          Personalize units, theme, background, and behavior of your climatic dashboard.
        </p>
      </div>

      {/* Display & theme */}
      <section className="glass-card p-4 sm:p-5 space-y-4">
        <h2 className="text-sm sm:text-base font-semibold text-slate-100">
          Display & Theme
        </h2>

        <div className="grid gap-3 sm:grid-cols-2">
          {/* Temperature units */}
          <SettingBlock
            title="Temperature units"
            description="Choose how temperatures are displayed across the dashboard."
          >
            <div className="inline-flex rounded-full bg-white/0 border border-white/15 p-1 text-xs sm:text-sm">
              <button
                type="button"
                onClick={() => setUnits('metric')}
                className={
                  'px-3 py-1.5 rounded-full ' +
                  (units === 'metric'
                    ? 'bg-white/10 text-slate-50'
                    : 'bg-white/0 text-slate-200')
                }
              >
                Celsius (°C)
              </button>
              <button
                type="button"
                onClick={() => setUnits('imperial')}
                className={
                  'px-3 py-1.5 rounded-full ' +
                  (units === 'imperial'
                    ? 'bg-white/10 text-slate-50'
                    : 'bg-white/0 text-slate-200')
                }
              >
                Fahrenheit (°F)
              </button>
            </div>
          </SettingBlock>

          {/* Wind units */}
          <SettingBlock
            title="Wind speed units"
            description="Control how wind and gust speeds are shown."
          >
            <div className="flex flex-wrap gap-2 text-xs sm:text-sm">
              <UnitChip
                label="km/h"
                active={windUnit === 'kmh'}
                onClick={() => setWindUnit('kmh')}
              />
              <UnitChip
                label="mph"
                active={windUnit === 'mph'}
                onClick={() => setWindUnit('mph')}
              />
              <UnitChip
                label="m/s"
                active={windUnit === 'ms'}
                onClick={() => setWindUnit('ms')}
              />
            </div>
          </SettingBlock>

          {/* Theme */}
          <SettingBlock
            title="Theme"
            description="Switch between dark and light appearance."
          >
            <div className="inline-flex rounded-full bg-white/0 border border-white/15 p-1 text-xs sm:text-sm">
              <button
                type="button"
                onClick={() => setTheme('dark')}
                className={
                  'px-3 py-1.5 rounded-full flex items-center gap-1 ' +
                  (theme === 'dark'
                    ? 'bg-white/10 text-slate-50'
                    : 'bg-white/0 text-slate-200')
                }
              >
                <span>🌙</span>
                <span>Dark</span>
              </button>
              <button
                type="button"
                onClick={() => setTheme('light')}
                className={
                  'px-3 py-1.5 rounded-full flex items-center gap-1 ' +
                  (theme === 'light'
                    ? 'bg-white/10 text-slate-50'
                    : 'bg-white/0 text-slate-200')
                }
              >
                <span>☀️</span>
                <span>Light</span>
              </button>
            </div>
          </SettingBlock>

          {/* Background style */}
          <SettingBlock
            title="Background style"
            description="Choose between the seashore image or a glass-only interface."
          >
            <div className="inline-flex rounded-full bg-white/0 border border-white/15 p-1 text-xs sm:text-sm">
              <button
                type="button"
                onClick={() => setBgStyle('image')}
                className={
                  'px-3 py-1.5 rounded-full ' +
                  (bgStyle === 'image'
                    ? 'bg-white/10 text-slate-50'
                    : 'bg-white/0 text-slate-200')
                }
              >
                Image + glass
              </button>
              <button
                type="button"
                onClick={() => setBgStyle('glass')}
                className={
                  'px-3 py-1.5 rounded-full ' +
                  (bgStyle === 'glass'
                    ? 'bg-white/10 text-slate-50'
                    : 'bg-white/0 text-slate-200')
                }
              >
                Glass only
              </button>
            </div>
          </SettingBlock>
        </div>
      </section>

      {/* Data & refresh */}
      <section className="glass-card p-4 sm:p-5 space-y-4">
        <h2 className="text-sm sm:text-base font-semibold text-slate-100">
          Data & Refresh
        </h2>

        <div className="grid gap-3 sm:grid-cols-2">
          <SettingBlock
            title="Auto-refresh interval"
            description="How often background data should be refreshed."
          >
            <select
              value={refreshInterval}
              onChange={(e) => setRefreshInterval(e.target.value)}
              className="bg-dark/5 border border-white/20 rounded-lg px-2 py-1.5 text-xs sm:text-sm text-slate-100 focus:outline-none focus:ring-1 focus:ring-white/60"
            >
              <option value="15" >Every 15 minutes</option>
              <option value="30">Every 30 minutes</option>
              <option value="60">Every 1 hour</option>
              <option value="180">Every 3 hours</option>
              <option value="manual">Manual only</option>
            </select>
          </SettingBlock>

          <SettingBlock
            title="Animations"
            description="Disable heavy animations if you prefer a calmer experience."
          >
            <div className="inline-flex rounded-full bg-white/0 border border-white/15 p-1 text-xs sm:text-sm">
              <button
                type="button"
                onClick={() => setAnimations('on')}
                className={
                  'px-3 py-1.5 rounded-full ' +
                  (animations === 'on'
                    ? 'bg-white/10 text-slate-50'
                    : 'bg-white/0 text-slate-200')
                }
              >
                Enabled
              </button>
              <button
                type="button"
                onClick={() => setAnimations('off')}
                className={
                  'px-3 py-1.5 rounded-full ' +
                  (animations === 'off'
                    ? 'bg-white/10 text-slate-50'
                    : 'bg-white/0 text-slate-200')
                }
              >
                Reduced motion
              </button>
            </div>
          </SettingBlock>
        </div>
      </section>
    </div>
  );
};

const SettingBlock = ({ title, description, children }) => (
  <div className="space-y-2">
    <div>
      <p className="text-xs sm:text-sm font-medium text-slate-100">
        {title}
      </p>
      <p className="text-[10px] sm:text-xs text-slate-400">
        {description}
      </p>
    </div>
    {children}
  </div>
);

const UnitChip = ({ label, active, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={
      'px-3 py-1.5 rounded-full border text-xs sm:text-sm ' +
      (active
        ? 'border-white/60 bg-white/10 text-slate-50'
        : 'border-white/20 bg-white/0 text-slate-200 hover:bg-white/5')
    }
  >
    {label}
  </button>
);

export default Settings;
