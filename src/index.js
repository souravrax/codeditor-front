import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';

import { Client as Styletron } from 'styletron-engine-atomic';

import { BaseProvider, LightTheme, DarkTheme } from "baseui"
import { Provider as StyletronProvider } from "styletron-react"

const engine = new Styletron();

const UI = () => {
  const [dark, setDark] = useState(false);
  const toggleDark = () => {
    setDark(!dark);
  }
  return (
    <BaseProvider theme={dark ? DarkTheme : LightTheme}>
      <App dark={dark} toggleTheme={toggleDark} />
    </BaseProvider>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <StyletronProvider value={engine}>
        <UI />
      </StyletronProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
