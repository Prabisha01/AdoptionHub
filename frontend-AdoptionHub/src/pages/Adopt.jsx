import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllPetsApi } from "../apis/Api";
import ListThePet from "./user/ListThePet";
import PetModal from "./PetModal";

const PetCard = ({ pet, openPetModal }) => (
  <Link
    className="border rounded-lg overflow-hidden shadow-lg"
    onClick={(e) => {
      e.preventDefault(); 
      openPetModal(pet);
    }}
  >
    <img
      src={
        pet.petImageUrlOne ??
        pet.petImageUrlTwo ??
        pet.petImageUrlThree ??
        pet.petImageUrlFour ??
        pet.petImageUrlFive
      }
      alt={`${pet.address}`}
      className="w-full h-48 object-cover rounded-lg"
    />
    <div className="px-4 py-3">
      <span className="flex flex-row flex-start">
        {/* <FontAwesomeIcon icon={faLocationDot} className="text-gray-950 text-2xl" /> */}
        <p className="font-semibold">{pet.address}</p>
      </span>
      <span className="flex flex-row flex-start">
        <p className="font-semibold">{pet.petType ?? pet.email}</p>
      </span>
    </div>
  </Link>
);

const Adopt = () => {

  const [isPetModalOpen, setIsPetModalOpen] = useState(false);
  const [isListModalOpen, setIsListModalOpen] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);
  const [pets, setPets] = useState([]);

  const openPetModal = (pet) => {
    console.log(pet)
    setSelectedPet(pet);
    setIsPetModalOpen(true);
  };

  const closePetModal = () => {
    setIsPetModalOpen(false);
  };

  const openListModal = () => {
    setIsListModalOpen(true);
  };

  const closeListModal = () => {
    setIsListModalOpen(false);
  };

  const fetchAllPets = async () => {
    getAllPetsApi().then((response) => {
      setPets(response.data.allPets);
    });
  };

  useEffect(() => {
    fetchAllPets();
  }, [pets.length]);

  return (
    <div className="bg-gray-50 min-h-screen p-5">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-1">
          Every Pet Deserves a Loving Home. <br />{" "}
          <span className="text-orange-500">Adopt</span> a Pet Today !
        </h1>
        <p className="text-center mt-4 text-sm mb-4">
          Together, we can{" "}
          <span className="font-bold">rescue, rehabilitate, and rehome</span>{" "}
          pets in need. Thank you for supporting our mission to bring joy to
          families.
        </p>
        <div className="flex justify-end">
          <button
            onClick={openListModal}
            className="bg-[#FF8534] hover:bg-[#F24E1E] text-white font-bold py-2 px-4 rounded"
          >
            List the Pet
          </button>
          <ListThePet isOpen={isListModalOpen} onClose={closeListModal} />
        </div>
        <div className="flex my-8 w-full justify-between items-center">
          <div className="flex-1 w-2/5 mr-2">
            <input
              type="text"
              placeholder="Search"
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div className="flex w-3/5">
            <select className="border rounded w-1/4 py-2 px-4 mr-2">
              <option>Location</option>
            </select>
            <select className="border rounded w-1/4 py-2 px-4 mr-2">
              <option>Type</option>
            </select>
            <select className="border rounded w-1/4 py-2 px-4 mr-2">
              <option>Age</option>
            </select>
            <select className="border rounded w-1/4 py-2 px-4 mr-2">
              <option>Gender</option>
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>
        </div>
      </div>
      <div className="container mx-auto">
        <div className="grid grid-cols-4 gap-4">
          {pets.map((pet) => (
            <PetCard key={pet.id} pet={pet} openPetModal={()=> openPetModal(pet)} />
          ))}
          <PetModal isOpen={isPetModalOpen} onClose={closePetModal} pet={selectedPet} />
        </div>
        <div className="flex justify-center mt-8">
          <div className="flex rounded-md border-2 border-black">
            <a
              href="#"
              className="py-2  px-4 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
            >
              <FontAwesomeIcon icon={faAngleLeft} />
            </a>
            <a
              href="#"
              className="py-2 px-4 leading-tight text-white bg-[#004AAD] border-r-2 border-l-2 border-black hover:text-gray-700"
            >
              1
            </a>
            <a
              href="#"
              className="py-2 px-4 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
            >
              <FontAwesomeIcon icon={faAngleRight} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Adopt;
