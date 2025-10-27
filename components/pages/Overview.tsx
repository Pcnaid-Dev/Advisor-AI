import React from 'react';
import { useApp } from '../../context/AppContext';
import Icon from '../Icon';

const Overview: React.FC = () => {
    const { focusMode } = useApp();

    return (
        <div className="p-4 md:p-6">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
                <div className="flex items-center">
                    <h2 className="text-xl font-semibold">Welcome to your Workspace</h2>
                </div>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                   This is your main dashboard. You can navigate using the sidebar, or use ⌘+K for commands. Current focus: {focusMode.department || 'Overall'}.
                </p>
            </div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow">
                    <h3 className="font-semibold">My Tasks</h3>
                    <p className="mt-2 text-sm text-gray-500">No tasks assigned.</p>
                </div>
                <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow col-span-1 md:col-span-2">
                    <h3 className="font-semibold">Recent Activity</h3>
                    <p className="mt-2 text-sm text-gray-500">No recent activity to show.</p>
                </div>
                 <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow col-span-full">
                    <h3 className="font-semibold">Upcoming Permits</h3>
                    <p className="mt-2 text-sm text-gray-500">No upcoming permits due.</p>
                </div>
            </div>
        </div>
    );
};

export default Overview;