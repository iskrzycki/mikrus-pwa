import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import * as Sentry from "@sentry/react";
import App from './App.tsx'
import './index.css'
import './i18n';

Sentry.init({
  dsn: "https://efde8d31a3ba69778e22a60f7609d971@o4508029727277056.ingest.de.sentry.io/4508029729505360",
  sendDefaultPii: true,
  integrations: [Sentry.browserTracingIntegration()],
  tracesSampleRate: 1.0,
});

let installPrompt = null;
const installButton = document.querySelector("#install");

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  installPrompt = event;
  installButton.removeAttribute("hidden");
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <button id="install" hidden>Install</button>
    <App />
  </StrictMode>,
)
