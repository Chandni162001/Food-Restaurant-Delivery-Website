import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BaseUrl } from '../config/Base_Url';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddBanner() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [bannerImage, setBannerImage] = useState(null);
  const [description, setDescription] = useState("");

  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleBanner = async (event) => {
    event.preventDefault();
    const formData={description,bannerImage}

    try {
      const res = await axios.post(`${BaseUrl}/api/product/addBanner`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      toast.success(' Banner Added', res.data);
      
      navigate("/viewBanner");
    } catch (err) {
      toast.error('Cannot add banner', err);
    }
  }

  const handleClick = () => {
    document.getElementById('addBanner').click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setBannerImage(file);
    }
  };

  useEffect(()=>{
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  },[])

  return (
    <div className="bannerPage d-flex align-items-center justify-content-center vh-100">
      <div className="add-banner mt-5 ">
      <form action="/addBanner" method="post" encType="multipart/form-data" onSubmit={handleBanner}>
          <div className="box shadow border border-success d-flex flex-column align-items-center justify-content-center rounded bg-light p-4" >
            <input 
              type="file" 
              id="addBanner" 
              required 
              className='d-none' 
              onChange={handleFileChange} 
            />
            <div 
              className="banner-image shadow d-flex align-items-center justify-content-center bg-success text-light rounded" 
              style={{ height: "220px", width: "300px", overflow: "hidden", cursor: "pointer" }}
              onClick={handleClick}
            >
              {selectedImage ? (
                <img src={selectedImage} alt="Banner" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <h4>Add Banner</h4>
              )}
            </div>
            <div className="form-floating shadow border border-success my-5">
              <textarea 
                className="form-control" 
                placeholder="Leave a comment here" 
                id="floatingTextarea2" 
                style={{ height: "100px", width: "300px" }} 
                onChange={(e) => setDescription(e.target.value)} 
              />
              <label htmlFor="floatingTextarea2" className='text-success'>Description</label>
            </div>
            <button type="submit" className="w-25 btn btn-outline-success">ADD</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddBanner;
