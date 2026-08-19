import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import { AppProviders } from "./core/providers/AppProviders";

// ===== Global Styles =====

import "./assets/styles/reset.css";
import "./assets/styles/variables.css";
import "./assets/styles/typography.css";
import "./assets/styles/animations.css";
import "./assets/styles/scrollbar.css";
import "./assets/styles/utilities.css";
import "./assets/styles/light.css";
import "./assets/styles/dark.css";
import "./index.css";

// ===== Application =====

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </StrictMode>
);