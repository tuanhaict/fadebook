import { useEffect, useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import FbImage from "../../assets/dF5SId3UHWd.svg";
import "./Auth.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import { useNavigate } from "react-router-dom";
const Auth = () => {
  const user = useSelector((state: RootState) => state.user.currentUser);
  const [showSignupModel, setShowSignupModel] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  });
  return (
    <div className="auth">
      <div className="auth-inner auth-container">
        <div className="auth-content">
          <div className="auth-logo">
            <img
              className="auth-logo-image"
              src={FbImage}
              alt="Fadebook image"
            />
            <h2 className="auth-logo-slogan">
              Facebook giúp bạn kết nối và chia sẻ với mọi người trong cuộc sống
              của bạn.
            </h2>
          </div>
          <LoginForm setShowSignupModel={setShowSignupModel} />
          {showSignupModel && (
            <SignupForm setShowSignupModel={setShowSignupModel} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
