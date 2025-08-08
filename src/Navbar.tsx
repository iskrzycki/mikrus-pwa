import type { FC } from "react";

import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import type { RouteConfig } from "./routes";
import { useTranslation } from "react-i18next";

const Navbar: FC<{ routes: RouteConfig[] }> = ({ routes }) => {
  const { t } = useTranslation();

  return (
    <nav className={styles.container}>
      {routes
        .filter((r: RouteConfig) => r.nav)
        .map(({ to, labelKey, icon }: RouteConfig) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.active : ""}`
            }
            aria-label={t(labelKey)}
          >
            {icon}
            <span className={styles.label}>{t(labelKey)}</span>
          </NavLink>
        ))}
    </nav>
  );
};

export default Navbar;
