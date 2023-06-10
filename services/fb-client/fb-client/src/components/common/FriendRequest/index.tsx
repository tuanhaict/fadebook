import React, { useState } from "react";
import "./FriendRequest.scss";
import Avatar from "../Avatar";
import { AppDispatch } from "../../../redux";
import { useDispatch } from "react-redux";
import {
  acceptFriend,
  unOrEvictFriendRequest,
} from "../../../redux/actions/friend-actions";
interface FriendRequestProps {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    avatar: string;
  };
}
const FriendRequest: React.FC<FriendRequestProps> = (props) => {
  const dispatch: AppDispatch = useDispatch();
  const [isResponsed, setIsResponsed] = useState(false);
  const handleAcceptFriend = async (e: any) => {
    e.stopPropagation();
    await dispatch(acceptFriend(props.user.id));
    setIsResponsed(true);
  };
  const handleRejectFriend = async (e: any) => {
    e.stopPropagation();
    await dispatch(unOrEvictFriendRequest(props.user.id));
    setIsResponsed(true);
  };
  return (
    <>
      {!isResponsed && (
        <li className="friend-request-item">
          <Avatar user={props.user} username={true} />
          <div className="accept-friend-modal">
            <button
              className="accept-friend"
              onClick={(e) => handleAcceptFriend(e)}
            >
              Chấp nhận
            </button>
            <button
              className="reject-friend"
              onClick={(e) => handleRejectFriend(e)}
            >
              Từ chối
            </button>
          </div>
        </li>
      )}
    </>
  );
};

export default FriendRequest;
