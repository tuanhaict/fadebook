import React, { useState } from "react";
import UploadAvatarModal from "../UploadAvatarModal";
import { MdPhotoCamera } from "react-icons/md";
const UploadAvatar = () => {
  const [showUploadAvatar, setShowUploadAvatar] = useState(false);
  return (
    <div className="upload-avatar">
      <MdPhotoCamera
        onClick={(e: any) => {
          e.stopPropagation();
          setShowUploadAvatar(true);
        }}
      />
      {showUploadAvatar && (
        <UploadAvatarModal setShowUploadAvatarModal={setShowUploadAvatar} />
      )}
    </div>
  );
};

export default UploadAvatar;
