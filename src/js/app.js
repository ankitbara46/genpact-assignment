import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import Layout from './components/Layout';

const Render =  ReactDOM.render(<Provider store={store}>
    <Layout />
  </Provider>, document.getElementById('root'));

export default Render;
