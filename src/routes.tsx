import Settings from "./pages/Settings";
import Dashboard from "./pages/Dashboard";
import NotImplemented from "./pages/NotImplemented";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import TerminalIcon from "@mui/icons-material/Terminal";
import StorageIcon from "@mui/icons-material/Storage";
import ListAltIcon from "@mui/icons-material/ListAlt";
import Logs from "./pages/Logs";

export type RouteConfig = {
  path: string;
  element: React.ReactNode;
  labelKey: string;
  icon: React.ReactNode;
  nav: boolean;
  to: string;
};

export const routes: RouteConfig[] = [
  {
    path: "/",
    element: <Dashboard />,
    labelKey: "navbar.dashboard",
    icon: <DashboardIcon fontSize="large" />,
    nav: true,
    to: "dashboard",
  },
  {
    path: "dashboard",
    element: <Dashboard />,
    labelKey: "navbar.dashboard",
    icon: <DashboardIcon fontSize="large" />,
    nav: false, // hide duplicate in nav
    to: "dashboard",
  },
  {
    path: "logs",
    element: <Logs />,
    labelKey: "navbar.logs",
    icon: <ListAltIcon fontSize="large" />,
    nav: true,
    to: "logs",
  },
  {
    path: "databases",
    element: <NotImplemented label={"navbar.databases"} />,
    labelKey: "navbar.databases",
    icon: <StorageIcon fontSize="large" />,
    nav: true,
    to: "databases",
  },
  {
    path: "cmd",
    element: <NotImplemented label={"navbar.cmd"} />,
    labelKey: "navbar.cmd",
    icon: <TerminalIcon fontSize="large" />,
    nav: true,
    to: "cmd",
  },
  {
    path: "settings",
    element: <Settings />,
    labelKey: "navbar.settings",
    icon: <SettingsIcon fontSize="large" />,
    nav: true,
    to: "settings",
  },
];
