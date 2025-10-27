
import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { DEPARTMENTS } from '../constants';
import Icon from './Icon';
import { Department } from '../types';

const FocusModeSwitcher: React.FC = () => {
    const { focusMode, setFocusMode } = useApp();
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const currentDepartment = DEPARTMENTS.find(d => d.id === focusMode.department);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [wrapperRef]);
    
    const handleDeptChange = (deptId: Department) => {
        setFocusMode({ department: deptId });
        setIsOpen(false);
    };

    return (
        <div className="fixed bottom-6 left-6 z-20" ref={wrapperRef}>
            {isOpen && (
                <div className="absolute bottom-full left-0 mb-2 w-72 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg shadow-lg z-10">
                    <div className="p-2">
                        <h3 className="px-2 py-1 text-xs font-semibold text-gray-500 uppercase">Focus Department</h3>
                        <ul>
                            {DEPARTMENTS.map(dep => (
                                <li key={dep.id}>
                                    <button
                                        onClick={() => handleDeptChange(dep.id)}
                                        className={`w-full flex items-center px-2 py-1.5 my-0.5 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-slate-700 ${focusMode.department === dep.id ? 'font-bold text-indigo-500' : 'text-gray-700 dark:text-gray-300'}`}
                                    >
                                        <Icon type={dep.icon} className={`w-5 h-5 mr-3 ${focusMode.department === dep.id ? 'text-indigo-500' : 'text-gray-400'}`} />
                                        {dep.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-2 px-4 py-2 rounded-full shadow-lg bg-white dark:bg-slate-700 hover:bg-gray-100 dark:hover:bg-slate-600 border border-gray-200 dark:border-transparent"
                aria-label="Toggle Focus Mode"
            >
                {currentDepartment && <Icon type={currentDepartment.icon} className={`w-6 h-6 text-indigo-500`} />}
                <span className="font-semibold">{currentDepartment?.name || 'Focus Mode'}</span>
                <Icon type="chevronDown" className={`w-5 h-5 text-gray-400 transition-transform ${isOpen && 'rotate-180'}`} />
            </button>
        </div>
    );
};

export default FocusModeSwitcher;
