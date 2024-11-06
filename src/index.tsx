import React from "react";
import "./index.css";
import App from "./App";
import { createRoot } from "react-dom/client";
import { SettingsProvider } from "./context/SettingsContext";

createRoot(document.getElementById("root") as HTMLElement).render(
    <SettingsProvider>
        <App />
    </SettingsProvider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

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
