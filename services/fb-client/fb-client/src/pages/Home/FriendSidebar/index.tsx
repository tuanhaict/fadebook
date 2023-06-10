import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./FriendSidebar.scss";
import { AppDispatch, RootState } from "../../../redux";
import Avatar from "../../../components/common/Avatar";
import FriendRequest from "../../../components/common/FriendRequest";
import { v4 as uuidv4 } from "uuid";
import { useFetchData } from "../../../components/hooks/useFetchData";
import { getFriendsRequests } from "../../../redux/actions/friend-actions";
const FriendSidebar = () => {
  const friends = useSelector((state: RootState) => state.friend.friends);
  const friendsRequests = useSelector(
    (state: RootState) => state.friend.friendsRequests
  );
  const renderFriends = () => {
    return friends.map((user) => {
      return (
        <li className="friend-item" key={uuidv4()}>
          <Avatar user={user} username={true} />
        </li>
      );
    });
  };
  const renderFriendsRequests = () => {
    return friendsRequests.map((friend) => {
      return <FriendRequest user={friend} key={uuidv4()} />;
    });
  };
  const dispatch: AppDispatch = useDispatch();
  const isFetched = useFetchData(() => {
    return dispatch(getFriendsRequests());
  });
  return (
    <div className="friend-sidebar">
      <p className="friend-title">Bạn bè</p>
      <ul className="friend-list">{renderFriends()}</ul>

      {isFetched && friendsRequests.length !== 0 && (
        <>
          <p className="friend-request-title">Lời mời kết bạn</p>
          <ul className="friend-request-list">{renderFriendsRequests()}</ul>
        </>
      )}
    </div>
  );
};

export default React.memo(FriendSidebar);
