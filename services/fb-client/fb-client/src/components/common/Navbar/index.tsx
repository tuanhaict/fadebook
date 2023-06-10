import { FaGamepad, FaSearch, FaStore, FaVideo } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi";
import { ImHome } from "react-icons/im";
import { BsMessenger } from "react-icons/bs";
import { IoMdNotifications } from "react-icons/io";
import FbLogo from "../../../assets/Facebook_Logo_(2019).png";
import { NavLink } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import "./Navbar.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux";
import Avatar from "../Avatar";
const navList = [
  {
    icon: <ImHome />,
    link: "/home",
  },
  {
    icon: <FaVideo />,
    link: "/video",
  },
  {
    icon: <FaStore />,
    link: "/store",
  },
  {
    icon: <HiUserGroup />,
    link: "/group",
  },
  {
    icon: <FaGamepad />,
    link: "/game",
  },
];
const Navbar = () => {
  const user = useSelector((state: RootState) => state.user.currentUser!);
  const renderNavList = () => {
    return navList.map((item) => {
      return (
        <li className="nav-item" key={uuidv4()}>
          <NavLink
            to={item.link}
            className={({ isActive }) => {
              const classes = ["nav-item-link"];
              if (isActive) classes.push("actived");
              return classes.join(" ");
            }}
          >
            {item.icon}
          </NavLink>
        </li>
      );
    });
  };
  return (
    <div className="nav">
      <div className="container">
        <div className="nav-content">
          <div className="nav-logo">
            <div className="nav-image">
              <NavLink to="/home">
                <img src={FbLogo} alt="facebook logo" />
              </NavLink>
            </div>
            <div className="nav-search">
              <FaSearch className="nav-search-icon" />
              <input
                type="text"
                name=""
                id=""
                placeholder="Tìm kiếm trên facebook"
              />
            </div>
          </div>
          <ul className="nav-list">{renderNavList()}</ul>
          <div className="nav-user">
            <div className="nav-message">
              <BsMessenger className="nav-user-icon" />
            </div>
            <div className="nav-notification">
              <IoMdNotifications className="nav-user-icon" />
            </div>
            <Avatar user={user} username={false} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
