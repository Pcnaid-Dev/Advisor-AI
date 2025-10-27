
import { useEffect } from 'react';

export const useKeyPress = (callback: (event: KeyboardEvent) => void, key: string, modifier: 'cmd' | 'none' = 'cmd') => {
    const onKeyDown = (event: KeyboardEvent) => {
        const target = event.target as HTMLElement;
        const isInputFocused = target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName);

        if (modifier === 'cmd') {
            if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === key.toLowerCase()) {
                event.preventDefault();
                callback(event);
            }
        } else if (modifier === 'none') {
            if (!isInputFocused && event.key.toLowerCase() === key.toLowerCase()) {
                event.preventDefault();
                callback(event);
            }
        }
    };
    
    useEffect(() => {
        document.addEventListener('keydown', onKeyDown);
        return () => {
            document.removeEventListener('keydown', onKeyDown);
        };
    }, [callback, key, modifier]);
};
