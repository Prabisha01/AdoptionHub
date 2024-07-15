import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { changePasswordApi } from '../apis/Api'; // Assuming you have an API function for changePassword
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UpdatedPasswords = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }

    try {
      const response = await changePasswordApi(id, {
        currentPassword,
        newPassword,
        confirmPassword,
      });

      if (response.data.success === true) {
        toast.success(response.data.message);
        navigate('/products');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error('Server Error');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-10 backdrop-blur-sm" style={{ fontFamily: 'Poppins' }}>
      <div className="bg-white rounded-lg shadow-lg flex border border-black">
        <div className="w-1/2">
          <img
            src="/assets/images/login.png"
            alt="Adopt Me"
            className="h-full w-[600px] object-cover rounded-l-lg"
          />
        </div>
        <div className="w-1/2 p-6 relative">
          <button
            onClick={() => navigate('/')}
            className="absolute top-4 right-4 text-gray-700 text-xl"
          >
            &times;
          </button>
          <img src="/assets/logo/logo.png" alt="" className="mb-5" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Change Your Password
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <div className="relative">
                <span className="absolute bottom-3 flex items-center pl-3">
                  <FontAwesomeIcon icon={faLock} className="text-gray-950" />
                </span>
                <input
                  placeholder="Enter your current password"
                  type="password"
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full pl-8 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gray-950"
                />
              </div>
            </div>
            <div className="mb-4">
              <div className="relative">
                <span className="absolute bottom-3 flex items-center pl-3">
                  <FontAwesomeIcon icon={faLock} className="text-gray-950" />
                </span>
                <input
                  placeholder="Enter your new password"
                  type="password"
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full pl-8 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gray-950"
                />
              </div>
            </div>
            <div className="mb-4">
              <div className="relative">
                <span className="absolute bottom-3 flex items-center pl-3">
                  <FontAwesomeIcon icon={faLock} className="text-gray-950" />
                </span>
                <input
                  placeholder="Re-Enter your new password"
                  type="password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-8 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gray-950"
                />
              </div>
            </div>
            <div className="flex flex-col items-start gap-3">
              <button
                type="submit"
                className="bg-orange-500 w-full hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Submit
              </button>
              <p
                style={{ textAlign: "center", marginTop: "20px", color: "#666" }}
              >
                Remembered the Password?{" "}
                <a
                  href="/"
                  className="text-blue-800 underline"
                >
                  Back to Login
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdatedPasswords;
