import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import HomeLayout from "./components/layouts/HomeLayout";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Loading from "./components/common/Loading";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div className="wrapper">
      <Loading />
      <Router>
        <Routes>
          <Route path="/" element={<HomeLayout />}>
            <Route path="home" element={<Home />} />
            <Route path="profile/:userId" element={<Profile />} />
          </Route>
          <Route path="/auth" element={<Auth />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
