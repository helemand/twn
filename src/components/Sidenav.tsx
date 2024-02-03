import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFile,
  faPhotoVideo,
  faTable,
} from "@fortawesome/free-solid-svg-icons";
import twnLogo from "../assets/imgs/logo.svg";

interface SidenavTypes {
  menuOpen: boolean;
  closeMenu: () => void;
}

const Sidenav: React.FC<SidenavTypes> = ({ menuOpen, closeMenu }) => {
  const navigate = useNavigate();
  const handleClick = () => navigate("/");

  return (
    <nav className={menuOpen ? "sidenav sidenav-open" : "sidenav"}>
      <button className="logo" type="button" tabIndex={0} onClick={handleClick}>
        <img alt="TWN-logo" src={twnLogo} />
      </button>

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
