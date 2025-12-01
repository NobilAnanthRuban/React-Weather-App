import React, { useState } from 'react';
import Sidebar from './Sidebar.jsx';
import TopBar from './TopBar.jsx';

const Layout = ({ children }) => {
  const [cityCoords, setCityCoords] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((open) => !open);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="flex min-h-screen text-slate-50">
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={closeSidebar}
        />
      )}

      <Sidebar mobileOpen={sidebarOpen} onClose={closeSidebar} />

      <main className="flex-1 flex flex-col lg:ml-64">
        <TopBar
          onCityChange={setCityCoords}
          onMenuClick={toggleSidebar}
        />
        <section className="flex-1 overflow-y-auto px-3 sm:px-4 lg:px-8 xl:px-12 py-4 sm:py-6 max-w-6xl mx-auto space-y-5">
          {React.isValidElement(children)
            ? React.cloneElement(children, { cityCoords })
            : children}
        </section>
      </main>
    </div>
  );
};

export default Layout;
