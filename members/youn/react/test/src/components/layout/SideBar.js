import React from "react";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <ul
      className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
      id="accordionSidebar"
    >
      <Link
        className="sidebar-brand d-flex align-items-center justify-content-center"
        to="/mypage"
      >
        <div className="sidebar-brand-text mx-3">Gymunity</div>
      </Link>
      <hr className="sidebar-divider my-0" />
      <li className="nav-item active">
        <Link className="nav-link" to="/mypage">
          <i className="fas fa-fw fa-tachometer-alt"></i>
          <span>My Page</span>
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/pt">
          <i className="fas fa-fw fa-chart-area"></i>
          <span>PT</span>
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/challenge">
          <i className="fas fa-fw fa-table"></i>
          <span>Challenge</span>
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/store">
          <i className="fas fa-fw fa-table"></i>
          <span>Store</span>
        </Link>
      </li>
      <hr className="sidebar-divider d-none d-md-block" />
      <div className="text-center d-none d-md-inline">
        <button className="rounded-circle border-0" id="sidebarToggle"></button>
      </div>
    </ul>
  );
};

export default SideBar;
