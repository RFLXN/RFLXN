import { TextSizePreference } from "./shell/TextSizeWidget";
import React from "react";
import ReactDOM from "react-dom/client";
import { Desktop } from "./shell/Desktop";
import "./styles.css";
import { BootScreen } from "./boot/BootScreen";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TextSizePreference />
    <BootScreen>
      <Desktop />
    </BootScreen>
  </React.StrictMode>,
);
