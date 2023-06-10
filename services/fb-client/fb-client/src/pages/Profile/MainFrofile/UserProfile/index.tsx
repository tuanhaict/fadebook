import React from "react";
import "./UserProfile.scss";
import { CgWorkAlt } from "react-icons/cg";
import { GiTeamIdea } from "react-icons/gi";
import { FaHome } from "react-icons/fa";
import { User } from "../../../../redux/features/userSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux";
interface UserProfileProps {
  user: User;
}
const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  const introduction = user.introduction;
  return (
    <div className="user-profile">
      <div className="user-introduction">
        <h3 className="user-profile-title">Giới thiệu</h3>
        {introduction ? (
          <ul className="user-introduction-list">
            {introduction.job && (
              <li className="user-introduction-item">
                <CgWorkAlt className="user-introduction-icon" />
                <p className="user-introduction-text">{introduction.job}</p>
              </li>
            )}
            {introduction.company && (
              <li className="user-introduction-item">
                <GiTeamIdea className="user-introduction-icon" />
                <p className="user-introduction-text">{introduction.company}</p>
              </li>
            )}
            {introduction.address && (
              <li className="user-introduction-item">
                <FaHome className="user-introduction-icon" />
                <p className="user-introduction-text">{introduction.address}</p>
              </li>
            )}
          </ul>
        ) : (
          `Không có thông tin chi tiết về ${user.firstName} ${user.lastName}`
        )}
      </div>
    </div>
  );
};

export default UserProfile;
