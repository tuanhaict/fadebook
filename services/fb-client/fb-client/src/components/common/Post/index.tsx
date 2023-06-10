import React, { useState } from "react";
import { Post as PostModel } from "../../../redux/features/postSlice";
import Avatar from "../Avatar";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux";
import { AiFillLike, AiOutlineComment, AiOutlineLike } from "react-icons/ai";
import CreateComment from "../CreateComment";
import "./Post.scss";
import Comments from "../Comments";
import {
  getCommentsOfPost,
  toogleLikePost,
} from "../../../redux/actions/post-actions";
import { setLoading } from "../../../redux/features/loadingSlice";
interface PostProps {
  post: PostModel;
}
const Post: React.FC<PostProps> = ({ post }) => {
  const [showCreateComment, setShowCreateComment] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const isLikedByCurrentUser = useSelector(
    (state: RootState) => state.post.likedPosts
  ).some((postId) => postId === post.id);
  const user = { id: post.userId, ...post.user };
  const dispatch: AppDispatch = useDispatch();
  const handleLikePost = async () => {
    dispatch(setLoading(true));
    await dispatch(toogleLikePost(post.id));
    dispatch(setLoading(false));
  };
  const handleShowComments = async () => {
    dispatch(setLoading(true));
    await dispatch(getCommentsOfPost(post.id));
    dispatch(setLoading(false));
    setShowComments(true);
    setShowCreateComment(true);
  };
  return (
    <div className="post">
      <div className="post-top">
        <Avatar user={user} username={true} />
        <p className="post-caption">{post.caption}</p>
      </div>
      {post.image && (
        <div className="post-image-wrapper">
          <img src={post.image} alt="" className="post-image" />
        </div>
      )}
      <div className="post-statistics">
        <div className="post-reactions">
          <AiFillLike className="post-reactions-icon" />
          <span className="post-reactions-text">{`${post.likes} lượt thích`}</span>
        </div>
        <span
          className="post-comments"
          onClick={handleShowComments}
        >{`${post.comments} bình luận`}</span>
      </div>
      <div className="post-actions">
        <div
          className={`post-action ${isLikedByCurrentUser ? "is-actived" : ""}`}
          onClick={handleLikePost}
        >
          <AiOutlineLike className="post-icon" />
          <span className="post-action-text">Thích</span>
        </div>
        <div className="post-action" onClick={() => setShowCreateComment(true)}>
          <AiOutlineComment className="post-icon" />
          <span className="post-action-text">Bình luận</span>
        </div>
      </div>
      {showCreateComment && <CreateComment postId={post.id} />}
      {showComments && <Comments postId={post.id} />}
    </div>
  );
};

export default React.memo(Post);
