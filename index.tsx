import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AppProvider } from './contexts/AppContext';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { DataProvider } from './contexts/DataProvider';
import { SettingsProvider } from './contexts/SettingsContext';
import { DealProvider } from './contexts/DealContext';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <AppProvider>
      <AuthProvider>
        <DataProvider>
          <SettingsProvider>
            <CartProvider>
              <DealProvider>
                <App />
              </DealProvider>
            </CartProvider>
          </SettingsProvider>
        </DataProvider>
      </AuthProvider>
    </AppProvider>
  </React.StrictMode>
);