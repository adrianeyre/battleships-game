import React from 'react';
import { createRoot } from 'react-dom/client';

import BattleShips from './components/battle-ships/battle-ships';
import reportWebVitals from './reportWebVitals';

import './index.scss';

const container = document.getElementById('root');

if (!container) throw new Error('No #root element to mount Battle Ships into');

createRoot(container).render(
  <React.StrictMode>
    <BattleShips />
  </React.StrictMode>,
);

reportWebVitals();
