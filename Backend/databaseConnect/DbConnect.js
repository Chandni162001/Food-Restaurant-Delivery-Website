const mongoose= require('mongoose')   //import mongoose to connect mongodb

const connection = async () =>{
    try{
        await  mongoose.connect(process.env.MONGODB_URL)
        .then((res)=>{
            console.log("Mongodb databse is connected now");
        })
        .catch((err)=>{
            console.log("Mongodb databse is not connected now", err);
        })
    }
    catch(err){
        console.log("Mongodb databse is not connected now", err);
    }
}

connection()

module.exports = connection