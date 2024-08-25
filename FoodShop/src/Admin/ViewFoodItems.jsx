import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BaseUrl } from '../config/Base_Url';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from 'react-toastify';

function ViewFoodItems() {
  const [foodItemList, setFoodItemList] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    subCategory: '',
    originalPrice: '',
    description1: '',
    description2: '',
  });

  axios.defaults.withCredentials = true;

  const handleAllItems = () => {
    axios.get(`${BaseUrl}/api/product/viewItems`)
      .then((res) => {
        setFoodItemList(res.data);
      })
      .catch((err) => {
        console.log('Error :', err.message);
      });
  };

  const handleDelete = async (itemId) => {
    try {
      await axios.delete(`${BaseUrl}/api/product/deleteItem/${itemId}`);
      setFoodItemList(prevData => prevData.filter(item => item._id !== itemId));
      toast.success("Item is Deleted successfully")
    } catch (error) {
      toast.error('Item cannot be deleted');
    }
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setFormData({
      name: item.name,
      category: item.category,
      subCategory: item.subCategory,
      originalPrice: item.originalPrice,
      description1: item.description1,
      description2: item.description2,
    });
  };

  const handleSave = async () => {
    try {
      const updateData = new FormData();
      updateData.append('name', formData.name);
      updateData.append('category', formData.category);
      updateData.append('subCategory', formData.subCategory);
      updateData.append('originalPrice', formData.originalPrice);
      updateData.append('description1', formData.description1);
      updateData.append('description2', formData.description2);
      if (selectedFile) {
        updateData.append('itemImage', selectedFile);
      }

      const response = await axios.put(`${BaseUrl}/api/product/updateItem/${editItem._id}`, updateData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setFoodItemList(prevData => prevData.map(item => item._id === editItem._id ? response.data.updateItem : item));
      setEditItem(null);
      toast.success("Item is updated successfully")
    } catch (error) {
      toast.error("Item cannot be updated");
    }
  };

  useEffect(() => {
    handleAllItems();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  useEffect(()=>{
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  },[])

  return (
    <>
      <div className="FoodItemsPage mb-3">
        <div className="itemsTable rounded-3 shadow border border-secondary d-flex flex-column align-items-center me-2" style={{ marginTop: "75px"}}>
          <h4 className='text-primary'>FOOD-ITEMS LIST</h4>
          <div style={{ overflowX: 'auto', width: '100%' , overflowY: "auto", maxHeight: "100vh", scrollbarWidth:'none' }}>
          <table className="table table-striped" >
          <thead>
          <tr>
          <th scope="col">S.No.</th>
          <th scope="col">Food-Item-Image</th>
          <th scope="col">Name</th>
          <th scope="col">Category</th>
          <th scope="col">Sub-Category</th>
          <th scope="col">Original Price (₹)</th>
          <th scope="col">Desc-1</th>
          <th scope="col">Desc-2</th>
          <th scope="col">Actions</th>
         </tr>
         </thead>
            <tbody>
              {foodItemList.length > 0 ? (
                foodItemList.map((item, index) => (
                  <tr key={item._id}>
                    <th scope="row">{index + 1}</th>
                    <td><img src={item.image_url} alt="itemImage" height={70} width={70} /></td>
                    <td>{item.name}</td>
                    <td>{item.category}</td>
                    <td>{item.subCategory}</td>
                    <td>{item.originalPrice}</td>
                    <td>{item.description1}</td>
                    <td>{item.description2}</td>
                    <td>
                      <div className="buttons d-flex gap-2">
                        <button type="button" className="btn btn-outline-success btn-sm" onClick={() => handleEdit(item)}>Edit</button>
                        <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(item._id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className='text-center'>No Products Found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        </div>

        {editItem && (
          <div className="modal show fade mt-5 ms-5" id="editModal" tabIndex="-1" style={{ display: 'block', height: "90%", width: '80%' }} role="dialog" aria-labelledby="editModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable " >
              <div className="modal-content shadow bg-secondary-subtle">
                <div className="modal-header">
                  <h5 className="modal-title" id="editModalLabel">Edit Item</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setEditItem(null)}></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                    <div className="form-group fw-bold mb-3">
                      <label>Name</label>
                      <input type="text" className="form-control border-dark" name="name" value={formData.name} onChange={handleChange} />
                    </div>
                    <div className="form-group fw-bold mb-3">
                      <label>Category</label>
                      <input type="text" className="form-control border-dark" name="category" value={formData.category} onChange={handleChange} />
                    </div>
                    <div className="form-group fw-bold mb-3">
                      <label>Sub-Category</label>
                      <input type="text" className="form-control border-dark" name="subCategory" value={formData.subCategory} onChange={handleChange} />
                    </div>
                    <div className="form-group fw-bold mb-3">
                      <label>Original Price (₹)</label>
                      <input type="number" className="form-control border-dark" name="originalPrice" value={formData.originalPrice} onChange={handleChange} />
                    </div>
                    <div className="form-group fw-bold mb-3">
                      <label>Desc-1</label>
                      <input type="text" className="form-control border-dark" name="description1" value={formData.description1} onChange={handleChange} />
                    </div>
                    <div className="form-group fw-bold mb-3">
                      <label>Desc-2</label>
                      <input type="text" className="form-control border-dark" name="description2" value={formData.description2} onChange={handleChange} />
                    </div>
                    <div className="form-group fw-bold mb-3">
                      <label>Image</label>
                      <input type="file" name='itemImage' className="form-control border-dark" onChange={handleFileChange} />
                    </div>
                    <button type="submit" className="btn btn-outline-primary me-3">Save</button>
                    <button type="button" className="btn btn-outline-secondary" onClick={() => setEditItem(null)}>Cancel</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ViewFoodItems;

