const mongoose = require('mongoose'); 

const addressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
    name:{
        type:String,
    },
    phone:{
        type:String,
    },
    pincode:{
        type:Number,
    },
    address:{
        type:String,
    },
    city:{
        type:String,
    },
    state:{
        type:String,
    },
    saveAddressAs:{
        type:String,
    },
    defaultAddress:{
        type:Boolean,
        default:false
    }
});

AddressModel = mongoose.model('Address', addressSchema);    
module.exports = AddressModel 