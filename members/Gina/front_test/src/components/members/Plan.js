import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Plan = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [planData, setPlanData] = useState(null);

  useEffect(() => {
    if (
      location.state &&
      location.state.planData &&
      location.state.planData.length > 0
    ) {
      console.log("Plan data received:", location.state.planData[0]);
      setPlanData(location.state.planData[0]);
    } else {
      console.log("No plan data received.");
    }
  }, [location.state]);

  const handleRegister = () => {
    // 현재 location 상태를 `/joinadd` 페이지로 전달
    navigate("/joinadd", { state: { planData: planData } });
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

                {planData && (
                  <>
                    <p>{planData.plan_name}</p>
                    <hr />
                    <div
                      dangerouslySetInnerHTML={{ __html: planData.plan_desc }}
                    />
                    <hr />
                  </>
                )}

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
