import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BaseUrl } from '../config/Base_Url';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddCategory() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [categoryImage, setCategoryImage] = useState(null);
  const [categoryName, setCategoryName] = useState("");

  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleCategory = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', categoryName);
    formData.append('categoryImage', categoryImage);

    try {
      const res = await axios.post(`${BaseUrl}/api/product/addCategory`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      toast.success('Category added successfully');
      navigate("/viewCategory");
    } catch (err) {
      console.error('Error adding category:', err);
      toast.error('Cannot add category', err.response?.data?.message || err.message);
    }
  }

  const handleClick = () => {
    document.getElementById('addCategory').click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setCategoryImage(file);
    }
  };

  useEffect(()=>{
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  },[])

  return (
    <div className="categoryPage d-flex align-items-center justify-content-center vh-100">
      <div className="add-category mt-5">
        <form onSubmit={handleCategory}>
          <div className="box shadow border border-success d-flex flex-column align-items-center justify-content-center rounded bg-light p-4" >
            <input 
              type="file" 
              id="addCategory" 
              required 
              className='d-none' 
              onChange={handleFileChange} 
            />
            <div 
              className="category-image shadow d-flex align-items-center justify-content-center bg-success text-light rounded" 
              style={{ height: "220px", width: "300px", overflow: "hidden", cursor: "pointer" }}
              onClick={handleClick}
            >
              {selectedImage ? (
                <img src={selectedImage} alt="Category" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <h4>Add Category</h4>
              )}
            </div>
            <div className="form-floating shadow border border-success my-5">
              <textarea 
                className="form-control" 
                placeholder="Leave a comment here" 
                id="floatingTextarea2" 
                style={{ height: "100px", width: "300px" }} 
                onChange={(e) => setCategoryName(e.target.value)} 
              />
              <label htmlFor="floatingTextarea2" className='text-success'>Category Name</label>
            </div>
            <button type="submit" className="w-25 btn btn-outline-success">ADD</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCategory;
