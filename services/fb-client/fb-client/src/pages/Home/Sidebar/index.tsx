import { useDispatch, useSelector } from "react-redux";
import Avatar from "../../../components/common/Avatar";
import { AppDispatch, RootState } from "../../../redux";
import { FaVideo, FaStore, FaGamepad, FaUserFriends } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi";
import { FiLogOut } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import "./Sidebar.scss";
import { Logout } from "../../../redux/actions/user-actions";

const Sidebar = () => {
  let sidebarList = [
    {
      icon: <FaUserFriends />,
      link: "/friends",
      text: "Bạn bè",
    },
    {
      icon: <HiUserGroup />,
      link: "/group",
      text: "Nhóm",
    },
    {
      icon: <FaVideo />,
      link: "/video",
      text: "Video",
    },
    {
      icon: <FaStore />,
      link: "/store",
      text: "Marketplace",
    },
    {
      icon: <FaGamepad />,
      link: "/game",
      text: "Trò chơi",
    },
  ];
  const user = useSelector((state: RootState) => state.user.currentUser);
  console.log(user);
  if (!sidebarList[0].text.includes(user!.firstName)) {
    sidebarList = [
      {
        icon: <Avatar user={user!} username={false} width={30} />,
        link: `/profile/${user!.id}`,
        text: `${user?.firstName + " " + user?.lastName}`,
      },
      ...sidebarList,
    ];
  }
  console.log(sidebarList);

  const dispatch: AppDispatch = useDispatch();
  const handleLogout = async () => {
    await dispatch(Logout());
  };
  const renderSidebarList = () => {
    return sidebarList.map((item) => {
      return (
        <li className="sidebar-item" key={uuidv4()}>
          <NavLink to={item.link} className="sidebar-item-link">
            {item.icon}
            <span className="sidebar-item-text">{item.text}</span>
          </NavLink>
        </li>
      );
    });
  };
  return (
    <div className="sidebar">
      <ul className="sidebar-list">{renderSidebarList()}</ul>
      <button className="logout-button" onClick={handleLogout}>
        <FiLogOut className="logout-icon" />
        <span className="logout-text">Đăng xuất</span>
      </button>
    </div>
  );
};

export default Sidebar;
