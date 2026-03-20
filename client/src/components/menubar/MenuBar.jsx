import React from "react";
import "./MenuBar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";

const MenuBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const role = localStorage.getItem("role");

  const isAdmin = role === "ADMIN";

  const isActive = (path) => {
    return location.pathname === path;
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-2">
      <Link className="navbar-brand" href="#">
        <img src={assets.logo} alt="Logo" height="40" />
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse p-2" id="navbarNav">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link
              className={`nav-link ${isActive("/") ? "fw-bold text-warning active" : ""}`}
              aria-current="page"
              to={"/"}
            >
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link ${isActive("/explore") ? "fw-bold text-warning active" : ""}`}
              to={"/explore"}
            >
              Explore
            </Link>
          </li>
          {isAdmin && (
            <>
              <li className="nav-item">
                <Link
                  className={`nav-link ${isActive("/items") ? "fw-bold text-warning active" : ""}`}
                  to={"/items"}
                >
                  Manage Items
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${isActive("/category") ? "fw-bold text-warning active" : ""}`}
                  to={"/category"}
                >
                  Manage Categories
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${isActive("/users") ? "fw-bold text-warning active" : ""}`}
                  to={"/users"}
                >
                  Manage Users
                </Link>
              </li>
            </>
          )}
          <li className="nav-item">
            <Link
              className={`nav-link ${isActive("/orders") ? "fw-bold text-warning active" : ""}`}
              to={"/orders"}
            >
              Order History
            </Link>
          </li>
        </ul>
        {/* Add dropdown for user profile */}
        <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
          <li className="nav-item dropdown">
            <a
              href=""
              className="nav-link dropdown-toggle"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src="https://ik.imagekit.io/3vbq2c7dmz/profile/default.png"
                alt=""
                height={32}
                width={32}
              />
            </a>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="navbarDropdown"
            >
              <li>
                <a href="" className="dropdown-item">
                  Settings
                </a>
                <a href="" className="dropdown-item">
                  Activity log
                </a>

                <hr className="dropdown-divider" />

                <a href="" className="dropdown-item" onClick={logOut}>
                  Logout
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default MenuBar;
