const Category = require("../models/category");
const Product = require("../models/product");

module.exports = {
  index: async (req, res, next) => {
    const products = await Product.find({});
    res.status(200).json(products);
  },

  newProduct: async (req, res, next) => {
    const newProduct = new Product(req.body);
    const product = await newProduct.save();
    res.status(201).json(product);
  },

  getProduct: async (req, res, next) => {
    const { productId } = req.params;
    const product = await Product.findById(productId);
    res.status(200).json(product);
  },

  replaceProduct: async (req, res, next) => {
    const { productId } = req.params;
    const newProduct = req.body;
    const product = await Category.findByIdAndUpdate(productId, newProduct, {
      useFindAndModify: false
    });
    res.status(200).json(newProduct);
  },

  updateProduct: async (req, res, next) => {
    const { productId } = req.params;
    const newProduct = req.body;
    const product = await Category.findByIdAndUpdate(productId, newProduct, {
      useFindAndModify: false
    });
    res.status(200).json(newProduct);
  },

  deleteProduct: async (req, res, next) => {
    const { productId } = req.params;
    const result = await Product.findByIdAndDelete(productId);
    res.status(200).json({ success: true });
  },

  getProductCategories: async (req, res, next) => {
    const { productId } = req.params;
    const product = await Product.findById(productId).populate("categories");
    res.status(200).json(product);
  },

  addProductCategories: async (req, res, next) => {
    const { productId } = req.params;
    // Get Product
    const product = await Product.findById(productId);
    // Creating a new Category
    const newCategory = new Category(req.body);
    // Assign product as the category's product
    newCategory.products.push = productId;
    await newCategory.save();
    // Add category to product
    product.categories.push(newCategory._id);
    // Save the product
    await product.save();
    res.status(200).json({
      product: product,
      category: newCategory
    });
  },

  updateProductCategories: async (req, res, next) => {
    const { productId } = req.params;
    // Get Product
    const product = await Product.findById(productId);
    const categoryList = req.body.categories;

    categoryList.forEach(element => {
      product.categories.push(element);
    });

    await product.save();

    res.status(200).json({
      product: product
    });
  }
};
