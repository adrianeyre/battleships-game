import React from 'react';
import ReactDOM from 'react-dom';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import BattleShips from './components/battle-ships/battle-ships';

import './index.scss';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
    <React.StrictMode>
        <BattleShips />
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();
