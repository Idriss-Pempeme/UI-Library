'use client';

import { useEffect } from 'react';

export default function SecurityWrapper({ children }) {
  useEffect(() => {
    const handleContextMenu = (e) => {
      e.preventDefault();
    };

    const handleKeyDown = (e) => {
      // Block PrintScreen
      if (e.key === 'PrintScreen' || e.keyCode === 44) {
        navigator.clipboard.writeText('');
        alert("Les captures d'écran sont désactivées sur cette plateforme.");
        e.preventDefault();
      }
      
      // Block Ctrl+P (Print), Ctrl+S (Save), Ctrl+C (Copy), Ctrl+Shift+I (DevTools)
      if (e.ctrlKey || e.metaKey) {
        const key = e.key.toLowerCase();
        if (key === 'p' || key === 's' || key === 'c') {
          e.preventDefault();
        }
      }
      
      // Block F12 (DevTools)
      if (e.key === 'F12' || e.keyCode === 123) {
        e.preventDefault();
      }
    };

    const handleCopy = (e) => {
      e.preventDefault();
    };

    const handleDragStart = (e) => {
      e.preventDefault();
    };

    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('copy', handleCopy);
    window.addEventListener('dragstart', handleDragStart);

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('copy', handleCopy);
      window.removeEventListener('dragstart', handleDragStart);
    };
  }, []);

  return <>{children}</>;
}
