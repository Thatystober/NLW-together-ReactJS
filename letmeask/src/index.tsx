import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './services/firebase'
import { Button } from './components/Button';

ReactDOM.render(
  <React.StrictMode>
    <App />
    <Button />
    <Button />
  </React.StrictMode>,
  document.getElementById('root')
);


