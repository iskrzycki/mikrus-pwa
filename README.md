# mikr.us PWA

A Progressive Web App (PWA) for managing and monitoring your VPS servers in the [mikr.us](https://mikr.us/) infrastructure.

## About

This application allows you to:
- Monitor your VPS server status (uptime, memory, disk usage)
- View server logs 
- Manage databases
- Execute shell commands remotely
- Restart your server and boost resources (RAM & HDD)

## Security & Privacy

**Your API keys are stored locally** in your browser's localStorage and are **never sent to any third-party servers**. All communication happens directly between your browser and the official [mikr.us](https://mikr.us/) API endpoints.

This repository is open source for full transparency, allowing you to verify exactly how your sensitive credentials are handled before using the application.

## Technology Stack

- **React 19** with TypeScript
- **Material-UI** for components and theming
- **Vite** for fast development and building
- **PWA** capabilities for offline support and mobile installation
- **i18next** for internationalization (Polish/English)

## Live Demo

The app is deployed at: [https://iskrzycki.github.io/mikrus-pwa/](https://iskrzycki.github.io/mikrus-pwa/)

## Installing on Mobile Devices

This PWA can be installed on your mobile device for a native app-like experience:

### 📱 **Android (Chrome/Edge)**
1. Open [https://iskrzycki.github.io/mikrus-pwa/](https://iskrzycki.github.io/mikrus-pwa/) in Chrome or Edge
2. Tap the **menu** (⋮) in the top-right corner
3. Select **"Add to Home screen"** or **"Install app"**
4. Tap **"Add"** or **"Install"** to confirm
5. The app icon will appear on your home screen

### 🍎 **iOS (Safari)**
1. Open [https://iskrzycki.github.io/mikrus-pwa/](https://iskrzycki.github.io/mikrus-pwa/) in Safari
2. Tap the **Share** button (□↗) at the bottom of the screen
3. Scroll down and tap **"Add to Home Screen"**
4. Edit the name if desired and tap **"Add"**
5. The app icon will appear on your home screen

### ✨ **Benefits of Installing**
- Works offline for cached data
- Faster loading times
- Native app-like experience
- No browser UI distractions
- Push notifications support (if enabled)

## License

This project is open source for transparency purposes. While the code is publicly available for review, please use it responsibly and in accordance with [mikr.us](https://mikr.us/) terms of service.

---

*This is an unofficial application and is not affiliated with [mikr.us](https://mikr.us/). Use at your own discretion.*
