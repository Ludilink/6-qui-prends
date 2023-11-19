import React from 'react';
import ReactDOM from 'react-dom/client';
import App from 'App';
import 'assets/styles/app.scss';
import UserProvider from 'contexts/UserProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  // <React.StrictMode>
  <UserProvider>
    <App />
  </UserProvider>
  // </React.StrictMode>
);
