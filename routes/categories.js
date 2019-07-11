const express = require("express");
//const router = express.Router();
const router = require("express-promise-router")(); // use the express-promise-router which handles try catch internally across all routes

const CategoriesController = require("../controllers/categories");

router
  .route("/")
  .get(CategoriesController.index)
  .post(CategoriesController.newCategory);

router
  .route("/:categoryId")
  .get(CategoriesController.getCategory)
  .put(CategoriesController.replaceCategory)
  .patch(CategoriesController.updateCategory)
  .delete(CategoriesController.deleteCategory);

router
  .route("/:categoryId/products")
  .get(CategoriesController.getCategoryProducts)
  .post(CategoriesController.addCategoryProducts)
  .put(CategoriesController.updateCategoryProducts);

router
  .route("/:categoryId/products/:productId")
  .delete(CategoriesController.unlinkCategoryProduct);

module.exports = router;
