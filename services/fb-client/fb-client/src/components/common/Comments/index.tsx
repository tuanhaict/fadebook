import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux";
import { v4 as uuidv4 } from "uuid";
import Avatar from "../Avatar";
import "./Comments.scss";
interface CommentsProps {
  postId: string;
}
const Comments: React.FC<CommentsProps> = ({ postId }) => {
  const comments = useSelector((state: RootState) =>
    state.post.comments.filter((comment) => comment.postId === postId)
  );
  const renderComments = () => {
    return comments.map((comment) => {
      return (
        <li className="comment-item" key={uuidv4()}>
          <Avatar
            user={{ ...comment.user, id: comment.userId }}
            username={false}
          />
          <div className="comment-content">
            <span className="comment-username">{`${comment.user.firstName} ${comment.user.lastName}`}</span>
            <p className="comment-text">{comment.content}</p>
          </div>
        </li>
      );
    });
  };
  if (comments.length === 0) return <></>;
  return <ul className="comment-list">{renderComments()}</ul>;
};

export default Comments;
