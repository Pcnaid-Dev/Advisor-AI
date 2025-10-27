
import React, { useState, useRef, useEffect } from 'react';
import Icon from './Icon';
import { useApp } from '../context/AppContext';

const WorkspaceSwitcher: React.FC = () => {
    // Mock data for workspaces
    const workspaces = [{id: 1, name: 'Acme Retail Inc.'}, {id: 2, name: 'Global Provisions Co.'}];
    const [currentWorkspace, setCurrentWorkspace] = useState(workspaces[0]);
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

     useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [wrapperRef]);

    return (
        <div className="relative" ref={wrapperRef}>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700"
            >
                <Icon type="building" className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                <span className="font-semibold hidden sm:inline">{currentWorkspace.name}</span>
                <Icon type="chevronDown" className={`w-5 h-5 text-gray-400 transition-transform ${isOpen && 'rotate-180'}`} />
            </button>
             {isOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg shadow-lg z-10">
                    {/* List workspaces here */}
                </div>
            )}
        </div>
    );
}

const Header: React.FC = () => {
    const { toggleRightRail, setCommandPaletteOpen, setQuickAddOpen } = useApp();
    
  return (
    <header className="flex-shrink-0 flex items-center justify-between h-20 px-6 bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
      <div className="flex items-center">
        <WorkspaceSwitcher />
      </div>
      <div className="flex items-center space-x-2 sm:space-x-4">
        <button 
            onClick={() => setCommandPaletteOpen(true)}
            className="hidden md:block relative w-full max-w-md text-left text-gray-500 dark:text-gray-400"
        >
            <Icon type="search" className="absolute h-5 w-5 top-1/2 left-3 transform -translate-y-1/2" />
            <span className="block w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-700 hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors">
                Search...
                <kbd className="ml-4 float-right font-sans text-xs bg-gray-200 dark:bg-slate-600 px-1.5 py-0.5 rounded">⌘K</kbd>
            </span>
        </button>
        <button className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-slate-700 focus:outline-none md:hidden" aria-label="Search" onClick={() => setCommandPaletteOpen(true)}>
             <Icon type="search" className="h-6 w-6" />
        </button>
        <button onClick={() => setQuickAddOpen(true)} className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-slate-700 focus:outline-none" aria-label="Quick Add (Q)">
            <Icon type="plus" className="h-6 w-6" />
        </button>
        <button className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-slate-700 focus:outline-none">
          <Icon type="bell" className="h-6 w-6" />
        </button>
        <div className="w-px h-6 bg-gray-200 dark:bg-slate-700 hidden sm:block"></div>
         <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700">
            <Icon type="user" className="w-8 h-8 p-1 bg-slate-200 dark:bg-slate-600 rounded-full" />
        </button>
        <button 
            onClick={toggleRightRail}
            className="p-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none"
            aria-label="Toggle AI Assistant"
        >
            <Icon type="bot" className="h-6 w-6" />
        </button>
      </div>
    </header>
  );
};

export default Header;
