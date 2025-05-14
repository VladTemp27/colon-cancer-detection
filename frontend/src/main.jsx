import React from 'react';
import ReactDOM from 'react-dom/client';
import RiskPredictor from './components/RiskPredictor/RiskPredictor.jsx';
import TeamAmalzenLogo from './assets/TeamAmalzen.png';

// Dynamically set logo in the tab
const link = document.createElement('link');
link.rel = 'icon';
link.href = TeamAmalzenLogo;
document.head.appendChild(link);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RiskPredictor />
  </React.StrictMode>
);