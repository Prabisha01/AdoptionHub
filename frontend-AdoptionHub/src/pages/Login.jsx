import React, { useState } from "react";
import { loginUserApi } from "../apis/Api";
import mainImage from '../images/landingpage.png';
import { toast } from "react-toastify";
import { Link, useNavigate } from 'react-router-dom'; 
import UpNavbar from "../components/UpNavbar";

const Login = () => {
  const navigate = useNavigate();
  const outerContainerStyle = {
    position: 'relative',
    height: '100vh', // Ensuring the container takes up the full viewport height
    overflow: 'hidden', // Prevent overflow
  };

  const blurredContainerStyle = {
    filter: 'blur(3px)', // Apply the blur effect
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: '0',
    left: '0',
  };

  const mainImageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover', // Ensure the image covers the entire container
  };

  const navbarStyle = {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    backgroundColor: 'white', // White background for the header
    zIndex: '1000', // Ensure the navbar stays on top
  };

  const modalStyle = {
    position: 'absolute',
    top: '96px',
    left: '169px',
    width: '1145px',
    height: '600px',
    backgroundColor: 'white',
    borderRadius: '25px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    border: '1px solid black',
    zIndex: '1001', // Ensure the modal stays on top of other content
  };

  const additionalContainerStyle = {
    position: 'absolute',
    top: '1118px',
    left: '185px',
    width: '523px',
    height: '662px',
    backgroundColor: 'white',
    borderRadius: '40px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    border: '1px solid black',
    zIndex: '1002', // Ensure the additional container stays on top of other content
  };

  const closeButtonStyle = {
    position: 'absolute',
    top: '22px', // Adjusted for a more reasonable placement within the modal
    right: '22px', // Adjusted for a more reasonable placement within the modal
    width: '29px',
    height: '27px',
    cursor: 'pointer',
    zIndex: '1003', // Ensure the close button stays on top of the modal
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);

    const data = {
      email: email,
      password: password,
    };

    loginUserApi(data)
      .then((res) => {
        if (res.data.success === false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          localStorage.setItem("token", res.data.token);
          const jsonDecode = JSON.stringify(res.data.userData);
          localStorage.setItem("user", jsonDecode);

          if (res.data.userData.isAdmin){
            navigate('/admin/dashboard');
          } else {
            navigate('/products');
          }
        }
      })
      .catch((err) => {
        toast.error("Server Error");
        console.log(err.message);
      });
  };

  return (
    <div style={outerContainerStyle}>
      <div style={blurredContainerStyle}>
        <div style={navbarStyle}>
          <UpNavbar />
        </div>
        <img src={mainImage} alt="Main" style={mainImageStyle} />
      </div>
      <div style={modalStyle}>
        <button style={closeButtonStyle} onClick={() => navigate('/home')}>X</button>
        {/* Add your form or other content here */}
      </div>
      <div style={additionalContainerStyle}>
        {/* Additional content here */}
      </div>
    </div>
  );
};

export default Login;
