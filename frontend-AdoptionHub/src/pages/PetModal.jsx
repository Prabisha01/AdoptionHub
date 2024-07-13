import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import VerifyPage from "./VerifyPage";

const PetModal = ({ isOpen, onClose, pet }) => {
  const [isAdoptModalOpen, setIsAdoptModalOpen] = useState(false);

  const openAdoptModal = () => {
    setIsAdoptModalOpen(true);
  };

  const closeAdoptModal = () => {
    setIsAdoptModalOpen(false);
  };

  if (!isOpen || !pet) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-3/4 max-w-4xl rounded-lg shadow-xl">
        <div className="flex flex-row justify-end">
          <button
            title="Close Modal"
            onClick={onClose}
            className="text-white bg-red-500 hover:bg-red-700 rounded-lg text-sm p-2 px-4"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <div className="flex">
          <div className="w-1/2 p-4">
            <img
              src={
                pet.petImageUrlOne ??
                pet.petImageUrlTwo ??
                pet.petImageUrlThree ??
                pet.petImageUrlFour ??
                pet.petImageUrlFive
              }
              alt="Kali"
              className="rounded-lg"
            />
            <div className="grid grid-cols-3 gap-2 mt-4">
              <img
                src={pet.petImageUrlOne ?? pet.petImageUrlFive}
                alt={"imageOne"}
                className="w-full h-20 object-cover rounded-lg"
              />
              <img
                src={pet.petImageUrlOne ?? pet.petImageUrlFive}
                alt={"imageOne"}
                className="w-full h-20 object-cover rounded-lg"
              />
              <img
                src={pet.petImageUrlOne ?? pet.petImageUrlFive}
                alt={"imageOne"}
                className="w-full h-20 object-cover rounded-lg"
              />
            </div>
          </div>
          <div className="w-1/2 p-4">
            <div className="mb-4">
              <p>
                <strong>Name:</strong> {pet.fullName}
              </p>
              {pet.petGender && (
                <p>
                  <strong>Gender:</strong> {pet?.gender}
                </p>
              )}
              {pet.petAge && (
                <p>
                  <strong>Age:</strong> {pet.petAge}
                </p>
              )}
              <p>
                <strong>Condition:</strong> {pet.condition}
              </p>
              <p>
                <strong>Uploaded by:</strong> {pet?.user}
              </p>
              <a
                href={pet.petFileUrl}
                className="text-blue-600 visited:text-purple-600"
              >
                {"pdf file"}
              </a>
            </div>
            <div>
              <p>
                <strong>Purpose:</strong> {pet.purpose}
              </p>
              <p>
                <strong>Address:</strong> {pet.address}
              </p>
              <p>{pet.description}</p>
            </div>
            <div className="flex w-full flex-row pt-5">
              <Link
                onClick={(e) => {
                  e.preventDefault();
                  openAdoptModal();
                }}
                className="w-full border-1 border-black text-center bg-[#FF8534] hover:bg-[#F24E1E] text-white font-bold py-2 px-4 rounded"
              >
                Adopt
              </Link>
              {isAdoptModalOpen && (
                <VerifyPage isOpen={isAdoptModalOpen} pet={pet} close={closeAdoptModal} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetModal;
