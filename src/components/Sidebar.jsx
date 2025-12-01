import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '../utils/classNames.js';

const linkBase =
  'flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors duration-200';

const Sidebar = ({ mobileOpen, onClose }) => {
  return (
    <aside
      className={cn(
        'fixed inset-y-0 left-0 w-64 z-40',
        'border-r border-white/10 bg-white/10 backdrop-blur-glass shadow-[0_10px_40px_rgba(15,23,42,0.8)]',
        'flex flex-col',
        'transform transition-transform duration-300',
        mobileOpen ? 'translate-x-0' : '-translate-x-full',
        'lg:translate-x-0' // always visible on lg+
      )}
    >
      <div className="px-5 py-6 border-b border-white/10 flex items-center gap-3">
        <div className="h-9 w-9 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md" />
        <div>
          <p className="text-sm font-semibold tracking-wide text-slate-100">
            Climatic Weather
          </p>
          <p className="text-xs text-slate-400">Atmospheric Dashboard</p>
        </div>

        {/* Close button only on small screens */}
        <button
          type="button"
          onClick={onClose}
          className="ml-auto lg:hidden text-slate-300 hover:text-slate-50 text-xl"
          aria-label="Close navigation"
        >
          ×
        </button>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
        <NavItem to="/" label="Dashboard" icon="🌤" onClick={onClose} />
        <NavItem to="/forecast" label="Forecast" icon="📅" onClick={onClose} />
        <NavItem to="/air-quality" label="Air Quality" icon="💨" onClick={onClose} />
        <NavItem to="/settings" label="Settings" icon="⚙️" onClick={onClose} />
      </nav>

      <div className="px-5 py-4 text-[11px] text-slate-500 border-t border-white/10">
        <p>v{__APP_VERSION__}</p>
        <p>Data via Open‑Meteo & OpenAQ.</p>
        <p>Created and Crafted by Nobil</p>
      </div>
    </aside>
  );
};

const NavItem = ({ to, label, icon, onClick }) => {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        cn(
          linkBase,
          isActive
            ? 'bg-white/15 text-slate-50 border border-white/25'
            : 'text-slate-300 hover:text-slate-50 hover:bg-white/5'
        )
      }
    >
      <span className="text-lg">{icon}</span>
      <span>{label}</span>
    </NavLink>
  );
};

export default Sidebar;
