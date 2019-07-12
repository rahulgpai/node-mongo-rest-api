const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  categories: [
    {
      type: Schema.Types.ObjectId,
      ref: "category"
    }
  ],
  price: {
    type: Number,
    required: true
  },
  is_out_of_stock: {
    type: Boolean,
    default: false
  },
  is_hidden_from_display: {
    type: Boolean,
    default: false
  }
});

const Product = mongoose.model("product", productSchema);
module.exports = Product;
