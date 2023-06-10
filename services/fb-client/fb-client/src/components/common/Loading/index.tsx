import { useSelector } from "react-redux";
import "./Loading.scss";
import { RootState } from "../../../redux";
const Loading = () => {
  const loading = useSelector((state: RootState) => state.loading.value);
  return (
    <>
      {loading ? (
        <div className="loading">
          <div className="follow-the-leader">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Loading;
