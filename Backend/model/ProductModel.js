// !mdbgum  - shortcut for schema

const mongoose = require('mongoose'); 

const productSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    category:{
        type:String,
    },
    subCategory:{
        type:String,
    },
    description1:{
        type:String,
    },
    description2:{
        type:String,
    },
    price:{
        type:Number,
    },
    originalPrice: {
        type: Number,
      },
    image_url:{
        type:String,
    },
    quantity:{
        type: Number,
        default: 1
    }
});


ProductModel = mongoose.model('FoodItems', productSchema);
module.exports= ProductModel