import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import Settings from "./pages/Settings";
import Dashboard from "./pages/Dashboard";
import "./App.css";

function App() {
  return (
    <Router basename="/mikrus-pwa/">
      <div id="root">
        <nav className="nav">
          <NavLink
            to="dashboard"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            Dashboard
          </NavLink>
          <NavLink
            to="settings"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            Settings
          </NavLink>
        </nav>

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="settings" element={<Settings />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
