import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const JoinAdd = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const planData = location.state?.planData;

  const [users, setUsers] = useState({
    userAccountId: "",
    password: "",
    nickName: "",
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

    // survey 데이터가 배열이면 첫 번째 요소를 사용하고, 배열이 아니면 그대로 사용
    const surveyData = Array.isArray(planData) ? planData[0] : planData;

    // 포인트 데이터를 생성 (예시로 초기 포인트를 400으로 설정)
    const pointData = {
      pointsAdded: 400,
      pointsSubtracted: 0,
      reason: "회원가입 보상",
    };

    const userRegistrationData = {
      usersDTO: users,
      survey: surveyData,
      point: pointData,
    };

    console.log("Sending requestData:", userRegistrationData); // 로그 출력

    await axios
      .post(`/user/signup`, userRegistrationData)
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
              name="nickName"
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
