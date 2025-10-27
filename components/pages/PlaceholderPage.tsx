import React from 'react';
import Icon from '../Icon';
import { IconType } from '../Icon';

interface PlaceholderPageProps {
  title: string;
  icon: IconType;
  description: string;
}

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title, icon, description }) => {
  return (
    <div className="p-4 md:p-6 flex flex-col items-center justify-center text-center h-full">
      <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-md">
        <Icon type={icon} className="w-16 h-16 mx-auto mb-4 text-dept-accent" />
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">{title}</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-sm">
          {description}
        </p>
      </div>
    </div>
  );
};

export default PlaceholderPage;