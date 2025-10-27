import { IconType } from "./components/Icon";
import { Department } from "./types";

export interface NavItem {
  name: string;
  icon: IconType;
  path: string; // Path is now conceptual, not a real href
}

export const DEPARTMENTS: { id: Department; name: string; icon: IconType; theme: { primary: string; bg: string; } }[] = [
  { id: 'Executive', name: 'Executive', icon: 'sparkles', theme: { primary: 'text-indigo-400', bg: 'bg-indigo-600' } },
  { id: 'Operations', name: 'Operations', icon: 'cog', theme: { primary: 'text-cyan-400', bg: 'bg-cyan-600' } },
  { id: 'Finance', name: 'Finance', icon: 'creditCard', theme: { primary: 'text-green-400', bg: 'bg-green-600' } },
  { id: 'HR', name: 'Human Resources', icon: 'users', theme: { primary: 'text-pink-400', bg: 'bg-pink-600' } },
  { id: 'Legal', name: 'Legal', icon: 'document', theme: { primary: 'text-gray-400', bg: 'bg-gray-600' } },
  { id: 'Marketing', name: 'Marketing', icon: 'sparkles', theme: { primary: 'text-orange-400', bg: 'bg-orange-600' } },
  { id: 'Compliance', name: 'Compliance', icon: 'check', theme: { primary: 'text-blue-400', bg: 'bg-blue-600' } },
  { id: 'IT', name: 'IT', icon: 'bot', theme: { primary: 'text-amber-400', bg: 'bg-amber-600' } },
];


export const ALL_NAV_ITEMS: NavItem[] = [
  { name: 'Overview', icon: 'home', path: '#' },
  { name: 'Entities', icon: 'building', path: '#' },
  { name: 'Locations', icon: 'store', path: '#' },
  { name: 'Permits', icon: 'document', path: '#' },
  { name: 'Projects', icon: 'folder', path: '#' },
  { name: 'Calendar', icon: 'calendar', path: '#' },
  { name: 'Inbox', icon: 'inbox', path: '#' },
  { name: 'Documents', icon: 'document', path: '#' },
  { name: 'Finance', icon: 'creditCard', path: '#' },
  { name: 'HR', icon: 'users', path: '#' },
  { name: 'Vendors', icon: 'user', path: '#' },
  { name: 'Reports', icon: 'chartBar', path: '#' },
  { name: 'Automation', icon: 'cog', path: '#' },
  { name: 'Agents', icon: 'bot', path: '#' },
  { name: 'Settings', icon: 'settings', path: '#' },
];

export interface Command {
    name: string;
    type: 'Navigation' | 'Create' | 'Contextual' | 'Focus Mode' | 'Admin';
    action: () => void;
    icon: IconType;
}

// Refactor COMMANDS to a function
export const getCommands = (actions: { 
    setActiveView: (view: string) => void;
    setQuickAddOpen: (isOpen: boolean) => void;
    setFocusMode: (mode: { department: Department | null }) => void;
}): Command[] => [
    // Navigation
    { name: 'Go to Overview', type: 'Navigation', action: () => actions.setActiveView('Overview'), icon: 'home' },
    { name: 'Go to Entities', type: 'Navigation', action: () => actions.setActiveView('Entities'), icon: 'building' },
    { name: 'Go to Locations', type: 'Navigation', action: () => actions.setActiveView('Locations'), icon: 'store' },
    { name: 'Go to Projects', type: 'Navigation', action: () => actions.setActiveView('Projects'), icon: 'folder' },
    { name: 'Go to Settings', type: 'Navigation', action: () => actions.setActiveView('Settings'), icon: 'settings' },
    { name: 'Go to Reports', type: 'Navigation', action: () => actions.setActiveView('Reports'), icon: 'chartBar' },

    // Create
    { name: 'New Task', type: 'Create', action: () => actions.setQuickAddOpen(true), icon: 'plus' },
    { name: 'New Event', type: 'Create', action: () => actions.setQuickAddOpen(true), icon: 'calendar' },
    { name: 'New Project', type: 'Create', action: () => actions.setQuickAddOpen(true), icon: 'folder' },
    { name: 'New Permit', type: 'Create', action: () => actions.setQuickAddOpen(true), icon: 'document' },
    { name: 'Upload Document', type: 'Create', action: () => actions.setQuickAddOpen(true), icon: 'document' },
    { name: 'New Note', type: 'Create', action: () => actions.setQuickAddOpen(true), icon: 'document' },

    // Contextual
    { name: 'Attach file to current object', type: 'Contextual', action: () => console.log('Attach file to current object'), icon: 'plus' },
    { name: 'Summarize this page', type: 'Contextual', action: () => console.log('Summarize this page'), icon: 'sparkles' },
    { name: 'Email stakeholders', type: 'Contextual', action: () => console.log('Email stakeholders'), icon: 'inbox' },
    { name: 'Start call', type: 'Contextual', action: () => console.log('Start call'), icon: 'chat' },
    { name: 'Pin to Dashboard', type: 'Contextual', action: () => console.log('Pin to Dashboard'), icon: 'plus' },

    // Focus Mode - wire up all departments
    ...DEPARTMENTS.map(d => ({
        name: `Enter Focus: ${d.name}`, 
        type: 'Focus Mode' as const, 
        action: () => actions.setFocusMode({ department: d.id }), 
        icon: d.icon
    })),
    { name: 'Exit Focus Mode', type: 'Focus Mode', action: () => actions.setFocusMode({ department: null }), icon: 'x' },

    // Admin
    { name: 'Simulate Role…', type: 'Admin', action: () => console.log('Simulate Role…'), icon: 'user' },
    { name: 'Theme: Department Colors', type: 'Admin', action: () => console.log('Theme: Department Colors'), icon: 'sparkles' },
];