import { NavLink } from "react-router-dom";
import twnLogo from "../assets/imgs/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFile,
  faPhotoVideo,
  faTable,
} from "@fortawesome/free-solid-svg-icons";

interface SidenavTypes {
  menuOpen: boolean;
}

const Sidenav: React.FC<SidenavTypes> = ({ menuOpen }) => {
  return (
    <nav className={menuOpen ? "sidenav sidenav-open" : "sidenav"}>
      <img className="logo" src={twnLogo} />
      <ul className="list-container">
        <li>
          <NavLink
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
