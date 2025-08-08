import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import './i18n' // Import i18n configuration

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
