
import React from 'react';
import AiAssistant from './AiAssistant';
import Icon from './Icon';
import { useApp } from '../context/AppContext';

interface RightRailProps {
    isOpen: boolean;
}

const RightRail: React.FC<RightRailProps> = ({ isOpen }) => {
    const { toggleRightRail } = useApp();
    const tabs = [
        { name: 'AI Assist', icon: 'sparkles' as const },
        { name: 'Activity', icon: 'activity' as const },
        { name: 'Attachments', icon: 'attachment' as const },
        { name: 'People', icon: 'users' as const },
    ];
    const activeTab = 'AI Assist';

    return (
        <aside className={`flex-shrink-0 bg-white dark:bg-slate-800 border-l border-gray-200 dark:border-slate-700 transition-all duration-300 ease-in-out ${isOpen ? 'w-96' : 'w-0'} overflow-hidden`}>
            <div className="flex flex-col h-full">
                <div className="flex items-center justify-between h-20 px-4 border-b border-gray-200 dark:border-slate-700">
                    <div className="flex items-center space-x-2">
                        {tabs.map(tab => (
                             <button key={tab.name} title={tab.name} className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium ${
                                 activeTab === tab.name 
                                 ? 'bg-gray-100 dark:bg-slate-700 text-gray-900 dark:text-gray-100'
                                 : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700'
                             }`}>
                                 <Icon type={tab.icon} className="w-5 h-5" />
                                 <span className="hidden lg:inline">{tab.name}</span>
                             </button>
                        ))}
                    </div>
                    <button onClick={toggleRightRail} className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-slate-700">
                        <Icon type="x" className="w-6 h-6" />
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {activeTab === 'AI Assist' && <AiAssistant />}
                    {/* Other tab panels will go here */}
                </div>
            </div>
        </aside>
    );
};

export default RightRail;
