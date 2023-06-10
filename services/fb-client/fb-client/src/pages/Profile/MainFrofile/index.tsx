import React from "react";
import UserProfile from "./UserProfile";
import UserPost from "./UserPost";
import "./MainProfile.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux";
interface MainProfileProps {
  currentUser: boolean;
}
const MainProfile: React.FC<MainProfileProps> = ({ currentUser }) => {
  const user = currentUser
    ? useSelector((state: RootState) => state.user.currentUser)
    : useSelector((state: RootState) => state.user.otherUser);
  return (
    <div className="main-profile">
      <UserProfile user={user!} />
      <UserPost currentUser={currentUser} userId={user!.id} />
    </div>
  );
};

export default MainProfile;
