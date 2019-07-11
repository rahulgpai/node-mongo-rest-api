const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String
  },
  description: {
    type: String
  },
  categories: [
    {
      type: Schema.Types.ObjectId,
      ref: "category"
    }
  ]
});

const Product = mongoose.model("product", productSchema);
module.exports = Product;
