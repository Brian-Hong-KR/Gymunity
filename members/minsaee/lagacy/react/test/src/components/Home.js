import React from "react";

const Home = () => {
  const handleButtonClick = () => {
    window.location.href = "survey";
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
                  <h1 className="h4 text-gray-900 mb-4">
                    함께 즐겁게 운동해요!
                  </h1>
                </div>
                <div className="buttons">
                  <button
                    className="btn-hover color-11"
                    onClick={handleButtonClick}
                  >
                    Let's Go !
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
