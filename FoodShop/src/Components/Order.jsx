
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BaseUrl } from '../config/Base_Url';
import { NavLink } from 'react-router-dom';

function Order() {
  const [orders, setOrders] = useState([]);

  const viewOrders = async () => {
    try {
      const token = localStorage.getItem('token'); 
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      const response = await axios.get(`${BaseUrl}/api/product/viewOrders`, config);
      setOrders(response.data);
    } catch (err) {
      console.log('Failed to show orders', err);
    }
  };

  useEffect(() => {
    viewOrders();
  }, []);

  const handleCancelOrder = async (orderId)=>{
    try{
      const response = await axios.put(`${BaseUrl}/api/product/cancelOrder/${orderId}`);
      const updatedOrder = response.data.order;
      setOrders(prevOrders => prevOrders.map(order => order._id === orderId ? updatedOrder : order));
    }
    catch (err) {
        console.log('Failed to cancel order', err);
      }
}

useEffect(()=>{
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
},[])

  return (


<div className="OrderPage  min-vh-100" style={{backgroundColor:"#37718E"}}>
<div className=" mx-2 ">
<h2 className='order-header d-inline-block py-2 px-3 rounded' style={{marginTop:"85px"}}>Your Orders</h2>
<div className="table-responsive rounded my-3">
  <div style={{ overflowX: 'auto', width: '100%' , overflowY: "auto", maxHeight: "100vh", scrollbarWidth:'none' }}>
  <table className="table table-striped table-hover ">
    <thead>
      <tr>
        <th>#</th>
        <th>Order ID</th>
        <th scope="col">Shipping</th>
        <th>Order Total</th>
        <th>Status</th>
        <th>Address</th>
        <th>Order Time</th>
        <th>Expected Delivery</th>
        <th>Actions</th>
      </tr>
    </thead>
    
    <tbody >
      {orders.length > 0 ? (
        orders.map((order, index) => (
          <React.Fragment key={index}>
            <tr className={order.status === 'cancelled' ? 'disabled-row' : ''}>
              <th>{index + 1}</th>
              <td>{order._id}</td>
              <td className='text-center'>
                  {order.shippingInfo.shippingCost}
              </td>
              <th>{order.orderTotal}</th>
              <th className={order.status==='cancelled'?'text-danger':'text-dark'}>{order.status}</th>
              <td>{order.address}</td>
              <td>{new Date(order.orderTime).toLocaleString()}</td>
              <td>{new Date(order.shippingInfo.expectedDeliveryDate).toLocaleString()}</td>
              <td>
                    <button type="button" className="btn btn-outline-danger btn-sm " onClick={()=>handleCancelOrder(order._id)} disabled={order.status === 'cancelled'}> Cancel Order </button>
              </td>
            </tr>
            <tr>
              <td colSpan="9">
                <div className="table-responsive table-items mx-3 rounded border  ">
                  <table className="table">
                    <thead>
                      <tr >
                        <th>#</th>
                        <th>Items</th>
                        <th>Price</th>
                        <th>Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.orderItems.map((item, itemIndex) => (
                        <tr key={itemIndex} className={order.status === 'cancelled' ? 'disabled-row' : ''}>
                          <th>{itemIndex+1}</th>
                          <td>{item.name}</td>
                          <td>{item.itemPrice}</td>
                          <td>{item.quantity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
          </React.Fragment>
        ))
      ) : (
        <tr>
          <td colSpan="9">No orders found.</td>
        </tr>
      )}
    </tbody>
  </table>
    </div>
</div>
</div>
</div>
);
}

export default Order;
