import React, { useEffect, useRef } from "react";
import { FaImages, FaTimes } from "react-icons/fa";
import "./CreatePostModal.scss";
import Avatar from "../Avatar";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux";
import { useFormik } from "formik";
import * as yup from "yup";
import { createPost } from "../../../redux/actions/post-actions";
import { setLoading } from "../../../redux/features/loadingSlice";
interface CreatePostModalProps {
  setShowCreatePostModal: Function;
}
export interface CreatePostFormProps {
  caption: string;
  postImage?: any;
}
const initialValues: CreatePostFormProps = {
  caption: "",
  postImage: "",
};
const createPostSchema = yup.object({
  caption: yup.string().required("Caption can not be empty!"),
});
const CreatePostModal: React.FC<CreatePostModalProps> = (props) => {
  const { setShowCreatePostModal } = props;
  const user = useSelector((state: RootState) => state.user.currentUser);
  const createPostModal = useRef<HTMLDivElement>(null);
  const dispatch: AppDispatch = useDispatch();
  const formik = useFormik({
    initialValues,
    validationSchema: createPostSchema,
    onSubmit: async (values, { resetForm }) => {
      resetForm();
      const formData = new FormData();
      formData.append("caption", values.caption);
      if (values.postImage) {
        formData.append("postImage", values.postImage);
      }
      dispatch(setLoading(true));
      await dispatch(createPost(formData));
      dispatch(setLoading(false));
      setShowCreatePostModal(false);
    },
  });
  const imagePicker = useRef(null);
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      formik.setFieldValue("postImage", event.target.files[0]);
      (imagePicker.current! as any).classList.add("is-actived");
    }
  };
  useEffect(() => {
    const handleClosePostModal = (event: MouseEvent) => {
      if (
        event.target === createPostModal.current ||
        createPostModal.current?.contains(event.target as Node)
      ) {
        return;
      }
      setShowCreatePostModal(false);
    };
    window.addEventListener("click", handleClosePostModal);
    return () => {
      window.removeEventListener("click", handleClosePostModal);
    };
  });
  return (
    <div className="create-post-wrapper">
      <div className="create-post-modal" ref={createPostModal}>
        <p className="create-post-title">Tạo bài viết</p>
        <div
          className="create-post-close"
          onClick={() => setShowCreatePostModal(false)}
        >
          <FaTimes className="create-post-icon" />
        </div>

        <form
          onSubmit={formik.handleSubmit}
          className="create-post-form"
          encType="multipart/form-data"
        >
          <Avatar user={user!} username={true} />
          <textarea
            name="caption"
            id=""
            rows={8}
            value={formik.values.caption}
            onChange={formik.handleChange}
            className="input-textarea"
            placeholder={`${user!.firstName
              .charAt(0)
              .toUpperCase()
              .concat(user!.firstName.slice(1))} ơi, bạn đang nghĩ gì thế?`}
          ></textarea>
          <div className="create-post-extend">
            <p>Thêm vào bài viết của bạn</p>
            <label htmlFor="create-post-input" ref={imagePicker}>
              <FaImages className={`create-post-image`} />
            </label>
            <input
              type="file"
              name="postImage"
              accept="image/png, image/jpeg, image/jpg"
              className="create-post-input"
              id="create-post-input"
              onChange={handleImageChange}
            ></input>
          </div>
          <button type="submit" className="post-button">
            Đăng
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePostModal;
