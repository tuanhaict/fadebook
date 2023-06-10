import React from "react";
import "./Avatar.scss";
import { NavLink } from "react-router-dom";

interface AvatarProps {
  user: {
    id: string;
    avatar: string;
    firstName: string;
    lastName: string;
  };
  width?: number;
  username: boolean;
}
const Avatar: React.FC<AvatarProps> = (props) => {
  let { avatar, id, firstName, lastName } = props.user;
  const { username } = props;
  const width = props.width ? props.width : 36;
  return (
    <div className="user">
      <NavLink
        to={`/profile/${id}`}
        className="avatar"
        style={{ width: `${width}px`, height: `${width}px` }}
      >
        <img src={avatar} alt="user avatar" />
      </NavLink>
      {username && (
        <span className="username">{firstName + " " + lastName}</span>
      )}
    </div>
  );
};

export default Avatar;
