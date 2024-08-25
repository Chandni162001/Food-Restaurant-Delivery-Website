const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
const categorySchema = new mongoose.Schema({
    name:{
        type:String,
    },
    image_url:{
        type:String,
    }
});

//Export the model
module.exports = mongoose.model('Category', categorySchema);