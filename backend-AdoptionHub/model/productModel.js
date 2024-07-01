const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  plantName: {
    type: String,
    required: true,
    trim: true,
  },
  plantPrice: {
    type: Number,
    required: true,
    trim: true,
  },
  plantDescription: {
    type: String,
    required: true,
    trim: true,
  },
  plantId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  plantCategory: {
    type: String,
    required: true,
    trim: true,
  },
  plantImageUrl: {
    type: String,
    required: true,
    trim: true,
  },
  plantImageUrl1: {
    type: String,
    required: true,
    trim: true,
  },
  plantImageUrl2: {
    type: String,
    required: true,
    trim: true,
  },
  plantImageUrl3: {
    type: String,
    required: true,
    trim: true,
  },
  plantImageUrl4: {
    type: String,
    required: true,
    trim: true,
  },
});

const Products = mongoose.model("products", productSchema);
module.exports = Products;
