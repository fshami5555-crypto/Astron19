import React, { createContext, useState, useCallback, ReactNode, useEffect } from 'react';

interface ToastContextType {
  showToast: (message: string) => void;
}

export const ToastContext = createContext<ToastContextType>({} as ToastContextType);

const Toast: React.FC<{ message: string; onDismiss: () => void }> = ({ message, onDismiss }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
      const dismissTimer = setTimeout(onDismiss, 500); // Wait for animation to finish
      return () => clearTimeout(dismissTimer);
    }, 2500); // Show for 2.5 seconds before starting to fade out

    return () => clearTimeout(exitTimer);
  }, [onDismiss]);

  return (
    <div className={`fixed top-20 left-1/2 -translate-x-1/2 z-[100] bg-green-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-500 ${isExiting ? 'opacity-0 -translate-y-5' : 'opacity-100 translate-y-0'}`}>
      {message}
    </div>
  );
};

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastKey, setToastKey] = useState(0);

  const showToast = useCallback((message: string) => {
    setToastMessage(message);
    setToastKey(prevKey => prevKey + 1); // Remount toast component to reset timers
  }, []);

  const dismissToast = useCallback(() => {
    setToastMessage(null);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toastMessage && <Toast key={toastKey} message={toastMessage} onDismiss={dismissToast} />}
    </ToastContext.Provider>
  );
};
