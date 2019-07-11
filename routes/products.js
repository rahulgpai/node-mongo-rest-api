const express = require("express");
//const router = express.Router();
const router = require("express-promise-router")(); // use the express-promise-router which handles try catch internally across all routes

const ProductsController = require("../controllers/products");

router
  .route("/")
  .get(ProductsController.index)
  .post(ProductsController.newProduct);

router
  .route("/:productId")
  .get(ProductsController.getProduct)
  .put(ProductsController.replaceProduct)
  .patch(ProductsController.updateProduct)
  .delete(ProductsController.deleteProduct);

router
  .route("/:productId/categories")
  .get(ProductsController.getProductCategories)
  .post(ProductsController.addProductCategories)
  .put(ProductsController.updateProductCategories);

module.exports = router;
