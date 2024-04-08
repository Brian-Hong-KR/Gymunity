import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Survey = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    gender: "female",
    age: "young",
    goal: "Overall health improvement",
    level: "Intermediate",
    abnormal: "no health problems",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitting", formData);

    // formData를 로컬 스토리지에 저장
    localStorage.setItem("surveyGender", formData.gender);
    localStorage.setItem("surveyAge", formData.age);
    localStorage.setItem("surveyGoal", formData.goal);
    localStorage.setItem("surveyLevel", formData.level);
    localStorage.setItem("surveyAbnormal", formData.abnormal);

    // Plan 페이지로 이동
    navigate("/plan");
  };

  return (
    <div className="container">
      <div className="card o-hidden border-0 shadow-lg my-5">
        <div className="card-body p-0">
          <div className="row">
            <div className="col-lg-7">
              <div className="p-5">
                <div className="text-center">
                  <h1 className="h4 text-gray-900 mb-4">설문조사</h1>
                </div>
                <form onSubmit={handleSubmit}>
                  {/* 1. 성별 */}
                  <div className="top-text-wrapper">
                    <div className="text-center">
                      <h4>1. 당신의 성별은?</h4>
                    </div>
                  </div>
                  <div className="grid-wrapper grid-col-auto">
                    <label htmlFor="radio-card-21" className="radio-card">
                      <input
                        type="radio"
                        name="gender"
                        id="radio-card-21"
                        value="male"
                        checked={formData.gender === "male"}
                        onChange={handleChange}
                      />
                      <div className="card-content-wrapper">
                        <span className="check-icon"></span>
                        <div className="card-content">
                          <i className="fi fi-br-male"></i>
                          <h4>남자</h4>
                        </div>
                      </div>
                    </label>
                    <label htmlFor="radio-card-22" className="radio-card">
                      <input
                        type="radio"
                        name="gender"
                        id="radio-card-22"
                        value="female"
                        checked={formData.gender === "female"}
                        onChange={handleChange}
                      />
                      <div className="card-content-wrapper">
                        <span className="check-icon"></span>
                        <div className="card-content">
                          <i className="fi fi-br-female"></i>
                          <h4>여자</h4>
                        </div>
                      </div>
                    </label>
                  </div>
                  <hr />

                  {/* 2. 연령대 */}
                  <div className="top-text-wrapper">
                    <div className="text-center">
                      <h4>2. 당신의 연령대는?</h4>
                    </div>
                  </div>
                  <div className="grid-wrapper grid-col-auto">
                    <label htmlFor="radio-card-1" className="radio-card">
                      <input
                        type="radio"
                        name="age"
                        id="radio-card-1"
                        value="young"
                        checked={formData.age === "young"}
                        onChange={handleChange}
                      />
                      <div className="card-content-wrapper">
                        <span className="check-icon"></span>
                        <div className="card-content">
                          <i className="fi fi-br-arrow-alt-down"></i>
                          <h4>35세 이하</h4>
                        </div>
                      </div>
                    </label>
                    <label htmlFor="radio-card-2" className="radio-card">
                      <input
                        type="radio"
                        name="age"
                        id="radio-card-2"
                        value="old"
                        checked={formData.age === "old"}
                        onChange={handleChange}
                      />
                      <div className="card-content-wrapper">
                        <span className="check-icon"></span>
                        <div className="card-content">
                          <i className="fi fi-br-arrow-alt-up"></i>
                          <h4>36세 이상</h4>
                        </div>
                      </div>
                    </label>
                  </div>
                  <hr />

                  {/* 3. 운동 목표 */}
                  <div className="top-text-wrapper">
                    <div className="text-center">
                      <h4>3. 당신의 운동 목표는?</h4>
                    </div>
                  </div>
                  <div className="grid-wrapper grid-col-auto">
                    <label htmlFor="radio-card-3" className="radio-card">
                      <input
                        type="radio"
                        name="goal"
                        id="radio-card-3"
                        value="Body fat reduction"
                        checked={formData.goal === "Body fat reduction"}
                        onChange={handleChange}
                      />
                      <div className="card-content-wrapper">
                        <span className="check-icon"></span>
                        <div className="card-content">
                          <i className="fi fi-br-running"></i>
                          <h4>체지방량 감소</h4>
                        </div>
                      </div>
                    </label>
                    <label htmlFor="radio-card-4" className="radio-card">
                      <input
                        type="radio"
                        name="goal"
                        id="radio-card-4"
                        value="Muscle gain"
                        checked={formData.goal === "Muscle gain"}
                        onChange={handleChange}
                      />
                      <div className="card-content-wrapper">
                        <span className="check-icon"></span>
                        <div className="card-content">
                          <i className="fi fi-br-gym"></i>
                          <h4>근육량 증가</h4>
                        </div>
                      </div>
                    </label>
                    <label htmlFor="radio-card-5" className="radio-card">
                      <input
                        type="radio"
                        name="goal"
                        id="radio-card-5"
                        value="Overall health improvement"
                        checked={formData.goal === "Overall health improvement"}
                        onChange={handleChange}
                      />
                      <div className="card-content-wrapper">
                        <span className="check-icon"></span>
                        <div className="card-content">
                          <i className="fi fi-br-equality"></i>
                          <h4>종합 건강</h4>
                        </div>
                      </div>
                    </label>
                  </div>
                  <hr />

                  {/* 4. 운동 수준 */}
                  <div className="top-text-wrapper">
                    <div className="text-center">
                      <h4>4. 당신의 운동 수준은?</h4>
                    </div>
                  </div>
                  <div className="grid-wrapper grid-col-auto">
                    <label htmlFor="radio-card-6" className="radio-card">
                      <input
                        type="radio"
                        name="level"
                        id="radio-card-6"
                        value="beginner"
                        checked={formData.level === "beginner"}
                        onChange={handleChange}
                      />
                      <div className="card-content-wrapper">
                        <span className="check-icon"></span>
                        <div className="card-content">
                          <i className="fi fi-br-signal-alt"></i>
                          <h4>입문</h4>
                        </div>
                      </div>
                    </label>
                    <label htmlFor="radio-card-7" className="radio-card">
                      <input
                        type="radio"
                        name="level"
                        id="radio-card-7"
                        value="Intermediate"
                        checked={formData.level === "Intermediate"}
                        onChange={handleChange}
                      />
                      <div className="card-content-wrapper">
                        <span className="check-icon"></span>
                        <div className="card-content">
                          <i className="fi fi-br-signal-alt-1"></i>
                          <h4>중급</h4>
                        </div>
                      </div>
                    </label>
                    <label htmlFor="radio-card-8" className="radio-card">
                      <input
                        type="radio"
                        name="level"
                        id="radio-card-8"
                        value="advanced"
                        checked={formData.level === "advanced"}
                        onChange={handleChange}
                      />
                      <div className="card-content-wrapper">
                        <span className="check-icon"></span>
                        <div className="card-content">
                          <i className="fi fi-br-signal-alt-2"></i>
                          <h4>전문가</h4>
                        </div>
                      </div>
                    </label>
                  </div>
                  <hr />

                  {/* 5. 건강 이상 */}
                  <div className="top-text-wrapper">
                    <div className="text-center">
                      <h4>5. 운동 시 주의가 필요한 건강 이상은?</h4>
                    </div>
                  </div>
                  <div className="grid-wrapper grid-col-auto">
                    <label htmlFor="radio-card-9" className="radio-card">
                      <input
                        type="radio"
                        name="abnormal"
                        id="radio-card-9"
                        value="cardiovascular disease"
                        checked={formData.abnormal === "cardiovascular disease"}
                        onChange={handleChange}
                      />
                      <div className="card-content-wrapper">
                        <span className="check-icon"></span>
                        <div className="card-content">
                          <i className="fi fi-br-heart"></i>
                          <h4>심혈관계</h4>
                        </div>
                      </div>
                    </label>
                    <label htmlFor="radio-card-10" className="radio-card">
                      <input
                        type="radio"
                        name="abnormal"
                        id="radio-card-10"
                        value="musculoskeletal disorders"
                        checked={
                          formData.abnormal === "musculoskeletal disorders"
                        }
                        onChange={handleChange}
                      />
                      <div className="card-content-wrapper">
                        <span className="check-icon"></span>
                        <div className="card-content">
                          <i className="fi fi-br-bone"></i>
                          <h4>근골격계</h4>
                        </div>
                      </div>
                    </label>
                    <label htmlFor="radio-card-11" className="radio-card">
                      <input
                        type="radio"
                        name="abnormal"
                        id="radio-card-11"
                        value="respiratory diseases"
                        checked={formData.abnormal === "respiratory diseases"}
                        onChange={handleChange}
                      />
                      <div className="card-content-wrapper">
                        <span className="check-icon"></span>
                        <div className="card-content">
                          <i className="fi fi-br-lungs"></i>
                          <h4>호흡기</h4>
                        </div>
                      </div>
                    </label>
                    <label htmlFor="radio-card-12" className="radio-card">
                      <input
                        type="radio"
                        name="abnormal"
                        id="radio-card-12"
                        value="no health problems"
                        checked={formData.abnormal === "no health problems"}
                        onChange={handleChange}
                      />
                      <div className="card-content-wrapper">
                        <span className="check-icon"></span>
                        <div className="card-content">
                          <i className="fi fi-br-grin"></i>
                          <h4>없음</h4>
                        </div>
                      </div>
                    </label>
                  </div>
                  <hr />

                  <input
                    type="submit"
                    className="btn-hover color-11"
                    value="맞춤 플랜 생성"
                  />

                  <p>플랜 생성에 1분 정도 시간이 소요됩니다.</p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Survey;
