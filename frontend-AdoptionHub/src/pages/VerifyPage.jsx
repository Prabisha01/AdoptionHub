import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { adoptAPetApi, sendOtpApi, updateUserApi } from "../apis/Api";
import OTPVerify from "./OTPVerify";

function VerifyPage({ isOpen, pet, close }) {
  const user = JSON.parse(localStorage.getItem("user"));

  const [formData, setFormData] = useState({
    ownedPetBefore: "",
    havePet: "",
    ownRent: "",
    permissionPet: "",
    houseApartment: "",
    peopleInHouse: "",
    hoursPetAlone: "",
    travelFrequency: "",
    petCareArrangement: "",
    reasonForAdoption: "",
    pet: pet._id,
    user: user._id,
  });

  const [agreeErrors, setAgreeErrors] = useState({
    agreeToTermsError: false,
    agreeToShowHouseError: false,
  });
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (name === "agreeToTerms" || name === "agreeToShowHouse") {
      setAgreeErrors({ ...agreeErrors, [`${name}Error`]: false });
    }
  };

  const handleAgreementsValidation = () => {
    const { agreeToTerms, agreeToShowHouse } = formData;
    const errors = {
      agreeToTermsError: !agreeToTerms,
      agreeToShowHouseError: !agreeToShowHouse,
    };
    setAgreeErrors(errors);
    return !errors.agreeToTermsError && !errors.agreeToShowHouseError;
  };

  const handleAdoptPet = (e) => {
    e.preventDefault();
    if (handleAgreementsValidation()) {
      console.log(formData);
      adoptAPetApi(formData).then((res) => {
        if (res.data.success === true) {
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      });
    }
  };

  const [step, setStep] = useState(1);

  const [otpModal, setOtpModal] = useState(false);

  const openOtpModal = () => {
    setOtpModal(true);
  };

  const closeOtpModal = () => {
    setOtpModal(false);
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const [fullName, setFullName] = useState(user?.fullName);
  const [email, setEmail] = useState(user?.email);
  const [address, setAddress] = useState(user?.address);
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState(user?._id);

  const navigate = useNavigate();

  const updateAddress = (e) => {
    console.log(id);
    setIsLoading(true);
    e.preventDefault();
    const data = new FormData();
    data.append("email", email);
    data.append("address", address);
    data.append("fullName", fullName);

    for (var pair of data.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    updateUserApi(id, data).then((res) => {
      if (res.data.success == true) {
        toast.success(res.data.message);
        setIsLoading(false);
      } else {
        toast.error(res.data.message);
        setIsLoading(false);
      }
    });
    setIsLoading(false);
  };

  const handleSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();
    const data = new FormData();
    data.append("email", email);

    sendOtpApi(data)
      .then((res) => {
        if (res.data.success == true) {
          setOtp(res.data.otp);
          toast.success(res.data.message);
          setOtpModal(true);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        toast.error("Server Error", err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-4xl">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-bold">Verification Process</span>
          <div className="flex flex-row justify-end">
            <button
              title="Close Modal"
              onClick={close}
              className="text-white bg-red-500 hover:bg-red-700 rounded-lg text-sm p-2 px-4"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
        </div>
        <div className="flex justify-around items-center mb-8">
          {["Verify", "Personal Data", "More Info"].map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className={`h-10 w-10 rounded-full flex items-center justify-center ${
                  index + 1 <= step
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-400"
                }`}
              >
                {index + 1}
              </div>
              <div
                className={`text-sm mt-2 ${
                  index + 1 < step ? "text-blue-500" : "text-gray-600"
                } `}
              >
                {item}
              </div>
              {index < 2 && (
                <div
                  className={`absolute mt-4 h-0.5 ml-28 w-40 ${
                    index + 1 < step ? "bg-blue-500" : "bg-gray-300"
                  }`}
                  style={{ transform: "translateX(50%)" }}
                ></div>
              )}
            </div>
          ))}
        </div>
        <div>
          {step === 1 && (
            <>
              {user.isVerified ? (
                <div className="flex flex-col space-y-4">
                  <div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                      className="form-input mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div className="flex flex-row justify-start">
                    <img src="/assets/images/verify.png" alt="" />
                    <h3 className="text-lg text-green-500">Email Verified</h3>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center space-y-4">
                  <label
                    htmlFor="email"
                    className="flex flex-col items-start w-full max-w-md"
                  >
                    <span className="text-sm text-gray-600 mb-1">
                      Verify your email
                    </span>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                      className="form-input mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </label>
                  <Link
                    type="button"
                    onClick={(e) => {
                      handleSubmit(e);
                    }}
                    className="text-center bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full max-w-md"
                  >
                    {isLoading ? (
                      <CircularProgress color={"inherit"} size={20} />
                    ) : (
                      "Send Otp"
                    )}
                  </Link>
                  <OTPVerify
                    email={user?.email}
                    isOpen={otpModal}
                    userOtp={otp}
                    closeModal={closeOtpModal}
                    resend={handleSubmit}
                  />
                </div>
              )}
            </>
          )}
          {step === 2 && (
            <div className="flex flex-col items-center space-y-4">
              <div className="w-4/5">
                <label
                  htmlFor="email"
                  className="flex flex-col items-start w-full max-w-md"
                >
                  <input
                    type="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="FullName"
                    className="form-input mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </label>
                <label
                  htmlFor="address"
                  className="flex flex-col items-start w-full max-w-md"
                >
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Address"
                    className="form-input mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </label>
                <Link
                  type="button"
                  onClick={updateAddress}
                  className="mt-4 text-center bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full max-w-md"
                >
                  {isLoading ? (
                    <CircularProgress color={"inherit"} size={20} />
                  ) : (
                    "Update"
                  )}
                </Link>
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="bg-white p-6 rounded-lg overflow-y-scroll overflow-x-scroll max-w-[100vw] mx-auto">
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <label className="block text-gray-700">
                      Have you owned a pet before?
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="radio"
                        name="ownedPetBefore"
                        value="true"
                        checked={formData.ownedPetBefore === "true"}
                        onChange={handleChange}
                        className="mt-1 cursor-pointer"
                      />
                      <label
                        htmlFor="yesPetBefore"
                        className="text-sm text-gray-600"
                      >
                        Yes
                      </label>
                      <input
                        type="radio"
                        name="ownedPetBefore"
                        value="false"
                        checked={formData.ownedPetBefore === "false"}
                        onChange={handleChange}
                        className="mt-1 cursor-pointer"
                      />
                      <label
                        htmlFor="noPetBefore"
                        className="text-sm text-gray-600"
                      >
                        No
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700">
                      Do you currently have a pet?
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="radio"
                        name="havePet"
                        value="true"
                        checked={formData.havePet === "true"}
                        onChange={handleChange}
                        className="mt-1 cursor-pointer"
                      />
                      <label
                        htmlFor="yesHavePet"
                        className="text-sm text-gray-600"
                      >
                        Yes
                      </label>
                      <input
                        type="radio"
                        name="havePet"
                        value="false"
                        checked={formData.havePet === "false"}
                        onChange={handleChange}
                        className="mt-1 cursor-pointer"
                      />
                      <label
                        htmlFor="noHavePet"
                        className="text-sm text-gray-600"
                      >
                        No
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700">
                      Do you live in a house or apartment?
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="radio"
                        name="houseApartment"
                        value="House"
                        checked={formData.houseApartment === "House"}
                        onChange={handleChange}
                        className="mt-1"
                      />
                      <label htmlFor="house" className="text-sm text-gray-600">
                        House
                      </label>
                      <input
                        type="radio"
                        name="houseApartment"
                        value="Apartment"
                        checked={formData.houseApartment === "Apartment"}
                        onChange={handleChange}
                        className="mt-1"
                      />
                      <label
                        htmlFor="apartment"
                        className="text-sm text-gray-600"
                      >
                        Apartment
                      </label>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row gap-4">
                  <div>
                    <label className="block text-gray-700">
                      Do you own or rent your house?
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="radio"
                        name="ownRent"
                        value="Own"
                        checked={formData.ownRent === "Own"}
                        onChange={handleChange}
                        className="mt-1 cursor-pointer"
                      />
                      <label
                        htmlFor="ownHouse"
                        className="text-sm text-gray-600"
                      >
                        Own
                      </label>
                      <input
                        type="radio"
                        name="ownRent"
                        value="Rent"
                        checked={formData.ownRent === "Rent"}
                        onChange={handleChange}
                        className="mt-1 cursor-pointer"
                      />
                      <label
                        htmlFor="rentHouse"
                        className="text-sm text-gray-600"
                      >
                        Rent
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700">
                      Do you have permission to have a pet from your family or
                      landlord?
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="radio"
                        name="permissionPet"
                        value="true"
                        checked={formData.permissionPet === "true"}
                        onChange={handleChange}
                        className="mt-1 cursor-pointer"
                      />
                      <label
                        htmlFor="yesPetBefore"
                        className="text-sm text-gray-600"
                      >
                        Yes
                      </label>
                      <input
                        type="radio"
                        name="permissionPet"
                        value="false"
                        checked={formData.permissionPet === "false"}
                        onChange={handleChange}
                        className="mt-1 cursor-pointer"
                      />
                      <label
                        htmlFor="permissionPet"
                        className="text-sm text-gray-600"
                      >
                        No
                      </label>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-x-6">
                  <input
                    type="text"
                    name="peopleInHouse"
                    placeholder="How many people live in the house?"
                    value={formData.peopleInHouse}
                    onChange={handleChange}
                    className="form-input mt-4 rounded-lg block w-full"
                  />
                  <input
                    type="text"
                    name="hoursPetAlone"
                    placeholder="How many hours will the pet be alone?"
                    value={formData.hoursPetAlone}
                    onChange={handleChange}
                    className="form-input mt-4 rounded-lg block w-full"
                  />
                  <input
                    type="text"
                    name="travelFrequency"
                    placeholder="How often do you travel ?"
                    value={formData.travelFrequency}
                    onChange={handleChange}
                    className="form-input mt-4 rounded-lg block w-full"
                  />
                  <input
                    type="text"
                    name="petCareArrangement"
                    placeholder="What agreement do you make for the pet when you travel?"
                    value={formData.petCareArrangement}
                    onChange={handleChange}
                    className="form-input mt-4 rounded-lg block w-full"
                  />
                </div>
                <textarea
                  name="reasonForAdoption"
                  placeholder="Why do you want to adopt the pet ?"
                  value={formData.reasonForAdoption}
                  onChange={handleChange}
                  className="form-textarea mt-4 rounded-lg block w-full h-24"
                ></textarea>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                    className="form-checkbox h-4 w-4 cursor-pointer"
                  />
                  <label
                    htmlFor="terms"
                    className="ml-2 block text-sm text-gray-600"
                  >
                    I agree to the terms and condition
                  </label>
                  {agreeErrors.agreeToTermsError && (
                    <p className="text-red-500 text-sm ml-3">
                      * You must agree to the terms.
                    </p>
                  )}
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="agreeToShowHouse"
                    checked={formData.agreeToShowHouse}
                    onChange={handleChange}
                    className="form-checkbox h-4 w-4 cursor-pointer"
                  />
                  <label
                    htmlFor="showHouse"
                    className="ml-2 block text-sm text-gray-600"
                  >
                    I agree to show my house before adoption
                  </label>
                  {agreeErrors.agreeToShowHouseError && (
                    <p className="text-red-500 text-sm ml-4">
                      * You must agree to show your house.
                    </p>
                  )}
                </div>
                <div className="flex flex-row justify-center">
                  <Link
                    type="button"
                    onClick={handleAdoptPet}
                    className="text-center bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full max-w-md"
                  >
                    {isLoading ? (
                      <CircularProgress color={"inherit"} size={20} />
                    ) : (
                      "Submit Adoption Request"
                    )}
                  </Link>
                </div>
              </form>
            </div>
          )}
        </div>

        <div className="flex justify-between mt-8">
          <button
            onClick={prevStep}
            disabled={step === 1}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
          >
            Back
          </button>
          {step === 3 ? null : (
            <button
              onClick={() => {
                nextStep();
              }}
              disabled={step === 3}
              className="bg-blue-500 cursor-pointer hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r"
            >
              {step === 3 ? null : "Next"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default VerifyPage;