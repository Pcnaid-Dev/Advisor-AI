
import React from 'react';
import Icon from './Icon';
import { NAV_ITEMS } from '../constants';

const Sidebar: React.FC = () => {
  const activeItem = 'Chat';

  return (
    <aside className="hidden md:flex flex-col w-64 bg-slate-800 text-slate-100">
      <div className="flex items-center justify-center h-20 border-b border-slate-700">
        <Icon type="sparkles" className="h-8 w-8 text-indigo-400" />
        <h1 className="text-2xl font-bold ml-2">Advisor AI</h1>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        {NAV_ITEMS.map((item) => (
          <a
            key={item.name}
            href={item.path}
            className={`flex items-center px-4 py-2 rounded-lg transition-colors duration-200 ${
              item.name === activeItem
                ? 'bg-indigo-600 text-white'
                : 'text-slate-400 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Icon type={item.icon} className="w-5 h-5" />
            <span className="ml-3">{item.name}</span>
          </a>
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
