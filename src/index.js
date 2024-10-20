import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {ThemeProvider} from '@material-tailwind/react';
import {Toaster} from 'react-hot-toast';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <React.StrictMode>
  <BrowserRouter>
      <ThemeProvider>
        <Toaster position="top-center" gutter={10} />
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </ThemeProvider>
  </BrowserRouter>
</React.StrictMode>
);
