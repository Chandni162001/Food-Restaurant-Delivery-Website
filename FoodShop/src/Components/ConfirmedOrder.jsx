import React, { useEffect } from 'react';
import gif from '../assets/Delivery (1).gif';
import tick from '../assets/tick.png';
import { NavLink } from 'react-router-dom';

function ConfirmedOrder() {
  useEffect(()=>{
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  },[])
  return (
    <div className="text-center container">
      <img src={gif} alt="gif" className="img-fluid mt-5" style={{maxHeight: '500px', maxWidth: '100%'}} />
      <h3 className="mt-4">YOUR ORDER IS SUCCESSFULLY PLACED !! <img src={tick} alt="tick" height={50} width={50} /></h3>
      <div className="d-flex flex-column flex-md-row justify-content-evenly my-4">
        <NavLink to='/menu'>
          <button type="button" className='btn btn-outline-primary mb-3 mb-md-0'>CONTINUE ORDERING</button>
        </NavLink>
        <NavLink to='/order'>
          <button type="button" className='btn btn-outline-primary'>ORDERS</button>
        </NavLink>
      </div>
    </div>
  );
}

export default ConfirmedOrder;
