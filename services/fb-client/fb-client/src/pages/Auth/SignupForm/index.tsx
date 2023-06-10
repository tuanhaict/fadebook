import { useEffect, useRef } from "react";
import "./SignupForm.scss";
import { FaTimes } from "react-icons/fa";
import * as yup from "yup";
import { useFormik } from "formik";
import { AppDispatch } from "../../../redux";
import { useDispatch } from "react-redux";
import { Signup } from "../../../redux/actions/user-actions";
import { useNavigate } from "react-router-dom";
import { setLoading } from "../../../redux/features/loadingSlice";
interface SignupFormProps {
  setShowSignupModel: Function;
}
export interface SignupProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateOfBirth: string;
  gender: string;
}
const initialValues: SignupProps = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  dateOfBirth: "",
  gender: "male",
};
const registerSchema = yup.object({
  firstName: yup.string().required("First name can not be empty!"),
  lastName: yup.string().required("Last name can not be empty!"),
  email: yup.string().email("Email must be valid").required(),
  password: yup.string().min(8, "Password must be at least 8 character"),
  dateOfBirth: yup.date().required("Date of birth can not be null"),
  gender: yup.string().required(),
});
const SignupForm: React.FC<SignupFormProps> = ({ setShowSignupModel }) => {
  const registerModal = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleShowSignupModal = (event: MouseEvent) => {
      if (
        event.target === registerModal.current ||
        registerModal.current?.contains(event.target as Node)
      )
        return;
      setShowSignupModel(false);
    };
    window.addEventListener("click", handleShowSignupModal);
    return () => {
      window.removeEventListener("click", handleShowSignupModal);
    };
  }, []);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues,
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      try {
        dispatch(setLoading(true));
        await dispatch(Signup(values));
        navigate("/home");
        dispatch(setLoading(false));
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <div className="auth-register">
      <div className="auth-register-modal" ref={registerModal}>
        <div className="auth-register-top">
          <p className="auth-register-title">Đăng ký</p>
          <p className="auth-register-desc">Nhanh chóng và dễ dàng</p>
          <FaTimes
            onClick={() => setShowSignupModel(false)}
            className="auth-register-icon"
          />
        </div>
        <form onSubmit={formik.handleSubmit} className="auth-register-form">
          <div className="auth-register-name">
            <input
              type="text"
              name="firstName"
              placeholder="Họ"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              autoComplete="off"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Tên"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              autoComplete="off"
            />
          </div>
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            autoComplete="off"
          />
          <input
            type="password"
            name="password"
            placeholder="Mật khẩu mới"
            value={formik.values.password}
            onChange={formik.handleChange}
            autoComplete="off"
          />
          <span className="auth-register-tag">Ngày sinh</span>
          <input
            type="date"
            name="dateOfBirth"
            value={formik.values.dateOfBirth}
            onChange={formik.handleChange}
          />

          <span className="auth-register-tag">Giới tính</span>
          <div className="auth-register-gender">
            <div className="auth-register-radio">
              <label htmlFor="auth-register-female">Nữ</label>
              <input
                type="radio"
                name="gender"
                id="auth-register-female"
                value="female"
                checked={formik.values.gender === "female"}
                onChange={formik.handleChange}
              />
            </div>
            <div className="auth-register-radio">
              <label htmlFor="auth-register-male">Nam</label>
              <input
                type="radio"
                name="gender"
                id="auth-register-male"
                value="male"
                checked={formik.values.gender === "male"}
                onChange={formik.handleChange}
              />
            </div>
          </div>
          <button type="submit" className="auth-button">
            Đăng ký
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
