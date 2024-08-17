import React from "react";
import { useTranslation } from "react-i18next";
import { useStore } from "../../store";
import styles from "./Navbar.module.css"; // Importing CSS module

interface NavbarProps {
  toggleMenu: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleMenu }) => {
  const { t, i18n } = useTranslation();

  const switchLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(event.target.value);
  };

  const { auth, logout, user } = useStore((state) => ({
    auth: state.auth,
    logout: state.logout,
    user: state.user,
  }));

  // Get current language display text
  const currentLang = i18n.language;
  const languageOptions: { [key: string]: string } = {
    en: t("navbar.languages.en"),
    zh: t("navbar.languages.zh"),
    // Add more languages here
  };

  return (
    <header
      className={`navbar navbar-expand-md navbar-light bg-light shadow-sm ${styles.navbar}`}
    >
      <div className="w-100 d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-end">
          {auth && (
            <div className="d-flex align-items-center">
              <span
                className="d-inline-block text-truncate"
                style={{ maxWidth: "200px" }}
              >
                {t("navbar.welcome")}, {user?.name}!
              </span>
              <button className="btn btn-link" onClick={logout}>
                {t("navbar.logout")}
              </button>
            </div>
          )}
        </div>

        <div className="d-flex align-items-center">
          <select
            className={`form-select m-1 ${styles.languageSelect}`}
            value={currentLang}
            onChange={switchLanguage}
          >
            {Object.keys(languageOptions).map((lng) => (
              <option key={lng} value={lng}>
                {languageOptions[lng]}
              </option>
            ))}
          </select>
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleMenu}
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
