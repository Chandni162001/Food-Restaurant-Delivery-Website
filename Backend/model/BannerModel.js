const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema({
  description: {
    type: String,
  },
  slideNumber: {
    type: Number,
  },
  bannerImage: {
    type: String,
  },
});

//Export the model
BannerModel = mongoose.model("Banner", bannerSchema);
module.exports = BannerModel;
