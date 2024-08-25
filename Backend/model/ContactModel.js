const mongoose = require('mongoose'); 

const contactSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    name:{
        type:String,
    },
    email:{
        type:String,
    },
    mobile:{
        type:String,
    },
    subject:{
        type:String,
    },
    message:{
        type:String
    }
});

module.exports = mongoose.model('Contact', contactSchema);