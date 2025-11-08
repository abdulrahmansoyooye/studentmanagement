import React from "react";
import ReactDOM from "react-dom/client";
// import './index.css';
import App from "./App";
import { SessionProvider } from "./context/session";
import { SidebarProvider } from "./context/SidebarContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>

  <SidebarProvider >
    <SessionProvider>
      <App />
    </SessionProvider>
    </SidebarProvider>
  </React.StrictMode>
);
