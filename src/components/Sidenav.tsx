import { NavLink, useNavigate } from "react-router-dom";
import twnLogo from "../assets/imgs/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFile,
  faPhotoVideo,
  faTable,
} from "@fortawesome/free-solid-svg-icons";

interface SidenavTypes {
  menuOpen: boolean;
  closeMenu: () => void;
}

const Sidenav: React.FC<SidenavTypes> = ({ menuOpen, closeMenu }) => {
  const navigate = useNavigate();
  const handleClick = () => navigate("/");

  return (
    <nav className={menuOpen ? "sidenav sidenav-open" : "sidenav"}>
      <img
        tabIndex={0}
        onClick={handleClick}
        className="logo"
        src={twnLogo}
      ></img>
      <ul className="list-container">
        <li>
          <NavLink
            onClick={closeMenu}
            to="/article"
            className={({ isActive }) =>
              isActive ? "active menu-item" : "menu-item"
            }
          >
            Article
            <FontAwesomeIcon icon={faFile} />
          </NavLink>
        </li>
        <li>
          <NavLink
            onClick={closeMenu}
            to="/table"
            className={({ isActive }) =>
              isActive ? "active menu-item" : "menu-item"
            }
          >
            Table
            <FontAwesomeIcon icon={faTable} />
          </NavLink>
        </li>
        <li>
          <NavLink
            onClick={closeMenu}
            to="/life"
            className={({ isActive }) =>
              isActive ? "active menu-item" : "menu-item"
            }
          >
            Game of life
            <FontAwesomeIcon icon={faPhotoVideo} />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Sidenav;
