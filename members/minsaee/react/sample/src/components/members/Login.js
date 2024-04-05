import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [inputs, setInputs] = useState({
    userAccountId: "",
    password: "",
  });

  const { userAccountId, password } = inputs;

  const handleValueChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("/user/login", inputs)
      .then((response) => {
        //console.log(response);
        // let jwtToken = response.headers["authorization"];
        //let jwtToken = response.headers.get('authorization');
        //let refreshToken = response.headers.get('refreshToken');
        //console.log(jwtToken);
        let accessToken = response.data.accessToken;
        let refreshToken = response.data.refreshToken;
        console.log("accessToken", accessToken);
        console.log("refreshToken", refreshToken);
        localStorage.setItem("Authorization", accessToken);
        localStorage.setItem("Authorization-refresh", refreshToken);
        localStorage.setItem("userAccountId", response.data.userAccountId);
        localStorage.setItem("nickName", response.data.nickName);
        localStorage.setItem("isLogin", true);

        setInputs({ userAccountId: "", password: "" });
        //return response.data.memberEmail;
      })
      .then((response) => {
        //console.log("then", response);
        window.location.replace("/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="container text-center mt-5">
      <div className="mx-5">
        <h1>로그인</h1>
        <form onSubmit={onSubmit}>
          <div className="form-group mt-1">
            <input
              type="text"
              name="userAccountId"
              className="form-control"
              id="userAccountId"
              value={userAccountId}
              placeholder="아이디"
              maxLength="20"
              onChange={handleValueChange}
            />
          </div>
          <div className="form-group mt-1">
            <input
              type="password"
              className="form-control"
              name="password"
              id="password"
              value={password}
              placeholder="비밀번호"
              maxLength="20"
              onChange={handleValueChange}
            />
          </div>
          <div className="mt-1">
            <button type="submit" className="btn btn-primary">
              로그인
            </button>
            <Link className="btn btn-primary" to="/joinadd">
              회원 가입
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
