import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { createUserApi, testApi } from "../apis/Api";
import { toast } from "react-toastify";
import wall from "../images/wall.jpg";
import { useNavigate } from "react-router-dom";
import UpNavbar from "../components/UpNavbar";

const Register = () => {
  const navigate = useNavigate();

  const bgImage = {
    backgroundImage: `url(${wall})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "81vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
  

  // useState (Setting input value)
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Make useState for image
  const [userImage, setUserImage] = useState(null);

  // function for changing input value
  const changeFirstname = (e) => {
    setFirstName(e.target.value);
  };

  const changeLastname = (e) => {
    setLastName(e.target.value);
  };

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
  };
  // Function to handle image file change
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setUserImage(file);
  };

  // function for button
  const handleSubmit = (e) => {
    e.preventDefault();
    // check if input value is available
    console.log(firstName, lastName, email, password, userImage);

    // making json data object
    const data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      userImage: userImage 
    };

    // making API Call
    createUserApi(data)
      .then((res) => {
        if (res.data.success == false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          navigate("/login");
        }
      })
      .catch((err) => {
        toast.error("Server Error");
        console.log(err.message);
      });
  };

  return (
    <>
    <div>
      <UpNavbar/>
    </div>
      <div>
        <Navbar />
      </div>
      <>
        <div style={bgImage}></div>
        <div
          style={{
            position: "fixed",
            top: "80px",
            right: "20px",
            backgroundColor: "white",
            padding: "30px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          }}
        >
          <h1
            style={{
              color: "green",
              fontSize: "2em",
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: "20px",
            }}
          >
            Create Your Account!
          </h1>

          <form style={{ width: "350px", margin: "0 auto" }}>
            <label style={{ marginBottom: "5px" }}>Firstname</label>
            <input
              onChange={changeFirstname}
              type="text"
              placeholder="Enter your firstname"
              style={{
                width: "100%",
                padding: "8px",
                marginBottom: "15px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />

            <label style={{ marginBottom: "5px" }}>Lastname</label>
            <input
              onChange={changeLastname}
              type="text"
              placeholder="Enter your lastname"
              style={{
                width: "100%",
                padding: "8px",
                marginBottom: "15px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />

            <label style={{ marginBottom: "5px" }}>Email Address</label>
            <input
              onChange={changeEmail}
              type="email"
              placeholder="Enter your email"
              style={{
                width: "100%",
                padding: "8px",
                marginBottom: "15px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />

            <label style={{ marginBottom: "5px" }}>Password</label>
            <input
              onChange={changePassword}
              type="password"
              placeholder="Enter your password"
              style={{
                width: "100%",
                padding: "8px",
                marginBottom: "15px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
            <input
              onChange={handleImageUpload}
              type="file"
              placeholder="Upload the Photo"
              accept="image/*"
              style={{
                width: "100%",
                padding: "8px",
                marginBottom: "15px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />

            <button
              style={{
                backgroundColor: "green",
                color: "white",
                padding: "10px 20px",
                border: "none",
                borderRadius: "4px",
                marginTop: "15px",
                width: "100%",
                cursor: "pointer",
                fontSize: "1em",
                fontWeight: "bold",
                transition: "background-color 0.3s",
              }}
              onClick={handleSubmit}
            >
              Register
            </button>

            <p
              style={{ textAlign: "center", marginTop: "20px", color: "#666" }}
            >
              Already have an account?{" "}
              <a
                href="/login"
                style={{ color: "#333", textDecoration: "none" }}
              >
                Login
              </a>
            </p>
          </form>
        </div>
      </>
    </>
  );
};
export default Register;
