import React from 'react';
import ReactDOM from 'react-dom';
import AuthProvider from './auth/AuthProvider';
import './index.css';
import AppRouter from './routers/AppRouter';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider> 
      <AppRouter />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
