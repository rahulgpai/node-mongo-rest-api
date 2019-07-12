const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  parent: {
    type: Schema.Types.ObjectId,
    ref: "category",
    default: null
  },
  child_categories: [
    {
      type: Schema.Types.ObjectId,
      ref: "category"
    }
  ],
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "product"
    }
  ],
  is_active: {
    type: Boolean,
    default: true
  }
});

const Category = mongoose.model("category", categorySchema);
module.exports = Category;
