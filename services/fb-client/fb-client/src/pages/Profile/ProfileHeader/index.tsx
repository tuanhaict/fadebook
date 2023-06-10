import React, { useState } from "react";
import ProfileImage from "../../../assets/profile-image.jpg";
import "./ProfileHeader.scss";
import { v4 as uuidv4 } from "uuid";
import Avatar from "../../../components/common/Avatar";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux";
import {
  addFriend,
  unOrEvictFriendRequest,
} from "../../../redux/actions/friend-actions";

import UploadAvatar from "../../../components/common/UploadAvatar";
interface ProfileHeaderProps {
  currentUser: boolean;
}
const profileUserList = [
  {
    text: "Bài viết",
    link: "",
  },
  {
    text: "Giới thiệu",
    link: "introduction",
  },
  {
    text: "Bạn bè",
    link: "friends",
  },
  {
    text: "Ảnh",
    link: "images",
  },
  {
    text: "Video",
    link: "videos",
  },
];
const ProfileHeader: React.FC<ProfileHeaderProps> = ({ currentUser }) => {
  const user = currentUser
    ? useSelector((state: RootState) => state.user.currentUser)
    : useSelector((state: RootState) => state.user.otherUser);
  const friends = currentUser
    ? useSelector((state: RootState) => state.friend.friends)
    : useSelector((state: RootState) => state.friend.otherFriends);
  const friendsOfCurrentUser = useSelector(
    (state: RootState) => state.friend.friends
  );
  const requestsToFriends = useSelector(
    (state: RootState) => state.friend.requestsToFriends
  );
  const dispatch: AppDispatch = useDispatch();
  const handleButtonClick = () => {
    if (requestsToFriends.some((friendId) => friendId === user!.id)) {
      dispatch(unOrEvictFriendRequest(user!.id));
    } else {
      if (friendsOfCurrentUser.some((friend) => friend.id === user!.id)) {
        dispatch(unOrEvictFriendRequest(user!.id));
      } else dispatch(addFriend(user!.id));
    }
  };
  const renderProfileUserList = () => {
    return profileUserList.map((item) => {
      return (
        <li className="profile-user-item" key={uuidv4()}>
          <NavLink
            to={item.link}
            className={({ isActive }) => {
              let classes = ["profile-user-link"];
              if (isActive) classes.push("actived");
              return classes.join(" ");
            }}
          >
            {item.text}
          </NavLink>
        </li>
      );
    });
  };
  return (
    <div className="profile-header">
      <div className="profile-image">
        <img src={ProfileImage} alt="profile-image" />
      </div>
      <div className="profile-user">
        <div className="profile-user-info">
          <Avatar user={user!} username={false} width={170} />
          <div className="profile-user-desc">
            <span className="profile-user-username">
              {user?.firstName + " " + user?.lastName}
            </span>
            <p className="profile-user-friends">{`${friends.length} bạn bè`}</p>
          </div>
        </div>
        {currentUser && <UploadAvatar />}
        {!currentUser && (
          <button className="friend-status" onClick={handleButtonClick}>
            {requestsToFriends.some((friendId) => friendId === user!.id)
              ? "Hủy lời mời"
              : friendsOfCurrentUser.some((friend) => friend.id === user?.id)
              ? "Hủy kết bạn"
              : "Thêm bạn bè"}
          </button>
        )}
        <ul className="profile-user-list">{renderProfileUserList()}</ul>
      </div>
    </div>
  );
};

export default React.memo(ProfileHeader);
