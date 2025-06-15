import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { HashRouter, Routes, Route } from "react-router";

// BaseWeb imports
import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
const engine = new Styletron();

// REDUX
import { store, persistor } from "./app/store"; // persistor is from redux-persist
import { Provider } from "react-redux";

// Redux Persistence
import { PersistGate } from "redux-persist/integration/react";

// Components/Containers Imports
import App from "./App.jsx";

// ReactDOM Render
ReactDOM.render(
  <HashRouter>
    <Provider store={store}>
      <StyletronProvider value={engine}>
        <PersistGate loading={null} persistor={persistor}>
          <Routes>
            <Route index element={<App />} />
            <Route path=":sharedId" element={<App />} />
          </Routes>
        </PersistGate>
      </StyletronProvider>
    </Provider>
  </HashRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// Codeditor logo on console
console.log(
  `
Thank you for using
██████╗ ██████╗ ██████╗ ███████╗██████╗ ██╗████████╗ ██████╗ ██████╗ 
██╔════╝██╔═══██╗██╔══██╗██╔════╝██╔══██╗██║╚══██╔══╝██╔═══██╗██╔══██╗
██║     ██║   ██║██║  ██║█████╗  ██║  ██║██║   ██║   ██║   ██║██████╔╝
██║     ██║   ██║██║  ██║██╔══╝  ██║  ██║██║   ██║   ██║   ██║██╔══██╗
╚██████╗╚██████╔╝██████╔╝███████╗██████╔╝██║   ██║   ╚██████╔╝██║  ██║
 ╚═════╝ ╚═════╝ ╚═════╝ ╚══════╝╚═════╝ ╚═╝   ╚═╝    ╚═════╝ ╚═╝  ╚═╝
Have fun...
`
);
