import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { ThemeProvider, createTheme } from "@mui/material/styles";

import Navbar from "./Navbar";
import "./App.css";
import { routes } from "./routes";

const dashboardTheme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
      contrastText: "#fff",
    },
    background: {
      paper: "#f7faff",
    },
    text: {
      primary: "#1a237e",
      secondary: "#607d8b",
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "#1a237e",
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          color: "#1a237e",
        },
        secondary: {
          color: "#1976d2",
        },
      },
    },
  },
});

const App = () => (
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
        <Navbar routes={routes} />
      </div>
    </Router>
  </ThemeProvider>
);

export default App;
