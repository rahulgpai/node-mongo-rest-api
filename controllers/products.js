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

    res.status(201).json({ success: true });
  },

  getProduct: async (req, res, next) => {
    const { productId } = req.params;
    const product = await Product.findById(productId).populate("categories");

    res.status(200).json(product);
  },

  replaceProduct: async (req, res, next) => {
    const { productId } = req.params;
    const newProduct = req.body;
    await Product.findByIdAndUpdate(productId, newProduct, {
      useFindAndModify: false
    });

    const product = await Product.findById(productId);
    const productCategories = product.categories;

    productCategories.forEach(element => {
      Category.findById(element)
        .exec()
        .then(category => {
          category.products.push(productId);
          category.save();
        });
    });

    res.status(200).json({ success: true });
  },

  updateProduct: async (req, res, next) => {
    const { productId } = req.params;
    const newProduct = req.body;
    await Product.findByIdAndUpdate(productId, newProduct, {
      useFindAndModify: false
    });

    const product = await Product.findById(productId);
    const productCategories = product.categories;

    productCategories.forEach(element => {
      Category.findById(element)
        .exec()
        .then(category => {
          category.products.push(productId);
          category.save();
        });
    });

    res.status(200).json({ success: true });
  },

  deleteProduct: async (req, res, next) => {
    const { productId } = req.params;
    const product = await Product.findById(productId);
    const productCategories = product.categories;

    productCategories.forEach(element => {
      Category.findById(element)
        .exec()
        .then(category => {
          category.products.filter(id => {
            return id != productId;
          });
          category.save();
        });
    });

    await Product.findByIdAndDelete(productId);

    res.status(200).json({ success: true });
  },

  getProductCategories: async (req, res, next) => {
    const { productId } = req.params;
    const product = await Product.findById(productId).populate("categories");

    res.status(200).json(product.categories);
  },

  addProductCategories: async (req, res, next) => {
    const { productId } = req.params;
    const product = await Product.findById(productId);
    const newCategory = new Category(req.body);

    newCategory.products.push = productId;
    await newCategory.save();

    product.categories.push(newCategory._id);
    await product.save();

    res.status(200).json({ success: true });
  },

  updateProductCategories: async (req, res, next) => {
    const { productId } = req.params;
    const categoryList = req.body.categories;
    await Product.findById(productId)
      .exec()
      .then(product => {
        categoryList.forEach(element => {
          product.categories.push(element);
        });
      });

    await product.save();

    res.status(200).json({ success: true });
  },

  unlinkProductCategory: async (req, res, next) => {
    const { productId, categoryId } = req.params;
    await Product.findById(productId)
      .exec()
      .then(product => {
        let productCategoryList = product.categories;
        productCategoryList = productCategoryList.filter(id => {
          return id != categoryId;
        });
        product.categories = productCategoryList;
        product.save();
      });

    await Category.findById(categoryId)
      .exec()
      .then(category => {
        let categoryProductList = category.products;
        categoryProductList = categoryProductList.filter(id => {
          return id != productId;
        });
        category.products = categoryProductList;
        category.save();
      });

    res.status(200).json({ success: true });
  },

  linkProductCategory: async (req, res, next) => {
    const { productId, categoryId } = req.params;
    await Product.findById(productId)
      .exec()
      .then(product => {
        let productCategoryList = product.categories;
        productCategoryList = productCategoryList.push(categoryId);
        product.categories = productCategoryList;
        product.save();
      });

    await Category.findById(categoryId)
      .exec()
      .then(category => {
        let categoryProducts = category.products;
        categoryProductList = categoryProducts.push(categoryId);
        category.products = categoryProductList;
        category.save();
      });

    res.status(200).json({ success: true });
  }
};
