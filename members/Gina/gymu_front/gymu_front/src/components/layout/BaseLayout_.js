import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const activeStyle = ({ isActive }) => ({
  color: isActive ? "green" : "",
  fontSize: isActive ? "1.2rem" : "",
});

const BaseLayout = () => {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
        <div className="container-fluid">
          <ul className="navbar-nav ml-auto">

            {console.log(
              "localStorage_memberEmail",
              localStorage.getItem("memberEmail")
            )}
            {localStorage.getItem("memberEmail") == null ? (
              <>
                <li className="nav-item dropdown no-arrow d-sm-none">
                  <NavLink style={activeStyle} className="nav-link" to="/login">
                    로그인
                  </NavLink>
                </li>

                <li className="nav-item dropdown no-arrow d-sm-none">
                  <NavLink
                    style={activeStyle}
                    className="nav-link"
                    to="/joinadd"
                  >
                    회원가입
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item dropdown no-arrow d-sm-none">
                  <NavLink
                    style={activeStyle}
                    className="nav-link"
                    to="/logout"
                  >
                    {localStorage.getItem("memberName")}
                    <span style={{ fontSize: "10px" }}>로그아웃</span>
                  </NavLink>
                </li>

                <li className="nav-item dropdown no-arrow d-sm-none">
                  <NavLink
                    style={activeStyle}
                    className="nav-link"
                    to="/editinfo"
                  >
                    회원수정
                  </NavLink>
                </li>

                <li className="nav-item dropdown no-arrow d-sm-none">
                  <NavLink
                    style={activeStyle}
                    className="nav-link"
                    to="/memberremove"
                  >
                    회원탈퇴
                  </NavLink>
                </li>
              </>
            )}

            <li className="nav-item">
              <NavLink
                style={activeStyle}
                className="nav-link"
                to="/board/list/1"
              >
                게시판
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
      <nav className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled">
        <div className="container-fluid">
          <ul className="navbar-nav">
            <li className="sidebar-brand d-flex align-items-center justify-content-center">
              <NavLink style={activeStyle} className="sidebar-brand-text mx-3" to="/">
                gymunity
              </NavLink>
            </li>
            <hr class="sidebar-divider my-0"/>
            <li className="nav-item">
              <NavLink
                style={activeStyle}
                className="nav-link"
                to="/board/list/1"
              >
                게시판
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                style={activeStyle}
                className="nav-link"
                to="/board/list/1"
              >
                게시판
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                style={activeStyle}
                className="nav-link"
                to="/board/list/1"
              >
                게시판
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>

<div>
<Outlet />
</div>
      
    </div>
  );
};

export default BaseLayout;
