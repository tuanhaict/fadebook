import { useSelector } from "react-redux";
import { RootState } from "../../../../redux";
import Post from "../../../../components/common/Post";
import { v4 as uuidv4 } from "uuid";
import React from "react";
const HomePost = () => {
  const posts = useSelector((state: RootState) => state.post.homePosts);
  const renderPosts = () => {
    return posts.map((post) => {
      return <Post post={post} key={uuidv4()} />;
    });
  };
  return <div>{renderPosts()}</div>;
};

export default React.memo(HomePost);
