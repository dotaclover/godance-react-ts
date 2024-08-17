import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from "./MainLayout.module.css";
import Navbar from "../../../components/Navbar/Navbar";
import Sidebar from "../../../components/Sidebar/Sidebar";

interface Props {
  children: React.ReactNode;
}

const MainLayout: React.FC<Props> = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar toggleMenu={toggleMenu} />

      <div className="d-flex flex-grow-1 position-relative">
        {menuOpen && (
          <div
            className={styles.sidebarOverlay}
            onClick={() => setMenuOpen(false)}
          />
        )}
        <Sidebar menuOpen={menuOpen} />
        <main className="flex-grow-1 my-3 md-p-3">{children}</main>
      </div>

      <footer className="bg-light text-center p-3 mt-auto">
        &copy; 2024 GoDance!
      </footer>
    </div>
  );
};

export default MainLayout;
