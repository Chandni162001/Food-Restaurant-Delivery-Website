const express = require("express")
const router =express.Router()
const {upload, uploadBanner} = require("../middleware/Multer")
const { authenticate } = require("../middleware/Auth")
const {addFoodItem, viewFoodItems,deleteItem,subCategories,addToCart,viewCart,updateCart,deleteCart, addCategory,viewCategory,deleteCategory,updateFoodItem} = require("../controller/ProductCtrl")
const {addBannerImage, viewBanners, deleteBanner} = require("../controller/BannerCtrl")
const {addOrder,viewOrders,getAllOrders,cancelOrder} = require("../controller/OrderCtrl")


//for category routes
router.post('/addCategory', upload.single('categoryImage'), addCategory);
router.get('/viewCategories', viewCategory);
router.delete('/delCategories/:id', deleteCategory);


// for products routes
router.post('/addItem', upload.single('itemImage'), addFoodItem);
router.get('/viewItems', viewFoodItems);
router.delete('/deleteItem/:id', deleteItem);
router.put('/updateItem/:id',  upload.single('itemImage'),updateFoodItem);
router.get('/subcategories', subCategories);

//for banner routes
router.post('/addBanner', uploadBanner.single('bannerImage'), addBannerImage);
router.get('/viewBanners', viewBanners);
router.delete('/delBanner/:id', deleteBanner);


//for Cart routes (protected by authenticate middleware)
router.post('/addToCart', authenticate, addToCart);
router.get('/viewCart', authenticate, viewCart);
router.patch('/updateCart/:id', authenticate, updateCart);
router.delete('/deleteCart/:id', authenticate, deleteCart);


//for order routes
router.post('/addOrder',authenticate, addOrder);
router.get('/viewOrders',authenticate, viewOrders);
router.get('/getAllOrders',getAllOrders);
router.put('/cancelOrder/:id', cancelOrder);

module.exports=router;