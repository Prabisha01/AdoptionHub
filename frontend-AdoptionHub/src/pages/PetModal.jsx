import React from "react";
import { Link } from "react-router-dom";

const PetModal = ({ isOpen, onClose, pet }) => {
  if (!isOpen || !pet) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-3/4 max-w-4xl rounded-lg shadow-xl">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-2xl font-bold">CAT</h2>
          <button onClick={onClose} className="text-xl font-semibold">
            X
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
              <Link className="w-full border-2 border-black text-center bg-[#FF8534] hover:bg-[#F24E1E] text-white font-bold py-2 px-4 rounded">Adopt Now</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetModal;
