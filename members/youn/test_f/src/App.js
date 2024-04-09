import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import MyPage from "./components/user/MyPage";
import Pt from "./components/pt/Pt";

function App() {
  return (
    <div className="container">
      <Routes>
        <Route index element={<Home />} />
        <Route path="mypage" element={<MyPage />} />
        <Route path="pt" element={<Pt />} />
      </Routes>
    </div>
  );
}

export default App;
