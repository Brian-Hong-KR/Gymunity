import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import MyPage from "./components/user/MyPage";

function App() {
  return (
    <div className="container">
      <Routes>
        <Route index element={<Home />} />
        <Route path="mypage" element={<MyPage />} />
      </Routes>
    </div>
  );
}

export default App;
