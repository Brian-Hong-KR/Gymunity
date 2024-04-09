import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Sidebar } from "../style/Sidebar";

const activeStyle = ({ isActive }) => ({
  color: isActive ? "green" : "",
  fontSize: isActive ? "1.2rem" : "",
});

const handleSidebarToggle = () => {
  // 사이드바 토글 로직 구현 (예: 상태 변수 변경)
};

const BaseLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
            {/* Sidebar Toggle (Topbar) */}
            <button
              id="sidebarToggleTop"
              className="btn btn-link d-md-none rounded-circle mr-3"
              onClick={handleSidebarToggle}
            >
              <i className="fa fa-bars"></i>
            </button>

            {/* Topbar Navbar */}
            <ul className="navbar-nav ml-auto">
              {/* (상황에 따라 구현 선택) */}
              {/* Nav Item - Search Dropdown (Visible Only XS) */}
              <li className="nav-item dropdown no-arrow d-sm-none">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="searchDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="fas fa-search fa-fw"></i>
                </a>
                {/* Dropdown - Messages */}
                <div
                  className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                  aria-labelledby="searchDropdown"
                >
                  <form className="form-inline mr-auto w-100 navbar-search">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control bg-light border-0 small"
                        placeholder="Search for..."
                        aria-label="Search"
                        aria-describedby="basic-addon2"
                      />
                      <div className="input-group-append">
                        <button className="btn btn-primary" type="button">
                          <i className="fas fa-search fa-sm"></i>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </li>
              <li className="nav-item dropdown no-arrow">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="userDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded={isOpen}
                  onClick={toggleDropdown}
                >
                  <span>Douglas McGee</span>
                  <img
                    className="img-profile rounded-circle"
                    src="https://cdn-icons-png.flaticon.com/512/4128/4128176.png"
                    alt="Profile"
                  />
                </a>
                {isOpen && (
                  <div
                    className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                    aria-labelledby="userDropdown"
                  >
                    {console.log(
                      "localStorage_memberEmail",
                      localStorage.getItem("memberEmail")
                    )}
                    {localStorage.getItem("memberEmail") == null ? (
                      <>
                        <a className="dropdown-item">
                          <NavLink
                            style={activeStyle}
                            className="dropdown-item"
                            to="/login"
                          >
                            <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                            <span>login</span>
                          </NavLink>
                        </a>

                        <a className="dropdown-item">
                          <NavLink
                            style={activeStyle}
                            className="nav-link"
                            to="/joinadd"
                          >
                            <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                            <span>회원가입</span>
                          </NavLink>
                        </a>
                      </>
                    ) : (
                      <>
                        <a className="dropdown-item">
                          <NavLink
                            style={activeStyle}
                            className="nav-link"
                            to="/logout"
                          >
                            <i class="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                            {localStorage.getItem("memberName")}
                            <span style={{ fontSize: "10px" }}>로그아웃</span>
                          </NavLink>
                        </a>

                        <a className="dropdown-item">
                          <NavLink
                            style={activeStyle}
                            className="nav-link"
                            to="/editinfo"
                          >
                            <i class="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                            <span>회원수정</span>
                          </NavLink>
                        </a>

                        <a className="dropdown-item">
                          <NavLink
                            style={activeStyle}
                            className="nav-link"
                            to="/memberremove"
                          >
                            <sapn>회원탈퇴</sapn>
                          </NavLink>
                        </a>
                      </>
                    )}
                  </div>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <Sidebar />
      <div id="page-top">
        <div id="wrapper">
          {/* <Sidebar> */}
          <ul
            className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
            id="accordionSidebar"
          >
            {/* Sidebar - Brand */}
            <NavLink
              className="sidebar-brand d-flex align-items-center justify-content-center"
              to="/"
            >
              <div className="sidebar-brand-text mx-3">Gymunity</div>
            </NavLink>

            {/* Divider */}
            <hr className="sidebar-divider my-0" />

            {/* My Page */}
            <li className="nav-item">
              <NavLink
                style={activeStyle}
                className="nav-link"
                to="/board/list/1"
              >
                <i className="fas fa-fw fa-tachometer-alt"></i>
                <span>My Page</span>
              </NavLink>
            </li>

            {/* PT */}
            <li className="nav-item">
              <NavLink
                style={activeStyle}
                className="nav-link"
                to="/board/list/1"
              >
                <i className="fas fa-fw fa-tachometer-alt"></i>
                <span>PT</span>
              </NavLink>
            </li>

            {/* Challenge */}
            <li className="nav-item">
              <NavLink
                style={activeStyle}
                className="nav-link"
                to="/board/list/1"
              >
                <i className="fas fa-fw fa-tachometer-alt"></i>
                <span>Challenge</span>
              </NavLink>
            </li>

            {/* Store */}
            <li className="nav-item">
              <NavLink
                style={activeStyle}
                className="nav-link"
                to="/board/list/1"
              >
                <i className="fas fa-fw fa-tachometer-alt"></i>
                <span>Store</span>
              </NavLink>
            </li>

            {/* Divider */}
            <hr className="sidebar-divider d-none d-md-block" />

            {/* Sidebar Toggler (Sidebar) */}
            <div className="text-center d-none d-md-inline">
              {" "}
              {/* 여는 태그 수정 */}
              <button
                className="rounded-circle border-0"
                id="sidebarToggle"
              ></button>
            </div>
          </ul>
          {/* </Sidebar> */}
        </div>
      </div>

      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-3 col-md-6 mb-4">
            <div className="card border-left-primary shadow h-100 py-2">
              <div className="card-body">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BaseLayout;
