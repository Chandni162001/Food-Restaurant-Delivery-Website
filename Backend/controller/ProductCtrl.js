const ProductModel = require('../model/ProductModel');
const CartModel=require("../model/CartModel");
const CategoryModel = require('../model/CategoryModel');
const IMG_BASE_URL = 'http://localhost:8080/static/';
// const jwt = require('jsonwebtoken');


//add category api
const addCategory= async (req,res)=>{
  const { name } =req.body;
  if(!req.file){
    return res.status(400).json({error: "Image upload failed"})
  }
  try {
    const newCategory = await CategoryModel.create({ 
    name,
    image_url: (IMG_BASE_URL + req.file.filename) });

    res.status(201).json(newCategory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

//view category api
const viewCategory=async(req,res)=>{
  try{
    const allCategories=await CategoryModel.find({})
    res.status(200).json(allCategories)
  }
  catch (err) {
    res.status(500).json({ message:'Cannot fetch all categories',err})
}
}

//delete category api
const deleteCategory = async (req, res) => {
  try {
    const delCategory = await CategoryModel.findByIdAndDelete(req.params.id);
    if (!delCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json({ message: 'Category is deleted', delCategory });
  } catch (err) {
    res.status(500).json({ message: 'Cannot delete category', error: err.message });
  }
};



// Add food item API
const addFoodItem = async (req, res) => {
    // console.log(req);
  const { name, category, subCategory, price, originalPrice, description1, description2 } = req.body;

  if (!req.file) {
    return res.status(400).json({ error: 'Image upload failed' });
  }

  try {
    const newItem = await ProductModel.create({ name, category, subCategory, price, originalPrice, description1, description2,
    image_url: (IMG_BASE_URL + req.file.filename) });

    res.json(newItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Show foodItems API
const viewFoodItems = async (req,res) => {
    try {
        const allProducts = await ProductModel.find({})
        res.json(allProducts)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
};


const deleteItem = async(req,res)=>{
  try {
    const delItem = await ProductModel.findByIdAndDelete(req.params.id)
    
    if(!delItem){
      res.status(404).json({message:"Food-Item is Not Found"})
    }
    
      // res.json(delItem)
      res.json({message:"Food-Item is deleted successfully",delItem})
    
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
};


const updateFoodItem = async (req, res) => {
  try {
    const { name, category, subCategory, price, originalPrice, description1, description2 } = req.body;
    const updateData = { name, category, subCategory, price, originalPrice, description1, description2 };

    if (req.file) {
      updateData.image_url = IMG_BASE_URL + req.file.filename;
    }

    const updateItem = await ProductModel.findByIdAndUpdate(req.params.id, updateData, { new: true });
    
    if (!updateItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.json({ message: 'Item is updated', updateItem });
  } catch (error) {
    res.status(500).json({ error: "Can't update foodItem", details: error.message });
  }
};

// const updateFoodItem = async (req, res) => {
//   try {
//     let imageUrl = '';
//     if (req.file) {
//       imageUrl = `${IMG_BASE_URL}${req.file.filename}`;
//     }
//     const updateItem = await ProductModel.findByIdAndUpdate(
//       req.params.id,
//       { ...req.body, image_url: imageUrl },
//       { new: true }
//     );
//     res.json({ message: 'Item is updated', updateItem });
//   } catch (error) {
//     res.status(500).json({ error: "Can't update food item", error });
//   }
// };


const subCategories=async(req,res)=>{
  try {
      const subCategories = await ProductModel.distinct('subCategory', { category: { $in: ['Starters', 'Main Course', 'Deserts & Drinks'] } });
      res.json(subCategories);
  } catch (err) {
      res.status(500).json({ error:"Can't fetch subcategory", err });
  }
}


const addToCart = async (req, res) => {
  const { productId, name, originalPrice } = req.body;
  const userId = req.user.userId; 

  if (!productId || !name || !originalPrice) {
    return res.status(400).json({ error: "Item details are incomplete" });
  }

  try {
    let item = await CartModel.findOne({ productId, userId });
    if (item) {
      item.quantity += 1;
      item.price = (item.quantity * item.originalPrice);
      await item.save();
    } else {
      item = new CartModel({ productId, name, originalPrice, userId });
      await item.save();
    }
    res.status(200).json({ message: 'FoodItem is added to cart', item });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "FoodItem is not added to the cart" });
  }
};

const viewCart = async (req, res) => {
  try {
    const userId = req.user.userId; 
    const cartItems = await CartModel.find({ userId });
    if (cartItems.length === 0) {
      return res.status(404).json({ message: "No cart items found for this user" });
    }
    res.status(200).json(cartItems);
  } catch (err) {
    console.error('Error fetching cart items:', err);
    res.status(500).json({ message: "Error fetching cart items", error: err });
  }
};

const updateCart = async (req, res) => {
  try {
    const updateCartItem = await CartModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updateCartItem);
  } catch (err) {
    res.status(500).json({ message: "Error while updating cart item's quantity", err });
  }
};


const deleteCart = async (req, res) =>{
  try {
    const deleteCartItem = await CartModel.findByIdAndDelete(req.params.id)
    res.status(200).json({message:"Item is deleted !",deleteCartItem})
  }
  catch (err) {
    res.status(500).json({error:`Item cannot be deleted`,err})
  }
}


module.exports = {addFoodItem, viewFoodItems,deleteItem,subCategories, addToCart,viewCart,updateCart,deleteCart,addCategory,viewCategory,deleteCategory,updateFoodItem};
