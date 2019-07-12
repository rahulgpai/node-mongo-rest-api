const express = require("express");
//const router = express.Router();
const router = require("express-promise-router")(); // use the express-promise-router which handles try catch internally across all routes

const CategoriesController = require("../controllers/categories");

router
  .route("/categories")
  .get(CategoriesController.index) // path GET /api/categories will return all categories listing child categories ids and product ids mapped to the categories
  .post(CategoriesController.newCategory); // POST path /api/categories with the new category object will create a new category and recursively map this category to its products

router
  .route("/categories/:categoryId")
  .get(CategoriesController.getCategory) // path GET /api/categories/:categoryId will return a category and populate its child categories and its products
  .put(CategoriesController.replaceCategory) // path PUT /api/categories/:categoryId will replace the category object
  .patch(CategoriesController.updateCategory) // path PATCH /api/categories/:categoryId will update the category object for the fields
  .delete(CategoriesController.deleteCategory); // path DELETE /api/categories/:categoryId will delete the category after recursively unlinking this category from its products

router
  .route("/category-products/:categoryId")
  .get(CategoriesController.getCategoryProducts) // path GET /api/category-products/:categoryId will return categories populated by its products
  .post(CategoriesController.addCategoryProduct) // path POST /api/category-products/:categoryId will add one product to the category with product object passed to the API and also link category to the product
  .put(CategoriesController.updateCategoryProducts); // path PUT /api/category-products/:categoryId will link product from array of product object ids passed to the API and also link category to each product id in the array

router
  .route("/d/category-products/:categoryId/:productId")
  .delete(CategoriesController.unlinkCategoryProduct); // path DELETE /api/d/category-products/:categoryId/:productId will unlink the product from the category and unlink the category from the product categories

router
  .route("/u/category-products/:categoryId/:productId")
  .get(CategoriesController.linkCategoryProduct); // path DELETE /api/u/category-products/:categoryId/:productId will unlink the product from the category and unlink the category from the product categories

module.exports = router;
