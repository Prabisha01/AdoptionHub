const router = require('express').Router();
const productController = require("../controllers/productController");
const { authGuardAdmin } = require('../middleware/authGuard');


// Create product API
router.post('/create_product', authGuardAdmin, productController.createProduct)

//get all products API
router.get("/get_products", productController.getAllProducts)


//Get single product API | /get_product/:id
router.get("/get_product/:id" , productController.getSingleProduct)

//update product API
router.put("/update_product/:id",authGuardAdmin,  productController.updateProduct)


//delete product API
router.delete("/delete_product/:id",authGuardAdmin, productController.deleteProduct)


//get pagination
router.get("/get_product_pagination" , productController.getProductPagination)

//get user product pagination
router.get("/get_user_product_pagination" , productController.getUserProductPagination)

//search
router.get("/search/:key", productController.searchProducts);

// Add the route for getting products by category
router.get('/category/:category', productController.getProductsByCategory);


// get all count
router.get('/products/count', productController.getProductCount);

module.exports = router;