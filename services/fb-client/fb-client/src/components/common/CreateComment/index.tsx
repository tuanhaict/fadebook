import React from "react";
import Avatar from "../Avatar";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux";
import { BsFillSendPlusFill } from "react-icons/bs";
import * as yup from "yup";
import "./CreateComment.scss";
import { useFormik } from "formik";
import { createComment } from "../../../redux/actions/post-actions";
import { setLoading } from "../../../redux/features/loadingSlice";

export interface CreateCommentFormProps {
  content: string;
  postId: string;
}
const initialValues = {
  content: "",
};
interface CreateCommentProps {
  postId: string;
}
const createCommentSchema = yup.object({
  content: yup.string().required("Comment can not be empty!"),
});
const CreateComment: React.FC<CreateCommentProps> = ({ postId }) => {
  const user = useSelector((state: RootState) => state.user.currentUser);
  const dispatch: AppDispatch = useDispatch();
  const formik = useFormik({
    initialValues,
    validationSchema: createCommentSchema,
    onSubmit: async (values, { resetForm }) => {
      resetForm();
      setLoading(true);
      await dispatch(
        createComment({
          content: values.content,
          postId,
        })
      );
      setLoading(false);
    },
  });
  return (
    <div className="create-comment">
      <Avatar user={user!} username={false} />
      <form onSubmit={formik.handleSubmit} className="create-comment-form">
        <textarea
          name="content"
          id=""
          className="create-comment-textarea"
          placeholder="Viết bình luận..."
          rows={4}
          value={formik.values.content}
          onChange={formik.handleChange}
        ></textarea>
        <button type="submit" className="create-comment-button">
          <BsFillSendPlusFill className="create-comment-icon" />
        </button>
      </form>
    </div>
  );
};

export default React.memo(CreateComment);
