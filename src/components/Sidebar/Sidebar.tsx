import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styles from "./Sidebar.module.css";

interface SidebarProps {
  menuOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ menuOpen }) => {
  const { t } = useTranslation();
  return (
    <aside
      className={`${styles.sidebar} ${menuOpen ? styles.sidebarOpen : ""}`}
    >
      <ul className="nav flex-column fs-5 text-center">
        <li className="nav-item">
          <Link className="nav-link" to="/">
            {t("sidebar.Posts")}
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/users">
            {t("sidebar.Users")}
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/users/1/todos">
            {t("sidebar.My Todos")}
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/users/1/posts">
            {t("sidebar.My Posts")}
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/users/1/albums">
            {t("sidebar.My Albums")}
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
