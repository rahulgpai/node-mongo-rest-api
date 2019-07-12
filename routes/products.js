const express = require("express");
//const router = express.Router();
const router = require("express-promise-router")(); // use the express-promise-router which handles try catch internally across all routes

const ProductsController = require("../controllers/products");

router
  .route("/products")
  .get(ProductsController.index)
  .post(ProductsController.newProduct);

router
  .route("/products/:productId")
  .get(ProductsController.getProduct)
  .put(ProductsController.replaceProduct)
  .patch(ProductsController.updateProduct)
  .delete(ProductsController.deleteProduct);

router
  .route("/products-category/:productId")
  .get(ProductsController.getProductCategories)
  .post(ProductsController.addProductCategories)
  .put(ProductsController.updateProductCategories);

router
  .route("/d/products-category/:productId/:categoryId")
  .delete(ProductsController.unlinkProductCategory);

router
  .route("/u/products-category/:productId/:categoryId")
  .get(ProductsController.linkProductCategory);

module.exports = router;
