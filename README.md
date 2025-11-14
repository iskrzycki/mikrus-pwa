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

## License

This project is open source for transparency purposes. While the code is publicly available for review, please use it responsibly and in accordance with [mikr.us](https://mikr.us/) terms of service.

---

*This is an unofficial application and is not affiliated with [mikr.us](https://mikr.us/). Use at your own discretion.*
