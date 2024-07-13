const Pet = require("../model/petModel");
const cloudinary = require("cloudinary")

const addPet = async (req, res) => {
  // step 1 : Check incoming data
  console.log(req.body);
  console.log(req.files);
  console.log(req.body.status)

  try {
    if (req.body.status === "found") {
      // step 2: Destructuring
      const {
        fullName,
        email,
        number,
        address,
        petType,
        condition,
        purpose,
        description,
        user
      } = req.body;

      if(!fullName|| !email || !number || !address || !petType || !condition || !purpose || !description) {
        return res.json({
          success: false,
          message: "Please fill all the fields",
        });
      }

      const {
        petImageUrlOne,
        petImageUrlTwo,
        petImageUrlThree,
        petImageUrlFour,
      } = req.files;

      if (!petImageUrlOne) {
        return res.json({
          success: false,
          message: "petimageonenull",
        });
      }

      if (!petImageUrlTwo) {
        return res.json({
          success: false,
          message: "petimagetwonull",
        });
      }

      if (!petImageUrlThree) {
        return res.json({
          success: false,
          message: "petimagethreenull",
        });
      }

      if (!petImageUrlFour) {
        return res.json({
          success: false,
          message: "petimagefournull",
        });
      }

      let uploadedImageUrlOne = await cloudinary.v2.uploader.upload(
        petImageUrlOne.path,
        {
          folder: "Pet",
          crop: "scale",
        }
      );

      const uploadedImageUrlTwo = await cloudinary.v2.uploader.upload(
        petImageUrlTwo.path,
        {
          folder: "Pet",
          crop: "scale",
        }
      );

      const uploadedImageUrlThree = await cloudinary.v2.uploader.upload(
        petImageUrlThree.path,
        {
          folder: "Pet",
          crop: "scale",
        }
      );

      const uploadedImageUrlFour = await cloudinary.v2.uploader.upload(
        petImageUrlFour.path,
        {
          folder: "Pet",
          crop: "scale",
        }
      );

      // Save the pet Pet
      const newPet = new Pet({
        fullName: fullName,
        email: email,
        number: number,
        address: address,
        petType: petType,
        condition: condition,
        purpose: purpose,
        status: req.body.status,
        description: description,
        user : user,
        petImageUrlOne: uploadedImageUrlOne.secure_url,
        petImageUrlTwo: uploadedImageUrlTwo.secure_url,
        petImageUrlThree: uploadedImageUrlThree.secure_url,
        petImageUrlFour: uploadedImageUrlFour.secure_url,
      });
      await newPet.save();
    } else if (req.body.status === "own") {
      // step 2: Destructuring
      const {
        fullName,
        email,
        number,
        address,
        petType,
        condition,
        purpose,
        description,
        petAge,
        petGender,
        user
      } = req.body;

      if(!fullName|| !email || !number || !address || !petType || !condition || !purpose || !description || !petAge || !petGender || !user)
      {
        return res.json({
          success: false,
          message: "Please fill all the fields",
        });
      }

      const { petImageUrlFive, petFileUrl } = req.files;

      if (!petFileUrl) {
        return res.json({
          success: false,
          message: "pet file null",
        });
      }

      if (!petImageUrlFive) {
        return res.json({
          success: false,
          message: "petimagefivenull",
        });
      }

      let uploadedImageUrlFive = await cloudinary.v2.uploader.upload(
        petImageUrlFive.path,
        {
          folder: "Pet",
          crop: "scale",
        }
      );

      let uploadedFileUrl = await cloudinary.v2.uploader.upload(
        petFileUrl.path,
        {
          folder: "Pet",
        }
      );

      // Save the pet Pet
      const newPet = new Pet({
        fullName: fullName,
        email: email,
        number: number,
        address: address,
        petType: petType,
        condition: condition,
        status: req.body.status,
        purpose: purpose,
        description: description,
        petAge: petAge,
        petGender: petGender,
        petImageUrlFive: uploadedImageUrlFive.secure_url,
        petFileUrl: uploadedFileUrl.secure_url,
        user:user
      });
      await newPet.save();
    }
    res.status(200).json({
      success: true,
      message: "Pet Pet created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json("Something went wrong. Please try again later.");
  }
};

const getAllPets = async (req, res) => {
  try {
    const Pets = await Pet.find();
    res.status(200).json({
      success: true,
      allPets: Pets,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

module.exports = {
  addPet,
  getAllPets,
};
