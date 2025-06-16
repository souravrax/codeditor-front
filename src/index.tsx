import { createRoot } from "react-dom/client";
import "./index.css";
import { HashRouter, Routes, Route } from "react-router";

import App from "./app/App";
import { Toaster } from "./components/ui/sonner";
import { ThemeProvider } from "./context/ThemeProvider";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <HashRouter>
      <Routes>
        <Route index element={<App />} />
        <Route path=":sharedId" element={<App />} />
      </Routes>
      <Toaster />
    </HashRouter>
  </ThemeProvider>
);

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
