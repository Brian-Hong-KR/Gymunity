import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const JoinAdd = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState({
    userAccountId: "",
    password: "",
    nickname: "",
    userEmail: "",
    userName: "",
  });

  const handleValueChange = (e) => {
    setUsers((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(`/user/signup`, users)
      .then((response) => {
        console.log(response);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <form onSubmit={onSubmit}>
        <div className="container">
          <h1>회원가입</h1>
          <div className="form-group mb-1">
            <input
              type="text"
              className="form-control"
              name="userAccountId"
              placeholder="아이디"
              onChange={handleValueChange}
            />
          </div>
          <div className="form-group mb-1">
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="비밀번호"
              onChange={handleValueChange}
            />
          </div>
          <div className="form-group mb-1">
            <input
              type="email"
              className="form-control"
              name="userEmail"
              placeholder="이메일"
              onChange={handleValueChange}
            />
          </div>
          <div className="form-group mb-1">
            <input
              type="text"
              className="form-control"
              name="userName"
              placeholder="이름"
              onChange={handleValueChange}
            />
          </div>

          <div className="form-group mb-1">
            <input
              type="text"
              className="form-control"
              name="nickname"
              placeholder="닉네임"
              onChange={handleValueChange}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            가입 완료
          </button>
        </div>
      </form>
    </div>
  );
};

export default JoinAdd;
