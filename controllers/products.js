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
    const productCategories = product.categories;

    productCategories.forEach(element => {
      Category.findById(element)
        .exec()
        .then(category => {
          category.products.push(product._id);
          category.save();
        });
    });

    res.status(201).json(product);
  },

  getProduct: async (req, res, next) => {
    const { productId } = req.params;
    const product = await Product.findById(productId).populate("categories");

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
    const product = await Product.findById(productId);
    const productCategories = product.categories;

    productCategories.forEach(productCategory => {
      const category = Category.findById(productCategory);
      let categoryProductList = category.products;
      categoryProductList = categoryProductList.filter(id => {
        return id != productId;
      });
      category.products.push(categoryProductList);
      category.save();
    });

    await Product.findByIdAndDelete(productId);

    res.status(200).json({ success: true });
  },

  getProductCategories: async (req, res, next) => {
    const { productId } = req.params;
    const product = await Product.findById(productId).populate("categories");

    res.status(200).json(product);
  },

  addProductCategories: async (req, res, next) => {
    const { productId } = req.params;
    const product = await Product.findById(productId);
    const newCategory = new Category(req.body);

    newCategory.products.push = productId;
    await newCategory.save();

    product.categories.push(newCategory._id);
    await product.save();

    res.status(200).json({
      product: product,
      category: newCategory
    });
  },

  updateProductCategories: async (req, res, next) => {
    const { productId } = req.params;
    const product = await Product.findById(productId);
    const categoryList = req.body.categories;
    categoryList.forEach(element => {
      product.categories.push(element);
    });
    await product.save();

    res.status(200).json({
      product: product
    });
  },

  unlinkProductCategory: async (req, res, next) => {
    const { productId, categoryId } = req.params;
    const product = await Product.findById(productId);
    let productCategoryList = product.categories;

    productCategoryList = productCategoryList.filter(id => {
      return id != categoryId;
    });
    product.categories = productCategoryList;
    await product.save();

    const category = await Category.findById(categoryId);
    let categoryProductList = category.products;
    categoryProductList = categoryProductList.filter(id => {
      return id != productId;
    });

    category.products = categoryProductList;
    await category.save();

    res.status(200).json({
      product: product,
      category: category
    });
  },

  linkProductCategory: async (req, res, next) => {
    const { productId, categoryId } = req.params;
    const product = await Product.findById(productId);
    let productCategoryList = product.categories;
    productCategoryList = productCategoryList.push(categoryId);
    product.categories = productCategoryList;
    await product.save();

    const category = await Category.findById(categoryId);
    let categoryProducts = category.products;
    categoryProductList = categoryProducts.push(categoryId);
    category.products = categoryProductList;
    await category.save();

    res.status(200).json({
      product: product,
      category: category
    });
  }
};
