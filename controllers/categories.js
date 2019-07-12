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
    const categoryProducts = category.products;

    categoryProducts.forEach(element => {
      Product.findById(element)
        .exec()
        .then(product => {
          product.categories.push(category._id);
          product.save();
        });
    });

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
    const category = await Category.findByIdAndUpdate(categoryId, newCategory, {
      useFindAndModify: false
    });

    res.status(200).json({ success: true });
  },

  updateCategory: async (req, res, next) => {
    const { categoryId } = req.params;
    const newCategory = req.body;
    const category = await Category.findByIdAndUpdate(categoryId, newCategory, {
      useFindAndModify: false
    });

    res.status(200).json({ success: true });
  },

  deleteCategory: async (req, res, next) => {
    const { categoryId } = req.params;
    const category = await Category.findById(categoryId);
    const categoryProducts = category.products;

    categoryProducts.forEach(categoryProduct => {
      const product = Product.findById(categoryProduct);
      let productCategories = product.categories;
      productCategories = productCategories.filter(id => {
        return id != categoryId;
      });
      product.categories.push(productCategories);
      product.save();
    });

    await Category.findByIdAndDelete(categoryId);

    res.status(200).json({ success: true });
  },

  getCategoryProducts: async (req, res, next) => {
    const { categoryId } = req.params;
    const category = await Category.findById(categoryId).populate("products");

    res.status(200).json(category);
  },

  addCategoryProduct: async (req, res, next) => {
    const { categoryId } = req.params;
    const category = await Category.findById(categoryId);
    const newProduct = new Product(req.body);

    newProduct.categories.push = categoryId;
    await newProduct.save();

    category.products.push(newProduct._id);
    await category.save();

    res.status(200).json({
      product: newProduct,
      category: category
    });
  },

  updateCategoryProducts: async (req, res, next) => {
    const { categoryId } = req.params;
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
  },

  linkCategoryProduct: async (req, res, next) => {
    const { categoryId, productId } = req.params;

    // Get category
    const category = await Category.findById(categoryId);
    let categoryProductList = category.products;
    categoryProductList = categoryProductList.push(productId);
    category.products = categoryProductList;
    await category.save();

    const product = await Product.findById(productId);
    let productCategoryList = product.categories;
    productCategoryList = productCategoryList.push(categoryId);
    product.categories = productCategoryList;
    await product.save();

    res.status(200).json({
      product: product,
      category: category
    });
  }
};
