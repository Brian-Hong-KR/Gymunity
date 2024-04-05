import React from "react";
import { useNavigate } from "react-router-dom";

const Plan = () => {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate("/joinadd");
  };

  const handleSurveyReset = () => {
    navigate("/survey");
  };

  return (
    <div className="container">
      <div className="card o-hidden border-0 shadow-lg my-5">
        <div className="card-body p-0">
          <div className="row">
            <div className="col-lg-5 d-none d-lg-block bg-register-image"></div>
            <div className="col-lg-7">
              <div className="p-5">
                <div className="text-center">
                  <h1 className="h4 text-gray-900 mb-4">맞춤 플랜</h1>
                </div>

                {/* 여기에 맞춤 플랜 내용을 렌더링하세요. */}
                <p>{/* planName을 여기에 렌더링 */}</p>
                <hr />

                {/* planDesc 렌더링 */}
                <div>{/* 여기에 설명 텍스트 또는 컴포넌트 */}</div>

                <hr />
                <p className="mb-4">
                  운동 기록을 관리하기 위하여 회원 가입이 필요합니다.
                </p>

                <button onClick={handleRegister} className="btn-hover color-11">
                  회원가입
                </button>

                <button
                  onClick={handleSurveyReset}
                  className="btn-hover color-11"
                >
                  설문 다시 하기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plan;
