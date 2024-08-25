import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BaseUrl } from '../config/Base_Url';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ViewBanners() {
  const [allBanners, setAllBanners] = useState([]);

  axios.defaults.withCredentials = true;

  const handleAllBanners = () => {
    axios.get(`${BaseUrl}/api/product/viewBanners`)
      .then((res) => {
        setAllBanners(res.data);
      })
      .catch((err) => {
        console.log('Error:', err.message);
      });
  }

  useEffect(() => {
    handleAllBanners();
  }, []);

  const handleDelBanner =async (bannerId) =>{
    await axios.delete(`${BaseUrl}/api/product/delBanner/${bannerId}`)
    .then ((res)=>{
      setAllBanners(prevData => prevData.filter(banner => banner._id !== bannerId))
      toast.success('Banner deleted', res);
    })
    .catch((err) => {
      toast.error('Cannot delete banner', err.message);
    });
  }

  useEffect(()=>{
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  },[])

  return (
    <div className="viewBannerPage mb-3">
      <div className="bannerTable d-flex flex-column align-items-center me-2 rounded-3 border border-dark shadow" style={{ marginTop: "75px" }}>
        <h3 className='text-primary'>BANNERS LIST</h3>
        <div style={{ overflowX: 'auto', width: '100%' , overflowY: "auto", maxHeight: "100vh", scrollbarWidth:'none' }}>
        <table className="table table-striped ">
          <thead>
            <tr>
              <th scope="col">S.No.</th>
              <th scope="col">Banner Image</th>
              <th scope="col">Description</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allBanners.length > 0 ? (
              allBanners.map((banner, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td><img src={banner.bannerImage} alt="bannerImage" height={70} width={70} /></td>
                  <td>{banner.description}</td>
                  <td>
                    <button type="button" className="btn btn-outline-danger btn-sm" onClick={()=>handleDelBanner(banner._id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">No banners found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      </div>
    </div>
  );
}

export default ViewBanners;
