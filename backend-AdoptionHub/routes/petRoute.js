const router = require("express").Router();
const petController = require("../controllers/petcontroller");
const { authGuard } = require("../middleware/authGuard");

// create Order
router.post("/add-pet", petController.addPet);

//get Order
router.get("/get-pet/:id", petController.getAllPets);

//getAllOder
//get all blog API
router.get("/get-all-pets", petController.getAllPets);

module.exports = router;