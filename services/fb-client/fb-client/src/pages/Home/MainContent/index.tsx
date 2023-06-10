import CreatePost from "../../../components/common/CreatePost";
import "./MainContent.scss";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux";
import { getPosts } from "../../../redux/actions/post-actions";
import HomePost from "./HomePost";
import { useFetchData } from "../../../components/hooks/useFetchData";
const MainContent = () => {
  const dispatch: AppDispatch = useDispatch();
  const isFetched = useFetchData(() => {
    return dispatch(getPosts());
  });
  return (
    <div className="main">
      <div className="main-container">
        <CreatePost />
        {isFetched && <HomePost />}
      </div>
    </div>
  );
};

export default MainContent;
