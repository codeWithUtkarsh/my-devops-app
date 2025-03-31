import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import LoginScreenMockup from './components/LoginScreenMockup';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <LoginScreenMockup />
    </React.StrictMode>
);