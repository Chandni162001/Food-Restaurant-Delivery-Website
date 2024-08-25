const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const nodemailer=require("nodemailer")
const UserModel = require("../model/UserModel")
const AddressModel = require("../model/AddressModel")
const ContactModel = require("../model/ContactModel")
const BookTableModel = require("../model/BookTableModel")

// register api
const createUser= (req,res) =>{
  const {name, email, phone,  password} = req.body; 
  // console.log(req.body) 
  bcrypt.hash(password, 10)
  .then(hash => {
      UserModel.create({name, email,phone, password:hash})
      .then(user => res.json(user))
      .catch(err => res.json(err))
  }).catch(err => console.log(err.message))
}

//login api
const loginUser = (req, res) => {
  const { email, password } = req.body;
  UserModel.findOne({ email })
    .then(user => {
      if (!user) {
        return res.status(401).json('Unauthorized');
      }
      bcrypt.compare(password, user.password)
        .then(isPasswordValid => {
          if (!isPasswordValid) {
            return res.status(401).json('Unauthorized');
          }

          const token = jwt.sign(
            { userId: user._id, email: user.email, role: user.role },
            'yourSecretKey', 
            { expiresIn: '1d' }
          );
          return res.json({ token });
        })
        .catch(err => {
          console.error(err);
          return res.status(500).json('Internal Server Error');
        });
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json('Internal Server Error');
    });
};

//token validation api
const validateToken = async (req, res) => {
  const { token } = req.body;
  try {
    const decoded = jwt.verify(token, 'yourSecretKey');
    const user = await UserModel.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    res.json({ valid: true });
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};



//forgot password api
const generateOTP = () => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  return otp.toString(); 
};

const forgotPassword = (req, res) => {
  const { email } = req.body;

  UserModel.findOne({ email })
    .then(user => {
      if (!user) {
        return res.status(404).send({ Status: "User doesn't exist." });
      }

      const otp = generateOTP();
      const otpExpiry = Date.now() + 180000 ; 

      user.resetPasswordOTP = otp;
      user.resetPasswordOTPExpiry = otpExpiry;

      user.save()
        .then(() => {
          const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'chandnisodani1606@gmail.com',
              pass: 'rbnm kwvm mxpi liav'
            }
          });

          const mailOptions = {
            from: 'chandnisodani1606@gmail.com',
            to: email,
            subject: 'Your Password Reset OTP',
            text: `Your OTP for password reset is: ${otp}. The otp remains valid for only 3 minutes.`
          };

          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log(error);
              return res.status(500).send({ Status: "Failed to send email", Error: error.message });
            } else {
              return res.send({ Status: "Success", Info: info.response });
            }
          });
        })
        .catch(error => {
          console.log(error);
          res.status(500).send({ Status: "Error saving OTP", Error: error.message });
        });
    })
    .catch(error => {
      console.log(error);
      res.status(500).send({ Status: "Error", Error: error.message });
    });
};


const resetPassword = (req, res) => {
  const { email, otp, newPassword } = req.body;

  UserModel.findOne({ email })
    .then(user => {
      if (!user) {
        return res.status(404).send({ Status: 404, Message: "User doesn't exist." });
      }

      if (user.resetPasswordOTP !== otp) {
        return res.status(400).send({ Status: 400, Message: "Invalid OTP" });
      }

      if (Date.now() > user.resetPasswordOTPExpiry) {
        return res.status(400).send({ Status: 400, Message: "OTP expired" });
      }

      bcrypt.hash(newPassword, 10, (err, hash) => {
        if (err) {
          console.error("Failed to hash password:", err);
          return res.status(500).send({ Status: 500, Message: "Failed to hash password" });
        }

        user.password = hash;
        user.resetPasswordOTP = undefined;
        user.resetPasswordOTPExpiry = undefined;

        user.save()
          .then(() => res.status(200).send({ Status: 200, Message: "Password updated successfully!" }))
          .catch(saveErr => {
            console.error("Failed to update password in the database:", saveErr);
            res.status(500).send({ Status: 500, Message: "Failed to update password" });
          });
      });
    })
    .catch(error => {
      console.error("Error while resetting password:", error);
      res.status(500).send({ Status: 500, Message: "Failed to update password" });
    });
};


// get all users api
const getAllUsers = async (req, res) => {
  try {
    const allUsers = await UserModel.find({}); 
    res.json(allUsers); 
  } catch (err) {
    res.status(500).json({ message: err.message }); 
  }
};


//get single user by id api
const getUserById = async (req,res)=>{
  try{
    const singleUser = await UserModel.findById(req.params.id);
    if(!singleUser){
      return res.status(404).json({message:'User Not Found'});
    }
    res.json(singleUser) 
  }
  catch (err){
    res.status(500).json({message: err.message});
  }
}

const deleteUserById = async(req,res)=>{
  try{
    const delUser=await UserModel.findByIdAndDelete(req.params.id);
    if(!delUser){
      return res.status(404).json({message:"User doesn't exist."})
    }
    res.json(delUser)
  }
  catch (err){
    res.status(500).json({message:err.message})
  }
}


const isAdmin = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Toggle the role and isAdmin status
    user.role = user.role === 'user' ? 'admin' : 'user';
    user.adminn = user.adminn === false ? true : false;

    await user.save();
    console.log(user); // Debugging line
    res.status(200).json({ message: 'User role updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};


//profile api

const userProfile = async (req, res) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).send('Access denied');
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).send('Access denied');
  }

  try {
    const verified = jwt.verify(token, 'yourSecretKey'); // Ensure the secret key matches
    const user = await UserModel.findById(verified.userId);

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.json({ name: user.name, email: user.email, phone: user.phone });
  } catch (error) {
    res.status(400).send('Invalid token');
  }
};



// logout api
const logoutUser =(req,res)=>{
    return res.json('Success')
}


const userAddress = async (req, res) => {
  const { name, phone, pincode, address, city, state, saveAddressAs, defaultAddress } = req.body;
  const userId = req.user.userId; 

  try {
    if (defaultAddress) {
      await AddressModel.updateMany({ userId, defaultAddress: true }, { defaultAddress: false });
    }

    const newAddress = await AddressModel.create({
      userId, name, phone, pincode, address, city, state, saveAddressAs, defaultAddress
    });

    res.status(201).json(newAddress);
  } catch (err) {
    res.status(500).json({ error: 'Cannot add new address', err });
  }
}

const viewAddress = async (req, res) => {
  try {
    const userId = req.user.userId; 
    const addresses = await AddressModel.find({ userId });
    res.status(200).json(addresses);
  } catch (err) {
    res.status(500).json({ error: 'Cannot process viewAddress request!', err });
  }
};


const deleteAddress = async (req,res) => {
  try{
    const delAddress = await AddressModel.findByIdAndDelete(req.params.id)
    if (!delAddress) {
      return res.status(404).json({ error: 'Address not found or not authorized' });
  }
  res.status(200).json({ message: 'Address deleted',delAddress });
  }
  catch (err) {
    res.status(500).json({error:"Cannot deleted address !", err})
  }
}

//contact form api
const contactForm = async(req,res)=>{
  const {userId,name,mobile,email,subject,message}=req.body
  try{
    const contactDetails= await ContactModel.create({
      userId,name,mobile,email,subject,message
    })
    res.status(200).json({message:"Form is submitted.",contactDetails})
  }
  catch (error){
    res.json({error:"Form cannot be submitted.",error})
  }
}


//all contact forms
const viewContactForm=async(req,res)=>{
  try{
    const allContactForms=await ContactModel.find({})
    res.json(allContactForms)
  }
  catch (err){
    res.json({error:"cannot find forms.",err})
  }
}


//book table api
const bookTableForm = async(req,res)=>{
  const{userId,name,phone,numberOfPersons,date,time,message}=req.body
  try{
    const bookTableDetails=await BookTableModel.create({
      userId,name,phone,numberOfPersons,date,time,message
    })
    res.json({message:"Table is booked successfully",bookTableDetails})
  }
  catch (err){
    res.json({error:"cannot book table",err})
  }
}

//all booktable forms
const viewBookTableForm=async(req,res)=>{
  try{
    const allBookTableForms=await BookTableModel.find({})
    res.json(allBookTableForms)
  }
  catch (err){
    res.json({error:"cannot find forms.",err})
  }
}

module.exports={
  createUser, 
  loginUser,
  validateToken,
  forgotPassword,
  resetPassword,
  getAllUsers,
  getUserById,
  userProfile,
  logoutUser,
  deleteUserById,
  isAdmin,
  userAddress,
  viewAddress,
  deleteAddress,
  contactForm,
  viewContactForm,
  bookTableForm,
  viewBookTableForm
}