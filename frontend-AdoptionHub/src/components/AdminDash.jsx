import React from "react";
import { Link, useNavigate } from "react-router-dom";
import img2 from "../images/logoc.png";

const AdminDash = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  //logout function
  const navigate = useNavigate();
  const handlelogout = (e) => {
    e.preventDefault();
    localStorage.clear();
    navigate("/land");
  };
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light "
      style={{ backgroundColor: "black" }}
    >
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img
            src={img2}
            alt=""
            style={{ borderRadius: "50%", height: "50px", width: "50px" }}
          />
        </a>
        <h2 className="nav-item">
          <Link
            className="nav-link  text-white fs-7  me-5"
            to="/admin/dashboard"
          >
            NursyEase
          </Link>
        </h2>
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
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link
                className="nav-link  text-white fs-5  me-3"
                to="/admin/user"
              >
                User
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link text-white fs-5  me-3"
                to="/admin/product"
              >
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white fs-5  me-3" to="/admin/blog">
                Blog
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link text-white fs-5  me-3"
                to="/admin/contact"
              >
                Contact
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link text-white fs-5  me-3"
                to="/admin/notification"
              >
                Notification
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            {/* <li className="nav-item">
              <form className="d-flex">
                <input className="form-control custom-search me-2" type="search" placeholder="Search" aria-label="Search" />
              </form>
            </li> */}

            <form className="d-flex" role="search">
              {user ? (
                <>
                  <div className="d-flex align-items-center ms-5">
                    <img
                      src={`${user.userImageUrl}`}
                      alt=""
                      className="rounded-circle me-2"
                      style={{ width: "40px", height: "40px" }}
                    />
                    <div className="dropdown">
                      <button
                        className="btn btn-outline-light dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Welcome {user.firstName}!
                      </button>
                      <ul className="dropdown-menu">
                        <li>
                          <button
                            onClick={handlelogout}
                            className="dropdown-item"
                            to="/logout"
                          >
                            Logout
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <Link
                    className="btn btn-outline-light rounded-pill me-2 "
                    to={"/login"}
                  >
                    Login
                  </Link>
                  <Link
                    className="btn btn-outline-light rounded-pill  me-3"
                    to={"/signup"}
                  >
                    Register
                  </Link>
                </>
              )}
            </form>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default AdminDash;
