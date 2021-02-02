import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import fastclick from 'fastclick';

fastclick.attach(document.body); 

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
