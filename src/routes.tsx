import Settings from "./pages/Settings";
import Dashboard from "./pages/Dashboard";
import NotImplemented from "./pages/NotImplemented";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import TerminalIcon from "@mui/icons-material/Terminal";
import StorageIcon from "@mui/icons-material/Storage";
import ListAltIcon from "@mui/icons-material/ListAlt";

export type RouteConfig = {
  path: string;
  element: React.ReactNode;
  label: string;
  icon: React.ReactNode;
  nav: boolean;
  to: string;
};

export const routes: RouteConfig[] = [
  {
    path: "/",
    element: <Dashboard />,
    label: "Dashboard",
    icon: <DashboardIcon fontSize="large" />,
    nav: true,
    to: "dashboard",
  },
  {
    path: "dashboard",
    element: <Dashboard />,
    label: "Dashboard",
    icon: <DashboardIcon fontSize="large" />,
    nav: false, // hide duplicate in nav
    to: "dashboard",
  },
  {
    path: "logs",
    element: <NotImplemented label="Logs" />,
    label: "Logs",
    icon: <ListAltIcon fontSize="large" />,
    nav: true,
    to: "logs",
  },
  {
    path: "databases",
    element: <NotImplemented label="Databases" />,
    label: "Databases",
    icon: <StorageIcon fontSize="large" />,
    nav: true,
    to: "databases",
  },
  {
    path: "cmd",
    element: <NotImplemented label="CMD" />,
    label: "CMD",
    icon: <TerminalIcon fontSize="large" />,
    nav: true,
    to: "cmd",
  },
  {
    path: "settings",
    element: <Settings />,
    label: "Settings",
    icon: <SettingsIcon fontSize="large" />,
    nav: true,
    to: "settings",
  },
];
