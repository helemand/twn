import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import "./index.scss";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import twnLogo from "../../assets/imgs/logo.svg";

interface MobileHeaderTypes {
  menuOpen: boolean;
  toggleMenu: () => void;
}

const MobileHeader: React.FC<MobileHeaderTypes> = ({
  menuOpen,
  toggleMenu,
}) => {
  return (
    <div className="mobile-header">
      <button className="toggle-button" onClick={toggleMenu}>
        <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
      </button>
      <img src={twnLogo} />
    </div>
  );
};

export default MobileHeader;
