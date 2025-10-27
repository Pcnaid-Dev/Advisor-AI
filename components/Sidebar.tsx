import React from 'react';
import Icon from './Icon';
import { ALL_NAV_ITEMS } from '../constants';
import { useApp } from '../context/AppContext';

const Sidebar: React.FC = () => {
  const { theme, activeView, setActiveView } = useApp(); // Get activeView and setter

  const navItems = ALL_NAV_ITEMS;

  return (
    <aside className="hidden md:flex flex-col w-64 bg-slate-800 text-slate-100">
      <div className="flex items-center justify-center h-20 border-b border-slate-700">
        <Icon type="sparkles" className="h-8 w-8 text-indigo-400" />
        <h1 className="text-2xl font-bold ml-2">Advisor AI</h1>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => (
          <button // Change from <a> to <button>
            key={item.name}
            onClick={() => setActiveView(item.name)} // Set active view on click
            className={`w-full flex items-center px-4 py-2 rounded-lg transition-colors duration-200 text-left ${
              item.name === activeView // Use activeView for styling
                ? `bg-dept-accent text-white`
                : 'text-slate-400 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Icon type={item.icon} className="w-5 h-5" />
            <span className="ml-3">{item.name}</span>
          </button>
        ))}
      </nav>
      <div className="px-4 py-4 border-t border-slate-700">
        <div className="flex items-center p-2 rounded-lg bg-slate-700">
          <Icon type="user" className="w-10 h-10 p-2 bg-slate-600 rounded-full" />
          <div className="ml-3">
            <p className="font-semibold">Advisor Agent</p>
            <p className="text-sm text-slate-400">agent@advisor.ai</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;