import FriendSidebar from "./FriendSidebar";
import MainContent from "./MainContent";
import Sidebar from "./Sidebar";
import "./Home.scss";
import { AppDispatch } from "../../redux";
import { useDispatch } from "react-redux";
import { getFriendsOfUser } from "../../redux/actions/friend-actions";
import React from "react";
import { useFetchData } from "../../components/hooks/useFetchData";
import { getLikedPosts } from "../../redux/actions/post-actions";
const Home = () => {
  const dispatch: AppDispatch = useDispatch();
  const isFetched = useFetchData(() => {
    return Promise.all([
      dispatch(getFriendsOfUser()),
      dispatch(getLikedPosts()),
    ]);
  });
  return (
    <div className="home">
      <div className="home-inner container">
        <Sidebar />
        {isFetched && (
          <>
            <MainContent /> <FriendSidebar />
          </>
        )}
      </div>
    </div>
  );
};

export default React.memo(Home);
