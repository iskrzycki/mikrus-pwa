import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Settings from "./pages/Settings";
import Dashboard from "./pages/Dashboard";
import NotImplemented from "./pages/NotImplemented";
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import TerminalIcon from '@mui/icons-material/Terminal';
import StorageIcon from '@mui/icons-material/Storage';
import ListAltIcon from '@mui/icons-material/ListAlt';
import "./App.css";

const dashboardTheme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      contrastText: '#fff',
    },
    background: {
      paper: '#f7faff',
    },
    text: {
      primary: '#1a237e',
      secondary: '#607d8b',
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          color: '#1a237e',
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          color: '#1a237e',
        },
        secondary: {
          color: '#1976d2',
        },
      },
    },
  },
});

const routes = [
  {
    path: '/',
    element: <Dashboard />,
    label: 'Dashboard',
    icon: <DashboardIcon fontSize="large" />,
    nav: true,
    to: 'dashboard',
  },
  {
    path: 'dashboard',
    element: <Dashboard />,
    label: 'Dashboard',
    icon: <DashboardIcon fontSize="large" />,
    nav: false, // hide duplicate in nav
    to: 'dashboard',
  },
  {
    path: 'logs',
    element: <NotImplemented label="Logs" />,
    label: 'Logs',
    icon: <ListAltIcon fontSize="large" />,
    nav: true,
    to: 'logs',
  },
  {
    path: 'databases',
    element: <NotImplemented label="Databases" />,
    label: 'Databases',
    icon: <StorageIcon fontSize="large" />,
    nav: true,
    to: 'databases',
  },
  {
    path: 'cmd',
    element: <NotImplemented label="CMD" />,
    label: 'CMD',
    icon: <TerminalIcon fontSize="large" />,
    nav: true,
    to: 'cmd',
  },
  {
    path: 'settings',
    element: <Settings />,
    label: 'Settings',
    icon: <SettingsIcon fontSize="large" />,
    nav: true,
    to: 'settings',
  },
];

function App() {
  return (
    <ThemeProvider theme={dashboardTheme}>
      <Router basename="/mikrus-pwa/">
        <div className="app-container">
          <div className="main-content">
            <Routes>
              {routes.map(({ path, element }) => (
                <Route key={path} path={path} element={element} />
              ))}
            </Routes>
          </div>
          <nav className="bottom-nav" style={{ display: 'flex', justifyContent: 'space-around' }}>
            {routes.filter(r => r.nav).map(({ to, label, icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                aria-label={label}
                style={{
                  flex: '1 1 0',
                  minWidth: 60,
                  maxWidth: 120,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  textDecoration: 'none',
                }}
              >
                {icon}
                <span className="nav-label">{label}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
