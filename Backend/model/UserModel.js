const mongoose = require('mongoose'); 

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        
    },
    email:{
        type:String,
        
        unique:true,
    },
    phone:{
        type:String,
        
    },
    password:{
        type:String,
        
    },
    resetPasswordOTP: { 
        type: String 
    },
    resetPasswordOTPExpiry: { 
        type: Date 
    },
    adminn:{
        type:Boolean,
        default:false
    },
    role:{
        type:String,
        default:'user'
    }
});

UserModel = mongoose.model('User', userSchema);    // User- collection in mongodb
module.exports = UserModel 