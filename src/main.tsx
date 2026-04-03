import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { AuthProvider } from './context/AuthContext';
import { HotelProvider } from './context/HotelContext';
import { LanguageProvider } from './hooks/useTranslation';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <AuthProvider>
        <HotelProvider>
          <App />
        </HotelProvider>
      </AuthProvider>
    </LanguageProvider>
  </StrictMode>,
);
