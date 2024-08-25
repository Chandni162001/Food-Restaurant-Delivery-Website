const mongoose = require('mongoose'); 

const bookTableSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    name:{
        type:String,
    },
    phone:{
        type:Number,
    },
    numberOfPersons:{
        type:String,
    },
    date:{
        type: Date,
        default: Date.now
    },
    time:{
        type:String,
    },
    message:{
        type:String
    }
});

module.exports = mongoose.model('BookTable', bookTableSchema);