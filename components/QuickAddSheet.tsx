
import React from 'react';
import Icon from './Icon';
import { useApp } from '../context/AppContext';
import { useKeyPress } from '../hooks/useKeyPress';

interface QuickAddSheetProps {
    isOpen: boolean;
}

const QuickAddSheet: React.FC<QuickAddSheetProps> = ({ isOpen }) => {
    const { setQuickAddOpen } = useApp();
    useKeyPress(() => setQuickAddOpen(true), 'q', 'none');
    useKeyPress(() => setQuickAddOpen(false), 'Escape', 'none');

    return (
        <>
            <div 
                className={`fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setQuickAddOpen(false)}
            />
            <aside className={`fixed top-0 right-0 h-full bg-white dark:bg-slate-800 border-l border-gray-200 dark:border-slate-700 transition-transform duration-300 ease-in-out z-40 ${isOpen ? 'translate-x-0' : 'translate-x-full'} w-full max-w-md`}>
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between h-20 px-4 border-b border-gray-200 dark:border-slate-700">
                        <h2 className="text-lg font-semibold">Quick Add</h2>
                        <button onClick={() => setQuickAddOpen(false)} className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-slate-700">
                            <Icon type="x" className="w-6 h-6" />
                        </button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-6">
                        <p className="text-gray-600 dark:text-gray-400">
                            Use this panel to quickly create new items. The form here would be pre-filled based on your current context (e.g., selected Entity or Location).
                        </p>
                        {/* A form for creating a Task, Event, etc. would go here */}
                    </div>
                </div>
            </aside>
        </>
    );
};

export default QuickAddSheet;
