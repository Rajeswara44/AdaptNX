const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
    index: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    default: 0,
  },
  imageUrl: {
    type: String,
  },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
