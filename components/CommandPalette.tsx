import React, { useState, useEffect, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { useKeyPress } from '../hooks/useKeyPress';
import { getCommands, Command } from '../constants'; // Import getCommands
import Icon from './Icon';


const CommandPalette: React.FC = () => {
    // Get all necessary actions from context
    const { isCommandPaletteOpen, setCommandPaletteOpen, setActiveView, setQuickAddOpen, setFocusMode } = useApp();
    const [search, setSearch] = useState('');
    
    useKeyPress(() => setCommandPaletteOpen(true), 'k');

    // Generate commands with actions
    const commands = useMemo(() => getCommands({ 
        setActiveView, 
        setQuickAddOpen, 
        setFocusMode 
    }), [setActiveView, setQuickAddOpen, setFocusMode]);

    const filteredCommands = useMemo(() => {
        if (!search) {
            return commands;
        }
        return commands.filter(cmd => cmd.name.toLowerCase().includes(search.toLowerCase()));
    }, [search, commands]);

    const groupedCommands = useMemo(() => {
        const grouped = filteredCommands.reduce((acc, command) => {
            const key = command.type;
            if (!acc[key]) {
                acc[key] = [];
            }
            acc[key].push(command);
            return acc;
        }, {} as Record<Command['type'], Command[]>);

        return Object.entries(grouped);
    }, [filteredCommands]);


    if (!isCommandPaletteOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20"
            onClick={() => setCommandPaletteOpen(false)}
        >
            <div 
                className="w-full max-w-lg bg-white dark:bg-slate-800 rounded-lg shadow-xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="relative">
                    <Icon type="search" className="absolute h-5 w-5 top-1/2 left-4 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Run actions, navigate, or retrieve..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        autoFocus
                        className="w-full pl-11 pr-4 py-3 bg-transparent text-gray-800 dark:text-gray-200 focus:outline-none"
                    />
                </div>
                <ul className="max-h-96 overflow-y-auto border-t border-gray-200 dark:border-slate-700">
                   {groupedCommands.map(([type, commands]) => (
                       <li key={type}>
                           <h3 className="px-4 pt-3 pb-1 text-xs font-semibold text-gray-500 uppercase tracking-wider">{type}</h3>
                           <ul>
                               {commands.map((command, index) => (
                                    <li key={index}>
                                        <button
                                            onClick={() => {
                                                command.action();
                                                setCommandPaletteOpen(false);
                                            }}
                                            className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-dept-accent hover:text-white transition-colors"
                                        >
                                            <Icon type={command.icon} className="w-5 h-5 mr-3 text-gray-400" />
                                            {command.name}
                                        </button>
                                    </li>
                               ))}
                           </ul>
                       </li>
                   ))}
                    {filteredCommands.length === 0 && (
                        <li className="px-4 py-3 text-sm text-center text-gray-500">
                            No commands found.
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default CommandPalette;