import React from 'react';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen text-slate-100 overflow-hidden font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden relative z-10 p-4">
        <header className="glass-panel rounded-2xl mb-4 p-4 flex justify-between items-center transition-all duration-300">
          <h1 className="text-2xl font-bold premium-gradient-text tracking-wide">Nexus Inventory System</h1>
          <div className="flex items-center space-x-4">
            <button className="text-slate-400 hover:text-white relative p-2 rounded-full hover:bg-slate-700/50 transition-colors">
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-slate-900 animate-pulse"></span>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto w-full animate-fade-in relative">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
