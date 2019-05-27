import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './config/store';
import { Provider } from 'react-redux';

it('renders without crashing', () => {
  console.log('test running');
  const div = document.createElement('div');
  ReactDOM.render(<Provider store={store}><App /></Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});
