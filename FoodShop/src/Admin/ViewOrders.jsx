import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BaseUrl } from '../config/Base_Url';

function ViewOrders() {
    const [orders, setOrders] = useState([]);

    const viewOrders = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/api/product/getAllOrders`);
        setOrders(response.data);
      } catch (err) {
        console.log('Failed to show orders', err);
      }
    };
  
    useEffect(() => {
      viewOrders();
    }, []);

    useEffect(()=>{
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    },[])
    
  return (
    <div className="viewOrderPage mb-3">
      <div className="ordersTable d-flex flex-column align-items-center me-1 rounded-3 border border-dark shadow" style={{ marginTop: "75px" }}>
        <h3 className='text-primary'>ORDERS LIST</h3>
        <div style={{ overflowX: 'auto', width: '100%' , overflowY: "auto", maxHeight: "100vh", scrollbarWidth:'none' }}>
        <table className="table table-striped ">
          <thead>
            <tr>
              <th scope="col">S.No.</th>
              <th scope="col">Order-Id</th>
              <th scope="col">User-Id</th>
              <th scope="col">Order Items</th>
              <th scope="col">Quantity</th>
              <th scope="col">Price</th>
              <th scope="col">Shipping</th>
              <th scope="col">Total</th>
              <th scope="col">Status</th>
              <th scope="col">Address</th>
              {/* <th scope="col">Actions</th> */}
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order, index) => (
                <tr key={index}>
                <th scope="row">{index + 1}.</th>
                <td>{order._id}</td>
                <td>{order.userId}</td>
                <td>
                  {order.orderItems.map((item, idx) => (
                    <div key={idx}>
                      {item.name} (Qty: {item.quantity})
                    </div>
                  ))}
                </td>
                <th scope="row" className='text-center'>{order.orderItems.reduce((total, item) => total + item.quantity, 0)}</th>
                <td>
                  {order.orderItems.map((item, idx) => (
                    <div key={idx}>
                      {item.name} - (Price: {item.itemPrice})
                    </div>
                  ))}
                </td>
                <td>
                  Shipping Cost : {order.shippingInfo.shippingCost} , <br /> Expected Delivery : {new Date(order.shippingInfo.expectedDeliveryDate).toLocaleDateString()}
                </td>
                <th>{order.orderTotal}</th>
                <td className={order.status==='cancelled'?'text-danger fw-bold':'text-dark'}>{order.status}</td>
                <td>{order.address}</td>
                {/* <td>
                  <button type="button" className="btn btn-outline-danger btn-sm " onClick={()=>handleCancelOrder(order._id)}>Cancel Order</button>
                </td> */}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="11" className="text-center">No orders found</td>
            </tr>
          )}
          </tbody>
        </table>
        </div>
      </div>
     
    </div>
  )
}

export default ViewOrders