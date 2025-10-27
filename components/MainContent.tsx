import React from 'react';
import Overview from './pages/Overview';
import Icon, { IconType } from './Icon';
import { useApp } from '../context/AppContext';
import PlaceholderPage from './pages/PlaceholderPage';
import { ALL_NAV_ITEMS } from '../constants';

interface ContextTabsProps {
    activeView: string;
    setActiveView: (view: string) => void;
}

const ContextTabs: React.FC<ContextTabsProps> = ({ activeView, setActiveView }) => {
    // This is a placeholder. It would be driven by the current route/object.
    const tabs = [
        { name: 'Overview', icon: 'home' as const },
        { name: 'Permits', icon: 'document' as const },
        { name: 'Projects', icon: 'folder' as const },
        { name: 'Finance', icon: 'creditCard' as const },
        { name: 'Documents', icon: 'document' as const },
    ];

    return (
        <div className="px-6 border-b border-gray-200 dark:border-slate-700">
            <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                {tabs.map(tab => (
                    <button
                        key={tab.name}
                        onClick={() => setActiveView(tab.name)}
                        className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2
                            ${tab.name === activeView
                                ? 'border-dept-accent text-dept-accent'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:border-gray-600'
                            }`
                        }
                    >
                         <Icon type={tab.icon} className="w-5 h-5" />
                         {tab.name}
                    </button>
                ))}
            </nav>
        </div>
    );
}

const MainContent: React.FC = () => {
    const { activeView, setActiveView } = useApp();

    const renderContent = () => {
        if (activeView === 'Overview') {
            return <Overview />;
        }
        
        const navItem = ALL_NAV_ITEMS.find(item => item.name === activeView);

        if (navItem) {
            return (
                <PlaceholderPage 
                    title={navItem.name} 
                    icon={navItem.icon}
                    description={`This is the ${navItem.name} page. Content and functionality will be built out here.`}
                />
            );
        }

        return <Overview />; // Fallback to overview
    };

    return (
        <main className="flex-1 flex flex-col overflow-hidden">
            {/* Context Header would go here (e.g. Entity Name, Location Name) */}
            <ContextTabs activeView={activeView} setActiveView={setActiveView} />
            <div className="flex-1 overflow-y-auto bg-gray-100 dark:bg-gray-900">
                {renderContent()}
            </div>
        </main>
    );
};

export default MainContent;