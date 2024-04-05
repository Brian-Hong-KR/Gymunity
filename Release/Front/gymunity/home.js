import React from 'react';
import './App.css'; // CSS 파일 이름을 App.css로 가정

function GymunityHome() {
  return (
    <div className="bg-gradient-primary">
      <div className="container">
        <div className="card o-hidden border-0 shadow-lg my-5">
          <div className="card-body p-0">
            <div className="row">
              <div className="col-lg-5 d-none d-lg-block bg-register-image"></div>
              <div className="col-lg-7">
                <div className="p-5">
                  <div className="text-center">
                    <h1 className="h4 text-gray-900 mb-4">함께 즐겁게 운동해요!</h1>
                  </div>
                  <div className="buttons">
                    <button className="btn-hover color-11" onClick={() => window.location.href = 'survey'}>
                      Let's Go !
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GymunityHome;