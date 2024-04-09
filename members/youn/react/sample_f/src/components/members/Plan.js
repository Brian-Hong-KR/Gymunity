import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Plan = () => {
  const navigate = useNavigate();
  const [planData, setPlanData] = useState(null);


   useEffect(() => {
    const fetchData = async () => {
      try {
        // 클라이언트에서 보낸 데이터를 가져와서 서버로 전송
        const response = await axios.post('/plan', {
          gender: localStorage.getItem('surveyGender'),
          age: localStorage.getItem('surveyAge'),
          goal: localStorage.getItem('surveyGoal'),
          level: localStorage.getItem('surveyLevel'),
          abnormal: localStorage.getItem('surveyAbnormal')
        });
        const receivedPlanData = response.data;

        // 받아온 결과를 상태에 저장
        setPlanData(receivedPlanData);
      } catch (error) {
        console.error('Error fetching plan data:', error);
      }
    };

    fetchData();
  }, []);

  const handleRegister = () => {
    navigate("/joinadd");
  };

  const handleSurveyReset = () => {
    navigate("/survey");
  };

  return (
    <div className='container'>
      <div className='card o-hidden border-0 shadow-lg my-5'>
        <div className='card-body p-0'>
          <div className='row'>
            <div className='col-lg-5 d-none d-lg-block bg-register-image'></div>
            <div className='col-lg-7'>
              <div className='p-5'>
                <div className='text-center'>
                  <h1 className='h4 text-gray-900 mb-4'>맞춤 플랜</h1>
                </div>

                {/* 받아온 결과를 표시하는 부분 */}
                {planData && (
                  <div>
                    <p>플랜 이름: {planData.planName}</p>
                    <hr />
                    <div>{planData.planDesc}</div>
                  </div>
                )}

                <hr />
                <p className='mb-4'>
                  운동 기록을 관리하기 위하여 회원 가입이 필요합니다.
                </p>

                <button onClick={handleRegister} className='btn-hover color-11'>
                  회원가입
                </button>

                <button
                  onClick={handleSurveyReset}
                  className='btn-hover color-11'
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
