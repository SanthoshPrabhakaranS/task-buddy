import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './components/pages/home-page/index.ts';
import AuthPage from './components/pages/auth-page/index.ts';
import './index.css';
import { GlobalProvider } from './context/GlobalContext.tsx';
import { Toaster } from 'sonner';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <GlobalProvider>
        <Toaster position='top-center' />
        <Routes>
          <Route path='/' element={<AuthPage />} />
          <Route path='/home' element={<HomePage />} />
        </Routes>
      </GlobalProvider>
    </BrowserRouter>
  </StrictMode>
);
