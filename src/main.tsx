import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { AuthProvider } from './context/AuthContext';
import { HotelProvider } from './context/HotelContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <HotelProvider>
        <App />
      </HotelProvider>
    </AuthProvider>
  </StrictMode>,
);
