import React, { createContext, useState, useContext, ReactNode } from 'react';
import { DEPARTMENTS } from '../constants';
import { Department } from '../types';

interface FocusMode {
    department: Department | null;
}

export type ViewName = string;

interface AppContextType {
    focusMode: FocusMode;
    setFocusMode: (mode: FocusMode) => void;
    theme: typeof DEPARTMENTS[number]['theme'];
    isRightRailOpen: boolean;
    toggleRightRail: () => void;
    isCommandPaletteOpen: boolean,
    setCommandPaletteOpen: (isOpen: boolean) => void;
    isQuickAddOpen: boolean;
    setQuickAddOpen: (isOpen: boolean) => void;
    activeView: ViewName;
    setActiveView: (view: ViewName) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [focusMode, setFocusMode] = useState<FocusMode>({ department: 'Executive' });
    const [isRightRailOpen, setRightRailOpen] = useState(false);
    const [isCommandPaletteOpen, setCommandPaletteOpen] = useState(false);
    const [isQuickAddOpen, setQuickAddOpen] = useState(false);
    const [activeView, setActiveView] = useState<ViewName>('Overview');
    
    const theme = DEPARTMENTS.find(d => d.id === focusMode.department)?.theme || DEPARTMENTS[0].theme;
    
    const toggleRightRail = () => setRightRailOpen(prev => !prev);

    return (
        <AppContext.Provider value={{ 
            focusMode, 
            setFocusMode, 
            theme, 
            isRightRailOpen, 
            toggleRightRail, 
            isCommandPaletteOpen, 
            setCommandPaletteOpen,
            isQuickAddOpen,
            setQuickAddOpen,
            activeView,
            setActiveView,
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
};