import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

// BaseWeb imports
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from "styletron-react"
const engine = new Styletron();


// REDUX
import store from './app/store';
import { Provider } from 'react-redux';


// Components/Containers Imports
import App from './App';


// ReactDOM Render
ReactDOM.render(
  <Provider store={store}>
    <StyletronProvider value={engine}>
      <App />
    </StyletronProvider>
  </Provider>,
  document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
