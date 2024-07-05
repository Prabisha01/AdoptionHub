import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';

const RegisterModal = ({ isOpen, onClose, onOpenLogin }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg flex">
        <div className="w-1/2">
          <img src="assets/images/login.png" alt="Adopt Me" className="h-[600px] w-[700px] object-cover rounded-l-lg" />
        </div>
        <div className="w-1/2 p-6 relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-700 text-xl">&times;</button>
          <img src="assets/logo/logo.png" alt="" className='mb-5' />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Create an Account</h2>
          <form>
          <div className="mb-4">
            <div className="relative">
              <span className="absolute bottom-3 flex items-center pl-3">
                <FontAwesomeIcon
                  icon={faUser}
                  className="text-gray-950"
                />
              </span>
              <input
              placeholder='Full Name'
                type="email"
                className="w-full pl-8 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gray-950"
              />
            </div>
          </div>
          <div className="mb-4">
            <div className="relative">
              <span className="absolute bottom-3 flex items-center pl-3">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="text-gray-950"
                />
              </span>
              <input
              placeholder='Email Address'
                type="email"
                className="w-full pl-8 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gray-950"
              />
            </div>
          </div>
          <div className="mb-4">
            <div className="relative">
              <span className="absolute bottom-3 flex items-center pl-3">
                <FontAwesomeIcon
                  icon={faLock}
                  className="text-gray-950"
                />
              </span>
              <input
              placeholder='Password'
                type="password"
                className="w-full pl-8 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gray-950"
              />
            </div>
          </div>
          <div className="mb-4">
            <div className="relative">
              <span className="absolute bottom-3 flex items-center pl-3">
                <FontAwesomeIcon
                  icon={faLock}
                  className="text-gray-950"
                />
              </span>
              <input
              placeholder='Confirm Password'
                type="password"
                className="w-full pl-8 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gray-950"
              />
            </div>
          </div>
            <div className="flex flex-col items-start gap-3">
              <button
                className="bg-orange-500 w-full hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                Sign Up
              </button>
              <div href="#" className="inline-block align-baseline font-bold text-sm text-black hover:text-orange-800">
                I agree the <a>terms and conditions</a>
              </div>

              <a href="#" className="inline-block align-baseline font-bold text-sm text-black">
                Already a member?<Link onClick={onOpenLogin} className='text-blue-800 underline'> Login </Link>        
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
