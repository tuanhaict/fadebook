import React, { useEffect, useRef } from "react";
import { FaImages, FaTimes } from "react-icons/fa";
import "./UploadAvatarModal.scss";
import Avatar from "../Avatar";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux";
import { useFormik } from "formik";
import * as yup from "yup";
import { createPost } from "../../../redux/actions/post-actions";
import { setLoading } from "../../../redux/features/loadingSlice";
import { uploadAvatar } from "../../../redux/actions/user-actions";

interface UploadAvatarModalProps {
  setShowUploadAvatarModal: Function;
}
const createPostSchema = yup.object({
  avatar: yup.string().required("Avatar can not be empty!"),
});
const UploadAvatarModal: React.FC<UploadAvatarModalProps> = (props) => {
  const { setShowUploadAvatarModal } = props;
  const uploadAvatarModal = useRef<HTMLDivElement>(null);
  const dispatch: AppDispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      avatar: "",
    },
    validationSchema: createPostSchema,
    onSubmit: async (values, { resetForm }) => {
      resetForm();
      const formData = new FormData();
      if (values.avatar) {
        formData.append("avatar", values.avatar);
      }
      dispatch(setLoading(true));
      await dispatch(uploadAvatar(formData));
      setShowUploadAvatarModal(false);
      dispatch(setLoading(false));
    },
  });
  const imagePicker = useRef(null);
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      formik.setFieldValue("avatar", event.target.files[0]);
      (imagePicker.current! as any).classList.add("is-actived");
    }
  };
  useEffect(() => {
    const handleClosePostModal = (event: MouseEvent) => {
      if (
        event.target === uploadAvatarModal.current ||
        uploadAvatarModal.current?.contains(event.target as Node)
      ) {
        return;
      }
      setShowUploadAvatarModal(false);
    };
    window.addEventListener("click", handleClosePostModal);
    return () => {
      window.removeEventListener("click", handleClosePostModal);
    };
  });
  return (
    <div className="upload-avatar-wrapper">
      <div className="upload-avatar-modal" ref={uploadAvatarModal}>
        <p className="upload-avatar-title">Thay avatar</p>
        <div
          className="upload-avatar-close"
          onClick={() => {
            setShowUploadAvatarModal(false);
            console.log("duma");
          }}
        >
          <FaTimes className="upload-avatar-icon" />
        </div>

        <form
          onSubmit={formik.handleSubmit}
          className="upload-avatar-form"
          encType="multipart/form-data"
        >
          <div className="upload-avatar-extend">
            <p>Tải ảnh lên</p>
            <label htmlFor="upload-avatar-input" ref={imagePicker}>
              <FaImages className={`upload-avatar-image`} />
            </label>
            <input
              type="file"
              name="postImage"
              accept="image/png, image/jpeg, image/jpg"
              className="upload-avatar-input"
              id="upload-avatar-input"
              onChange={handleImageChange}
            ></input>
          </div>
          <button type="submit" className="post-button">
            Đổi
          </button>
        </form>
      </div>
    </div>
  );
};

export default React.memo(UploadAvatarModal);
