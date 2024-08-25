const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  name: {
    type: String,
  },
  price: {
    type: Number,
  },
  originalPrice: {
    type: Number,
  },
  totalPrice:{
    type: Number,
  },
  image_url: {
    type: String,
  },
  quantity: {
    type: Number,
    default: 1
  }
});

const CartModel = mongoose.model('Cart', cartSchema);
module.exports = CartModel;
