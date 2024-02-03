import Sidenav from "../Sidenav";
import MobileHeader from "../MobileHeader";
import "./index.scss";
import { useState } from "react";

const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleCloseMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <MobileHeader menuOpen={menuOpen} toggleMenu={handleToggleMenu} />
      <Sidenav menuOpen={menuOpen} closeMenu={handleCloseMenu} />
    </>
  );
};

export default Navigation;
