import Avatar from "../Avatar";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux";
import CreatePostModal from "../CreatePostModal";
import { useState } from "react";
import "./CreatePost.scss";
const CreatePost = () => {
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);
  const handleButtonClick = (event: any) => {
    event.stopPropagation();
    setShowCreatePostModal(true);
  };
  const user = useSelector((state: RootState) => state.user.currentUser);
  return (
    <div className="create-post">
      <Avatar user={user!} username={false} />
      <button
        onClick={(e) => handleButtonClick(e)}
        className="create-post-button"
      >
        {`${user!.firstName
          .charAt(0)
          .toUpperCase()
          .concat(user!.firstName.slice(1))} ơi, bạn đang nghĩ gì thế?`}
      </button>
      {showCreatePostModal && (
        <CreatePostModal setShowCreatePostModal={setShowCreatePostModal} />
      )}
    </div>
  );
};

export default CreatePost;
