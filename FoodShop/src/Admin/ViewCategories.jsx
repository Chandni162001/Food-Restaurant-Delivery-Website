import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BaseUrl } from '../config/Base_Url';
import { toast } from 'react-toastify';

function ViewCategories() {
    const[category, setCategory]= useState([]);
  
  const handleCategories= async ()=>{
    try{
      const response= await axios.get(`${BaseUrl}/api/product/viewCategories`)
      setCategory(response.data)
    }
    catch (err) {
      console.error('Error in fetching categories:',err);
    }
  }

  useEffect(()=>{
    handleCategories()
}, [])

useEffect(()=>{
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
},[])

const handleDelCategory = async (categoryId) => {
    try {
      await axios.delete(`${BaseUrl}/api/product/delCategories/${categoryId}`);
      setCategory(prevData => prevData.filter(category => category._id !== categoryId));
      handleCategories()
      toast.success("Category deleted successfully")
    } catch (error) {
      toast.error('Cannot delete category', error.message);
    }
  };
  

  return (
    <>
    <div className="viewCategoriesPage mb-3">
      <div className="categoriesTable d-flex flex-column align-items-center me-2 rounded-3 border border-dark shadow" style={{ marginTop: "75px" , overflowY: "auto", maxHeight: "100vh",scrollbarWidth:'none' }}>
        <h3 className='text-primary'>CATEGORIES LIST</h3>
        <table className="table table-striped ">
          <thead>
            <tr>
              <th scope="col">S.No.</th>
              <th scope="col">Category Image</th>
              <th scope="col">Category Name</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {category.length > 0 ? (
              category.map((category, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td><img src={category.image_url} alt="bannerImage" height={70} width={70} /></td>
                  <td>{category.name}</td>
                  <td>
                    <button type="button" className="btn btn-outline-danger btn-sm" onClick={()=>handleDelCategory(category._id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">No categories found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
     
    </div>

    </>
  )
}

export default ViewCategories