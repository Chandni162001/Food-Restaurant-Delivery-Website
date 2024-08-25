const multer = require('multer');
const path = require('path');


// Configure Multer storage
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, './uploadImages/');
//     },
//     filename: function (req, file, cb) {
//       cb(null,file.fieldname + "_"+ Date.now() + path.extname(file.originalname)); // Appending extension
      
//     //   cb(null,file.originalname + "_"+ Date.now());
//     }
//   });

const mstorage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, "./uploadImages")
    },
    filename: function(req,file,cb){
        cb(null,  file.originalname)
    }
})

const bstorage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, "./uploadImages")
    },
    filename: function(req,file,cb){
        cb(null,  file.originalname)
    }
})

const cstorage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, "./uploadImages")
    },
    filename: function(req,file,cb){
        cb(null,  file.originalname)
    }
})
  
  const upload = multer({ storage: mstorage });

  const uploadBanner = multer({ storage: bstorage });

  const uploadCategory = multer({ storage: cstorage });

  module.exports = {upload, uploadBanner, uploadCategory}