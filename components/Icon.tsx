
import React from 'react';

export type IconType = 'home' | 'building' | 'store' | 'folder' | 'calendar' | 'chat' | 'document' | 'creditCard' | 'sparkles' | 'search' | 'bell' | 'user' | 'send' | 'copy' | 'check' | 'bot' | 'command' | 'chevronDown' | 'x' | 'plus' | 'inbox' | 'settings' | 'users' | 'chartBar' | 'cog' | 'map' | 'activity' | 'attachment';

interface IconProps {
  type: IconType;
  className?: string;
}

const Icon: React.FC<IconProps> = ({ type, className = 'w-6 h-6' }) => {
  const getIconElement = (): React.ReactElement | null => {
    switch (type) {
      case 'home': return <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />;
      case 'building': return <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m-1 4h1m5-4h1m-1 4h1m-5-4h1m-1 4h1" />;
      case 'store': return <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />;
      case 'folder': return <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />;
      case 'calendar': return <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />;
      case 'chat': return <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />;
      case 'document': return <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />;
      case 'creditCard': return <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />;
      case 'sparkles': return <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.293 2.293a1 1 0 010 1.414l-2.293 2.293m-1.414-4L12 5m0 0l-1.293-1.293a1 1 0 010-1.414L12 5zm0 0l.293.293m-3.293 9.293l2.293-2.293a1 1 0 011.414 0l2.293 2.293m-4.586 0L12 15m0 0l-1.293 1.293a1 1 0 01-1.414 0L8 15m0 0l.293-.293m7.293-7.293l2.293-2.293a1 1 0 011.414 0l2.293 2.293m-4.586 0L19 8m0 0l-1.293 1.293a1 1 0 01-1.414 0L15 8m0 0l.293-.293" />;
      case 'search': return <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />;
      case 'bell': return <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />;
      case 'user': return <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />;
      case 'send': return <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />;
      case 'copy': return <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />;
      case 'check': return <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />;
      case 'bot': return <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-2 2-2-2z" />;
      case 'command': return <path strokeLinecap="round" strokeLinejoin="round" d="M15.25 7.5a2.75 2.75 0 10-5.5 0 2.75 2.75 0 005.5 0zM8.75 16.5a2.75 2.75 0 10-5.5 0 2.75 2.75 0 005.5 0zM15.25 16.5a2.75 2.75 0 105.5 0 2.75 2.75 0 00-5.5 0zM8.75 7.5a2.75 2.75 0 105.5 0 2.75 2.75 0 00-5.5 0zM8.75 10.25h8.5M12.75 7.5v8.5" />;
      case 'chevronDown': return <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />;
      case 'x': return <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />;
      case 'plus': return <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />;
      case 'inbox': return <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />;
      case 'settings': return <><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></>;
      case 'users': return <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21v-1a6 6 0 00-1.78-4.125" />;
      case 'chartBar': return <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />;
      case 'cog': return <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25a7.5 7.5 0 1112 0m-6-15.75a7.5 7.5 0 1012 0m-6-15.75v15.75" />;
      case 'map': return <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />;
      case 'activity': return <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />;
      case 'attachment': return <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.735l-7.662 7.662a4.5 4.5 0 01-6.364-6.364l7.662-7.662a3 3 0 014.242 4.242l-7.662 7.662a1.5 1.5 0 01-2.121-2.121l7.662-7.662" />;
      default: return null;
    }
  };

  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      {getIconElement()}
    </svg>
  );
};

export default Icon;
