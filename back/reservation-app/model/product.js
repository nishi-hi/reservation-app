const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;
//const ObjectId = Schema.ObjectId;

const ProductSchema = new Schema({
  coverImage: String,
  name: { type: String, required: true, max:[60, '最大60文字までです'] },
  price: Number,
  description: String,
  heading1: String,
  heading2: String,
  heading3: String,
  heading1Text: String,
  heading2Text: String,
  heading3Text: String
});

module.exports = mongoose.model('Product', ProductSchema);