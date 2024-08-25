const express = require("express")
const {createUser, loginUser,forgotPassword,resetPassword, getAllUsers,getUserById,logoutUser,deleteUserById,isAdmin, userAddress,viewAddress,deleteAddress,userProfile,validateToken,contactForm,viewContactForm,bookTableForm,viewBookTableForm}= require("../controller/UserCtrl")
const { authenticate } = require("../middleware/Auth")
const router =express.Router()

router.post("/register", createUser)
router.post("/login", loginUser)
router.post("/validToken",authenticate, validateToken)
router.post("/forgotPassword", forgotPassword)
router.post("/resetPassword", resetPassword)
router.post("/logout", logoutUser)
router.get("/getAllUsers", getAllUsers)
router.get("/getUser/:id", getUserById)
router.delete("/delUser/:id", deleteUserById)
router.put("/isAdmin/:id", isAdmin)
router.get("/profile", userProfile)


//address api
router.post("/userAddress",authenticate, userAddress)
router.get("/viewAddress",authenticate, viewAddress)
router.delete("/deleteAddress/:id",authenticate, deleteAddress)


//contact api
router.post('/contactForm',authenticate,contactForm)
router.get('/viewContactForm',viewContactForm)


//booktable api
router.post('/bookTableForm',authenticate,bookTableForm)
router.get('/viewBookTableForm',viewBookTableForm)

module.exports= router;