import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { Login } from "../../../redux/actions/user-actions";
import { AppDispatch } from "../../../redux";
import "./LoginForm.scss";
import { useNavigate } from "react-router-dom";
import { setLoading } from "../../../redux/features/loadingSlice";
interface LoginFormProps {
  setShowSignupModel: Function;
}
export interface LoginProps {
  email: string;
  password: string;
}
const initialValues: LoginProps = {
  email: "",
  password: "",
};
const loginSchema = yup.object({
  email: yup
    .string()
    .email("Email must be valid")
    .required("Email is required!"),
  password: yup.string().min(8, "Password must be at least 8 characters!"),
});
const LoginForm: React.FC<LoginFormProps> = (props) => {
  const { setShowSignupModel } = props;
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        dispatch(setLoading(true));
        await dispatch(Login(values));
        navigate("/home");
        dispatch(setLoading(false));
      } catch (error) {}
    },
  });
  const handleSignupButtonClick = (event: any) => {
    event.stopPropagation();
    setShowSignupModel(true);
  };
  return (
    <div className="auth-login">
      <form onSubmit={formik.handleSubmit} className="auth-login-form">
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Mật khẩu"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        <button type="submit">Đăng nhập</button>
      </form>

      <div className="forgot-password-wrapper">
        <span className="forgot-password">Quên mật khẩu?</span>
      </div>
      <button
        className="auth-button"
        onClick={(e) => handleSignupButtonClick(e)}
      >
        Tạo tài khoản
      </button>
    </div>
  );
};

export default LoginForm;
