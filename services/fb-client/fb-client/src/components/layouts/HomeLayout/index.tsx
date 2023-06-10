import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../../../redux";
import Navbar from "../../common/Navbar";

const HomeLayout = () => {
  const user = useSelector((state: RootState) => state.user.currentUser);
  if (!user) return <Navigate to="/auth" />;
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default HomeLayout;
