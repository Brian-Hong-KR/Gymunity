import React from "react";
import { Link } from "react-router-dom";
import TopBar from "../layout/TopBar"; // 가정한 TopBar 컴포넌트
import SideBar from "../layout/SideBar"; // 가정한 SideBar 컴포넌트

const MyPage = () => {
  return (
    <div id="wrapper">
      <SideBar />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <TopBar />

          {/* Page Content */}
          <div className="container-fluid">
            {/* Page Heading */}
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
              <h1 className="h3 mb-0 text-gray-800">사용자 이름</h1>
            </div>
            <div className="buttons">
              <Link to="/photo" className="btn-hover color-11">
                나의 사진첩
              </Link>
              <button className="btn-hover color-11">플랜 다시 세우기</button>
              <button className="btn-hover color-11">고객 문의</button>
              <button className="btn-hover color-10">회원 탈퇴</button>
            </div>

            {/* Content Rows and Cards */}
            <div className="row">
              {/* 각각의 카드와 컨텐츠를 여기에 작성 */}
              {/* 예: 포인트, 등급, 챌린지, 플랜 등 */}
            </div>

            {/* 기타 페이지 컨텐츠 및 구성요소 */}
            {/* 예: 차트, 데이터 테이블, 기타 UI 요소 */}

            {/* Footer */}
            <footer className="sticky-footer bg-white">
              <div className="container my-auto">
                <div className="copyright text-center my-auto">
                  <span>Copyright &copy; Gymunity 2024</span>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
