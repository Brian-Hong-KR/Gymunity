import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const EditInfo = () => {
  const navigate = useNavigate();
  console.log("EditInfo");

  const [users, setusers] = useState({
    userAccountId: "",
    password: "",
    nickName: "",
    userEmail: "",
    userName: "",
  });

  const { userAccountId, password, nickName, userEmail, userName } = users;

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("Authorization"),
      "Authorization-refresh": localStorage.getItem("Authorization-refresh"),
    },
  };

  const handleValueChange = (e) => {
    setusers({ ...users, [e.target.name]: e.target.value });
  };

  const [passwordCheck, setPasswordCheck] = useState("");

  const passChang = (e) => {
    if (password !== e.target.value) setPasswordCheck("확실해?");
    else setPasswordCheck("확실해!");
  };

  const info = async () => {
    await axios
      .get(`/user/editinfo/${localStorage.userAccountId}`, config)
      .then((response) => {
        // console.log(response);
        setusers((prev) => {
          return { ...prev, ...response.data, password: "" };
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    info();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!password) {
      alert("비밀번호를 입력하세요.");
      return;
    }

    await axios
      .put(`/user/update`, users, config)
      .then((response) => {
        localStorage.setItem("nickName", nickName);
        window.location.replace("/");
      })
      .catch();
  };

  return (
    <div className="container">
      <form onSubmit={onSubmit}>
        <div className="container">
          <h1>회원정보</h1>
          <div className="form-group mb-1">
            <input
              type="text"
              className="form-control"
              name="userAccountId"
              placeholder="아이디"
              value={localStorage.userAccountId}
              readOnly
            />
          </div>
          <div className="form-group mb-1">
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="비밀번호"
              value={password}
              onChange={handleValueChange}
            />
          </div>

          <div className="form-group mb-1">
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="비밀번호 확인"
              onChange={passChang}
            />
            <span>{passwordCheck}</span>
          </div>
          <div className="form-group mb-1">
            <input
              type="text"
              className="form-control"
              name="nickName"
              placeholder="닉네임"
              value={nickName}
              onChange={handleValueChange}
            />
          </div>

          <div className="form-group mb-1">
            <input
              type="eamil"
              className="form-control"
              name="userEmail"
              placeholder="이메일"
              value={userEmail}
              onChange={handleValueChange}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            회원정보 수정
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditInfo;
