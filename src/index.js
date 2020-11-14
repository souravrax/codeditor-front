import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";

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
import App from "./App";

// ReactDOM Render
ReactDOM.render(
    <Provider store={store}>
        <StyletronProvider value={engine}>
            <PersistGate loading={null} persistor={persistor}>
                <App />
            </PersistGate>
        </StyletronProvider>
    </Provider>,
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
