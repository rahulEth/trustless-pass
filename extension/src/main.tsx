import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import Web3Provider from "./contexts/Web3Context.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Web3Provider>
      <App />
    </Web3Provider>
  </StrictMode>
);
