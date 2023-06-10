import React from "react";
import "./UserPost.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux";
import Post from "../../../../components/common/Post";
import { v4 as uuidv4 } from "uuid";
import {
  getPostsOfOne,
  getPostsOfUser,
} from "../../../../redux/actions/post-actions";
import CreatePost from "../../../../components/common/CreatePost";
import { useFetchData } from "../../../../components/hooks/useFetchData";
interface UserPostProps {
  currentUser: boolean;
  userId: string;
}
const UserPost: React.FC<UserPostProps> = ({ currentUser, userId }) => {
  const dispatch: AppDispatch = useDispatch();
  const isFetched = useFetchData(() => {
    if (currentUser) return dispatch(getPostsOfUser(userId));
    return dispatch(getPostsOfOne(userId));
  });
  const posts = currentUser
    ? useSelector((state: RootState) => state.post.posts)
    : useSelector((state: RootState) => state.post.otherPosts);
  const renderPosts = () =>
    posts.map((post) => {
      return <Post post={post} key={uuidv4()} />;
    });
  return (
    <div className="user-post">
      {currentUser && <CreatePost />}
      {isFetched && renderPosts()}
    </div>
  );
};

export default UserPost;
