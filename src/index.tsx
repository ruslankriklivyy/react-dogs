import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { RootStateProvider } from './store/RootState.Context';
import './scss/index.scss';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <RootStateProvider>
      <Router>
        <App />
      </Router>
    </RootStateProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
