import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Clear any existing root element content
const rootElement = document.getElementById('root');
if (rootElement.hasChildNodes()) {
  rootElement.innerHTML = '';
}

// Create new root and render
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);