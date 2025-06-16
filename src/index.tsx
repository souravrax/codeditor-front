import { createRoot } from "react-dom/client";
import "./index.css";
import { HashRouter, Routes, Route } from "react-router";

import App from "./app/App";
import { Toaster } from "./components/ui/sonner";
import { ThemeProvider } from "./context/ThemeProvider";
import BGImage from "@/assets/background.png";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <div className="h-screen w-screen absolute left-0 top-0 -z-10 overflow-hidden">
      <img
        className="absolute left-0 right-0 top-0 bottom-0 bg-cover -z-10"
        src={BGImage}
        alt="background-image"
      />
    </div>
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
