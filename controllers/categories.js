const Category = require("../models/category");
const Product = require("../models/product");

module.exports = {
  index: async (req, res, next) => {
    const categories = await Category.find({});
    res.status(200).json(categories);
  },

  newCategory: async (req, res, next) => {
    const newCategory = new Category(req.body);
    const category = await newCategory.save();
    res.status(201).json(category);
  },

  getCategory: async (req, res, next) => {
    const { categoryId } = req.params;
    const category = await Category.findById(categoryId)
      .populate("child_categories")
      .populate("products");
    res.status(200).json(category);
  },

  replaceCategory: async (req, res, next) => {
    const { categoryId } = req.params;
    const newCategory = req.body;
    const category = await Category.findByIdAndUpdate(categoryId, newCategory);
    res.status(200).json({ success: true });
  },

  updateCategory: async (req, res, next) => {
    const { categoryId } = req.params;
    const newCategory = req.body;
    const category = await Category.findByIdAndUpdate(categoryId, newCategory);
    res.status(200).json({ success: true });
  },

  deleteCategory: async (req, res, next) => {
    const { categoryId } = req.params;
    const result = await Category.findByIdAndDelete(categoryId);
    res.status(200).json({ success: true });
  },

  getCategoryProducts: async (req, res, next) => {
    const { categoryId } = req.params;
    const category = await Category.findById(categoryId).populate("products");
    res.status(200).json(category);
  },

  addCategoryProducts: async (req, res, next) => {
    const { categoryId } = req.params;
    // Get Category
    const category = await Category.findById(categoryId);
    // Creating a new Product
    const newProduct = new Product(req.body);
    // Assign category as the product's category
    newProduct.categories.push = categoryId;
    await newProduct.save();
    // Add product to category
    category.products.push(newProduct._id);
    // Save the category
    await category.save();
    res.status(200).json({
      product: newProduct,
      category: category
    });
  },

  updateCategoryProducts: async (req, res, next) => {
    const { categoryId } = req.params;
    // Get Category
    const category = await Category.findById(categoryId);
    const productList = req.body.products;

    productList.forEach(element => {
      category.products.push(element);
    });

    await category.save();

    res.status(200).json({
      category: category
    });
  },

  unlinkCategoryProduct: async (req, res, next) => {
    const { categoryId, productId } = req.params;

    // Get category
    const category = await Category.findById(categoryId);
    let categoryProductList = category.products;

    categoryProductList = categoryProductList.filter(id => {
      return id != productId;
    });

    category.products = categoryProductList;

    await category.save();

    const product = await Product.findById(productId);
    let productCategoryList = product.categories;

    productCategoryList = productCategoryList.filter(id => {
      return id != categoryId;
    });

    product.categories = productCategoryList;

    await product.save();

    res.status(200).json({
      product: product,
      category: category
    });
  }
};
