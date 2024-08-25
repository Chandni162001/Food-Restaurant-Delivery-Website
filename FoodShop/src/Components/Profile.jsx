import React, { useEffect, useState } from 'react';
import { BaseUrl } from '../config/Base_Url';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState({ name: '', email: '', phone: '' });
  const [orders, setOrders] = useState([]);

  const handleProfile = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      try {
        const userResponse = await axios.get(`${BaseUrl}/api/user/profile`, config);
        setUser(userResponse.data);
        const ordersResponse = await axios.get(`${BaseUrl}/api/product/viewOrders`, config);
        console.log('Orders response:', ordersResponse.data);
        setOrders(ordersResponse.data);
      } catch (err) {
        console.error('Error in fetching profile information:', err);
      }
    }
  };

  useEffect(() => {
    handleProfile();
  }, []);

  useEffect(()=>{
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  },[])

  return (
    <div className="profilePage min-vh-100" style={{ backgroundColor: "#37718E" }}>
      <div className="container">
        <div className="row">
          <div className="col-md-12 d-flex justify-content-between mt-5 text-white">
            <div className="profile-detail mt-5">
              <h3>{user.name}</h3>
              <h6>{user.email} , {user.phone} </h6>
            </div>

            <div className="editProfile-btn mt-5">
              <button className="btn btn-outline-light" type="button" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop">
                Your Profile
              </button>
            </div>

            <div className="offcanvas offcanvas-end" data-bs-backdrop="static"tabIndex="-1" id="staticBackdrop" aria-labelledby="staticBackdropLabel">
              <div className="offcanvas-header">
                <h5 className="offcanvas-title text-secondary" id="staticBackdropLabel">Edit Profile</h5>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
              </div>
              <div className="offcanvas-body mt-4">
                <div className="nameDetail border-bottom mb-4">
                  <h5 className='mb-4' style={{ color: "#37718E" }}>
                    Name :
                  </h5>
                  <div className='d-flex justify-content-between mb-4'>
                    <h6>{user.name}</h6>
                    {/* <button className="btn btn-sm btn-outline-dark">CHANGE</button> */}
                  </div>
                </div>

                <div className="emailDetail border-bottom mb-4">
                  <h5 className='mb-4' style={{ color: "#37718E" }}>
                    E-mail :
                  </h5>
                  <div className='d-flex justify-content-between mb-4'>
                    <h6>{user.email}</h6>
                    {/* <button className="btn btn-sm btn-outline-dark">CHANGE</button> */}
                  </div>
                </div>

                <div className="phoneDetail border-bottom mb-4">
                  <h5 className='mb-4' style={{ color: "#37718E" }}>
                    Phone :
                  </h5>
                  <div className='d-flex justify-content-between mb-4'>
                    <h6>{user.phone}</h6>
                    {/* <button className="btn btn-sm btn-outline-dark">CHANGE</button> */}
                  </div>
                </div>

              </div>
            </div>
          </div>

          <div className="col-md-12 my-5">
            <div className="card">
              <div className="card-header">
                <div>
                  <h5>Orders</h5>
                </div>
              </div>
              <div style={{ overflowX: 'auto', width: '100%' , overflowY: "auto", maxHeight: "100vh", scrollbarWidth:'none' }}>
              <div className="card-body">
                {orders.length > 0 ? (
                  orders.map((orderItem, index) => (
                    <div key={index} className="order mt-3">
                      <div className='d-flex justify-content-between'>
                        <p>ORDER #{orderItem._id} | OrderTime: {new Date(orderItem.orderTime).toLocaleString()}</p>
                        <p>{orderItem.orderItems.map((item) => (
                          ` ${item.name} * ${item.quantity}`
                        )).join(', ')}</p>
                      </div>
                      <div className='d-flex justify-content-between'>
                        <p className={orderItem.status === 'cancelled' ? 'text-danger fw-bold':'text-dark'}>{orderItem.status === 'cancelled' ? 'Status: Cancelled' : `Delivered on ${orderItem.deliveryTime ? new Date(orderItem.deliveryTime).toLocaleString() : 'N/A'}`}</p>
                        <p>Total Paid: ₹ {orderItem.orderTotal}</p>
                      </div>
                      <hr />
                    </div>
                  ))
                ) : (
                  <p>No orders found.</p>
                )}
              </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;
