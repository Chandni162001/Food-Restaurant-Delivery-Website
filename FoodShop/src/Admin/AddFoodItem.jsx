import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BaseUrl } from '../config/Base_Url';
import { toast } from 'react-toastify';

function AddFoodItem() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [itemName, setItemName] = useState('');
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [originalPrice, setOriginalPrice] = useState(0);
  const [description1, setDescription1] = useState('');
  const [description2, setDescription2] = useState('');
  const [itemImage, setItemImage] = useState(null);

  const navigate = useNavigate();

  const handleClick = () => {
    document.getElementById('addImage').click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setItemImage(file);
    }
  };

  axios.defaults.withCredentials = true;

  const handleAddItem = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', itemName);
    formData.append('category', category);
    formData.append('subCategory', subCategory);
    formData.append('originalPrice', originalPrice);
    formData.append('description1', description1);
    formData.append('description2', description2);
    formData.append('itemImage', itemImage);

    try {
      await axios.post(`${BaseUrl}/api/product/addItem`, formData);
      toast.success(`Item is Added`);
      navigate("/viewItem");
    } catch (err) {
      toast.error(`Cannot add item`);
    }
  };

  useEffect(()=>{
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  },[])

  return (
    <div className="foodItemPage mb-2">
      <div className=" addFoodItem mx-3"style={{marginTop:"75px"}}>
        <form className="bg-white rounded shadow py-3 border border-dark "  action="/addItem" method="post" encType="multipart/form-data" onSubmit={handleAddItem}>
          
          <h4 className="text-center">ADD FOOD ITEM</h4>
          <div className="row">
            <div className="itemDetails col-12 col-md-6">
              <div className="box d-flex flex-column align-items-center justify-content-center px-3 h-100" style={{ width: "100%" }}>
                <div className="col-12 mb-2">
                  <label htmlFor="item-name" className="form-label">Food-item Name</label>
                  <input type="text" className="form-control border-dark" id="item-name" onChange={(e) => setItemName(e.target.value)} />
                </div>

                <div className="col-12 mb-2">
                  <label htmlFor="food-category" className="form-label">Select Category</label>
                  <select id="food-category" className="form-select border-dark" onChange={(e) => setCategory(e.target.value)}>
                    <option  value="choose" >Choose Category</option>
                    <option value="Starters">Starters</option>
                    <option value="Main Course">Main Course</option>
                    <option value="Deserts & Drinks">Deserts & Drinks</option>
                  </select>
                </div>

                <div className="col-12 mb-2">
                  <label htmlFor="food-subCategory" className="form-label">Select Sub-Category</label>
                  <select id="food-subCategory" className="form-select border-dark" onChange={(e) => setSubCategory(e.target.value)}>
                    <option  value="choose" >Choose Sub-Category</option>
                    <option value="Curry">Curry</option>
                    <option value="Bread">Bread</option>
                    <option value="Rice">Rice</option>
                    <option value="Deserts">Deserts</option>
                    <option value="Drinks">Drinks</option>
                    <option value="None">None</option>
                  </select>
                </div>



                <div className="col-12 mb-2">
                  <label htmlFor="item-price" className="form-label">Original Price</label>
                  <input type="number" className="form-control border-dark" id="item-price" onChange={(e) => setOriginalPrice(e.target.value)} />
                </div>
                <div className="col-12 mb-2">
                  <label htmlFor="description-1" className="form-label">Description 1</label>
                  <input type="text" className="form-control border-dark" id="description-1" onChange={(e) => setDescription1(e.target.value)} />
                </div>
                <div className="col-12 mb-2">
                  <label htmlFor="description-2" className="form-label">Description 2</label>
                  <input type="text" className="form-control border-dark" id="description-2" onChange={(e) => setDescription2(e.target.value)} />
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6">
              <div className="add-image mt-5">
                <div className="box d-flex flex-column align-items-center justify-content-center h-100" style={{ width: "100%" }}>
                  <input type="file"  id="addImage" className="d-none" onChange={handleFileChange} />
                  <div className="banner-image shadow d-flex align-items-center justify-content-center bg-success text-light mt-2 rounded" style={{ height: "260px", width: "300px", overflow: "hidden", cursor: "pointer" }} onClick={handleClick}>
                    {selectedImage ? (
                      <img src={selectedImage} alt="Banner" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                      <h4>Add Image</h4>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 d-flex justify-content-center mt-4">
            <button type="submit" className="btn btn-primary">Add Item</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddFoodItem;
