import React from "react";
import { Link, useNavigate } from "react-router-dom";
import img1 from "../images/logo.png";

const UpNavbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  // Logout function
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.clear();
    navigate("/land");
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-white"
      style={{ fontFamily: "Poppins", width: "1535px", height: "96px" }}
    >
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img
            src={img1}
            alt=""
            className="img-fluid"
            style={{
              width: "152px",
              height: "71px",
              position: "absolute",
              left: "95px",
              top: "12px",
            }}
          />
        </a>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li
              className="nav-item"
              style={{ position: "absolute", left: "327px", top: "28px" }}
            >
              <Link
                className="nav-link"
                to="/adopt"
                style={{
                  fontWeight: "600", // semibold
                  color: "#000",
                  fontSize: "25px",
                  fontFamily: "Poppins",
                }}
              >
                Adopt
              </Link>
            </li>
            <li
              className="nav-item"
              style={{ position: "absolute", left: "484px", top: "28px" }}
            >
              <Link
                className="nav-link"
                to="/shop"
                style={{
                  fontWeight: "600", // semibold
                  color: "#000",
                  fontSize: "25px",
                  fontFamily: "Poppins",
                }}
              >
                Shop
              </Link>
            </li>
            <li
              className="nav-item"
              style={{ position: "absolute", left: "641px", top: "28px" }}
            >
              <Link
                className="nav-link"
                to="/event"
                style={{
                  fontWeight: "600", // semibold
                  color: "#000",
                  fontSize: "25px",
                  fontFamily: "Poppins",
                }}
              >
                Event
              </Link>
            </li>
          </ul>
          {user ? (
            <div
              className="d-flex align-items-center"
              style={{ position: "absolute", left: "1135px", top: "28px" }}
            >
              <img
                src={`${user.userImageUrl}`}
                alt=""
                className="rounded-circle me-2"
                style={{ width: "40px", height: "40px" }}
              />
              <div style={{ position: "absolute", left: "50px", top: "5px" }}>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: "400", // regular
                    fontFamily: "Poppins",
                  }}
                >
                  Welcome!!
                </span>
                <span
                  className="text-dark"
                  style={{
                    fontSize: "12px",
                    fontWeight: "400", // regular
                    fontFamily: "Poppins",
                    position: "absolute",
                    left: "0px",
                    top: "20px",
                  }}
                >
                  {user.firstName}
                </span>
              </div>
              <div className="dropdown">
                <button
                  className="btn btn-outline-light border-0 dropdown-toggle fs-5 text-success"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ marginLeft: "90px" }}
                >
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <Link
                      className="dropdown-item"
                      to={`/profile/edit/${user._id}`}
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to={`/changePassword/${user._id}`}
                    >
                      Reset Password
                    </Link>
                  </li>
                  <li>
                    <button onClick={handleLogout} className="dropdown-item">
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="d-flex">
              <Link
                className="btn btn-outline-dark rounded-pill"
                to={"/login"}
                style={{
                  color: "#000",
                  border: "2px solid #000",
                  fontSize: "15px",
                  fontWeight: "bold",
                  borderRadius: "10px",
                  fontFamily: "Poppins",
                  padding: "8px 20px",
                  textAlign: "center",
                  textDecoration: "none",
                  transition: "background-color 500ms ease, border 500ms ease",
                  position: "absolute",
                  left: "1194px",
                  top: "28px",
                  width: "115px",
                  height: "41px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "#FF7148";
                  e.target.style.border = "2px solid #FF7148";
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = "transparent";
                  e.target.style.border = "2px solid #000";
                }}
              >
                Login
              </Link>
              <Link
                className="btn donor-button"
                to={"/donate"}
                style={{
                  backgroundColor: "#FF8534",
                  color: "#FFFFFF",
                  width: "115px",
                  height: "41px",
                  fontSize: "15px",
                  fontWeight: "bold",
                  borderRadius: "10px",
                  fontFamily: "Poppins",
                  border: "none",
                  transition: "background-color 500ms ease, border 500ms ease",
                  position: "absolute",
                  left: "1319px",
                  top: "28px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "#FF7148";
                  e.target.style.border = "2px solid black";
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = "#FF8534";
                  e.target.style.border = "none";
                }}
              >
                Donor
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default UpNavbar;
