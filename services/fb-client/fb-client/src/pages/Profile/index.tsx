import MainProfile from "./MainFrofile";
import ProfileHeader from "./ProfileHeader";
import "./Profile.scss";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux";
import { getUser } from "../../redux/actions/user-actions";
import React from "react";
import {
  getFriendsOfOne,
  getFriendsOfUser,
  getRequestsToFriends,
} from "../../redux/actions/friend-actions";
import { useFetchData } from "../../components/hooks/useFetchData";
import { getLikedPosts } from "../../redux/actions/post-actions";
const Profile = () => {
  const { userId } = useParams();
  const user = useSelector((state: RootState) => state.user.currentUser);
  const dispatch: AppDispatch = useDispatch();
  const isFetched = useFetchData(() => {
    if (user!.id === userId) return dispatch(getFriendsOfUser());
    return Promise.all([
      dispatch(getUser(userId!)),
      dispatch(getFriendsOfOne(userId!)),
      dispatch(getRequestsToFriends()),
      dispatch(getLikedPosts()),
    ]);
  });
  return (
    <div className="profile">
      <div className="profile-container">
        {isFetched && (
          <>
            <ProfileHeader currentUser={user!.id === userId!} />
            <MainProfile currentUser={user!.id === userId!} />
          </>
        )}
      </div>
    </div>
  );
};

export default React.memo(Profile);
