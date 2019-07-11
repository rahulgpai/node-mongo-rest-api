const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: {
    type: String
  },
  description: {
    type: String
  },
  parent: {
    type: Schema.Types.ObjectId,
    ref: "category"
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
  ]
});

const Category = mongoose.model("category", categorySchema);
module.exports = Category;
