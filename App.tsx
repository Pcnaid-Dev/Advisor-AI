
import React from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import RightRail from './components/RightRail';
import CommandPalette from './components/CommandPalette';
import { AppProvider, useApp } from './context/AppContext';
import MainContent from './components/MainContent';
import QuickAddSheet from './components/QuickAddSheet';
import FocusModeSwitcher from './components/FocusModeSwitcher';

const AppContent: React.FC = () => {
    const { isRightRailOpen, isQuickAddOpen, focusMode } = useApp();

    React.useEffect(() => {
        document.documentElement.dataset.theme = focusMode.department || 'Executive';
    }, [focusMode.department]);
    
    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header />
                <MainContent />
            </div>
            <RightRail isOpen={isRightRailOpen} />
            <QuickAddSheet isOpen={isQuickAddOpen} />
            <CommandPalette />
            <FocusModeSwitcher />
        </div>
    );
}

const App: React.FC = () => {
  return (
    <AppProvider>
        <AppContent />
    </AppProvider>
  );
};

export default App;
