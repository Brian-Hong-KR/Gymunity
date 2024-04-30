import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function useAuth() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLogin") === "true";

  useEffect(() => {
    if (!isLoggedIn) {
      alert("로그인 후 이용해주세요.");
      navigate("/main");
    }
  }, [isLoggedIn, navigate]);
}

export default useAuth;
