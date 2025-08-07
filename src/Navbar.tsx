import type { FC } from "react";

import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import type { RouteConfig } from "./routes";

const Navbar: FC<{ routes: RouteConfig[] }> = ({ routes }) => (
  <nav className={styles.container}>
    {routes
      .filter((r: RouteConfig) => r.nav)
      .map(({ to, label, icon }: RouteConfig) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.active : ""}`
          }
          aria-label={label}
        >
          {icon}
          <span className={styles.label}>{label}</span>
        </NavLink>
      ))}
  </nav>
);

export default Navbar;
