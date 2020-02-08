import React from 'react';
import ReactDOM from 'react-dom';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import BattleShips from './components/battle-ships/battle-ships';

import './index.scss';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<BattleShips />, document.getElementById('root'));
serviceWorker.unregister();
