import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BaseUrl } from '../config/Base_Url';
import { NavLink, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Cart() {
  const[cartItems, setCartItems] = useState([]);  
  const[allAddresses, setAllAddresses] = useState([]);  
  const[name, setName] =useState('')
  const[phone, setPhone] =useState(0)
  const[pincode, setPincode] =useState(0)
  const[address, setAddress] =useState('')
  const[city, setCity] =useState('')
  const[state, setState] =useState('')
  const[saveAddressAs, setSaveAddressAs] =useState('')
  const[defaultAddress, setDefaultAddress] =useState(false)
  const[selectedAddress, setSelectedAddress] =useState(null)

  const navigate=useNavigate()


  axios.defaults.withCredentials = true;

  useEffect(() => {
    const handleCart = async () => {
      const token = localStorage.getItem("token");
  
      if (!token) {
        console.log('No token found');
        return;
      }
  
      try {
        const res = await axios.get(`${BaseUrl}/api/product/viewCart`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        setCartItems(res.data.map(item => ({
          ...item,
          price: item.quantity * item.originalPrice,
        })));
        // console.log('Cart Items added', res.data);
      } catch (err) {
        console.log('Cart Items cannot be added', err.message);
      }
    };
  
    handleCart();
  }, []);
  

  const updateCartItemQuantity = async (id, quantity, price) => {
    const token = localStorage.getItem("token");

    try {
      const res = await axios.patch(`${BaseUrl}/api/product/updateCart/${id}`, { quantity, price }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCartItems(prevCartItems =>
        prevCartItems.map(item =>
          item._id === id ? { ...item, ...res.data, price: res.data.quantity * res.data.originalPrice } : item
        )
      );
    } catch (err) {
      console.log('Error updating cart item quantity', err);
    }
  };

  const deleteCartItem = async(id)=>{
    const token = localStorage.getItem("token")

    try {
      const delItem= await axios.delete(`${BaseUrl}/api/product/deleteCart/${id}`,{
        headers: {
          Authorization : `Bearer ${token}`
        }
      })
      toast.success('Cart item is deleted',delItem);
      setCartItems(prevCartItems => prevCartItems.filter(item => item._id !== id));
    } catch (error) {
      toast.error('Cannot delete item from cart', error.message);
    }
  }

  const handleIncrement = (index) => {
    const newCartItems = [...cartItems];
    newCartItems[index].quantity += 1;
    newCartItems[index].price = newCartItems[index].quantity * newCartItems[index].originalPrice;
    setCartItems(newCartItems);
    updateCartItemQuantity(newCartItems[index]._id, newCartItems[index].quantity, newCartItems[index].price);
  };

  const handleDecrement = (index) => {
    const newCartItems = [...cartItems];
    if (newCartItems[index].quantity > 1) {
      newCartItems[index].quantity -= 1;
      newCartItems[index].price = newCartItems[index].quantity * newCartItems[index].originalPrice;
      setCartItems(newCartItems);
      updateCartItemQuantity(newCartItems[index]._id, newCartItems[index].quantity, newCartItems[index].price);
    }
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((acc, item) => acc + item.price, 0);
  };

  const deliveryFee = 90;
  const payableTotalPrice = () => {
    return calculateTotalPrice() + deliveryFee;
  };

  const handleDefaultAddress =(e)=>{
    setDefaultAddress(e.target.checked)
  }
 
  const validateField = (fieldName, value) => {
    const namePattern = /^[A-Za-z\s]{2,}$/;
    const phonePattern = /^[6-9]\d{9}$/;
    const pincodePattern = /^\d{6}$/;

    switch (fieldName) {
      case 'name':
        if (!value.trim()) {
          toast.error("Name is required.");
          return false;
        }else if (value.trimStart().length < value.length) {
          toast.error("Name cannot start with spaces.");
      } else if (value.trim().length < 2) {
          toast.error("Name should be at least 2 characters long");
      }  else if (!namePattern.test(value)) {
          toast.error("Name should be at least 2 characters long and contain only letters and spaces.");
          return false;
        }
        break;
      case 'phone':
        if (!value.trim()) {
          toast.error("Mobile Number is required.");
          return false;
        } else if (!phonePattern.test(value)) {
          toast.error("Valid Mobile Number is required (10 digits) & must starts with 6,7,8 or 9");
          return false;
        }
        break;
      case 'pincode':
        if (!value.trim()) {
          toast.error("Pin Code is required.");
          return false;
        } else if (!pincodePattern.test(value)) {
          toast.error("Valid Pin Code is required (6 digits).");
          return false;
        }
        break;
      case 'address':
        if (!value.trim()) {
          toast.error("Address is required.");
          return false;
        }
        break;
      case 'city':
        if (!value.trim()) {
          toast.error("City/District is required.");
          return false;
        }
        break;
      case 'state':
        if (!value.trim()) {
          toast.error("State is required.");
          return false;
        }
        break;
      case 'saveAddressAs':
        if (!value) {
          toast.error("Please select 'Save Address As' option.");
          return false;
        }
        break;
      default:
        return true;
    }
    return true;
  };

  const validateForm = () => {
    if (!name || !phone || !address || !pincode || !city || !state || !saveAddressAs ) {
      toast.error('Please fix the errors in the form. All fields are required.');
      return;
  }
    const fields = [
      { name: 'name', value: name },
      { name: 'phone', value: phone },
      { name: 'pincode', value: pincode },
      { name: 'address', value: address },
      { name: 'city', value: city },
      { name: 'state', value: state },
      { name: 'saveAddressAs', value: saveAddressAs },
    ];

    for (const field of fields) {
      if (!validateField(field.name, field.value)) {
        return false;
      }
    }

    return true;
  };

  const userAddress = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const addressData = {
      name: name.trim(),
      phone: phone.trim(),
      pincode: pincode.trim(),
      address: address.trim(),
      city: city.trim(),
      state: state.trim(),
      saveAddressAs,
      defaultAddress,
    };

    const token = localStorage.getItem("token");
    try {
        const res = await axios.post(`${BaseUrl}/api/user/userAddress`, addressData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
      toast.success('Address Added Successfully', res.data);
      setName('');
      setPhone('');
      setPincode('');
      setAddress('');
      setCity('');
      setState('');
      setSaveAddressAs('');
      setDefaultAddress(false);
        viewAddress();
    } catch (err) {
      toast.error('Cannot add address', err);
    }
}

const viewAddress = () => {
  const token = localStorage.getItem("token");
  axios.get(`${BaseUrl}/api/user/viewAddress`, {
      headers: {
          Authorization: `Bearer ${token}`
      }
  })
  .then(res => setAllAddresses(res.data))
  .catch(err => console.log('Cannot fetch all addresses:', err));
}
 
  useEffect(()=>{
    viewAddress()
  },[])

  const deleteAddress = async (addressId) => {
    const token = localStorage.getItem("token");
    try {
        const res = await axios.delete(`${BaseUrl}/api/user/deleteAddress/${addressId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        toast.success('Address is deleted!', res.data);
        viewAddress();
    } catch (err) {
        toast.error('Cannot delete address:', err);
    }
}

const addOrder = async ()=>{
  
  try {
  const token = localStorage.getItem("token");

  const orderTime = new Date();

 const orderData = {
  userId: selectedAddress.userId,
  orderItems: cartItems.map(item => ({
    productId: item.productId,
    name: item.name,
    quantity: item.quantity,
    itemPrice: item.price
  })),
  orderTotal: payableTotalPrice(),
  status: 'pending',
  address: `${selectedAddress.address}, ${selectedAddress.city}, ${selectedAddress.state} - ${selectedAddress.pincode}`,
  orderTime: orderTime,
  shippingInfo: {
    shippingCost: deliveryFee,
    expectedDeliveryDate: new Date(orderTime.getTime() + 30 * 60000)
  },
  deliveryTime: new Date(orderTime.getTime() + 30 * 60000)
};

  const res = await axios.post(`${BaseUrl}/api/product/addOrder`, orderData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  toast.success('Order added successfully', res.data);
  navigate('/confirmedOrder');
} 
 catch (err) {
  toast.error(' Cannot add order', err);
}
}

useEffect(()=>{
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
},[])

  return (
    <>
     <ToastContainer />
     
    <div className="cartPage min-vh-100  bg-success-subtle d-flex flex-column justify-content-center ">
      <div className="cartBox mt-5  " >

       <div className="cart-header d-inline-block py-2 px-3 mt-5">
          <h4>SECURE CHECKOUT</h4>
       </div>
        
        <div className="row m-4 ">
            <div className="col-12 col-md-7 d-flex flex-column gap-5 bg-light p-3 p-md-5 mb-5 mb-md-0 ">
              <div className="address-card">
              <div className="addressShow bg-light p-md-4 p-sm-4 py-3 px-2   border border-success d-flex justify-content-between rounded  ">
          <div className="addressContent">
            <p className="finalAddress px-md-2">
              Deliver to: <span className="fs-5">{selectedAddress ? selectedAddress.name : "Select an Address"}</span>
              <br />
              {selectedAddress ? ` ${selectedAddress.address}, ${selectedAddress.city}, ${selectedAddress.state} - ${selectedAddress.pincode} `: ""}
            </p>
          </div>
          <div className="changeButton">
            <button
              type="button"
              className="btn btn-outline-success rounded-pill"
              data-bs-toggle="modal"
              data-bs-target="#addressModal"
            >
              Change Address
            </button>
          </div>

          <div
            className="modal fade"
            id="addressModal"
            aria-hidden="true"
            aria-labelledby="exampleModalToggleLabel"
          >
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
              <div className="modal-content ">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="heading">
                    Select Delivery Address
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <div
                    id="savedAddress"
                    className="p-2 bg-secondary-subtle text-secondary d-flex justify-content-center"
                  >
                    <h4>SAVED ADDRESS</h4>
                  </div>

                  <div id="addressList" className="addressList ">
                    
                  {allAddresses.length > 0 ? (
                    allAddresses.map((add, index) =>(
                    <div key={index} className="address1  p-3 border border-secondary-subtle ">
                      <div className=" d-flex justify-content-between ">
                        <div className="form-check">
                          <input
                            className="form-check-input "
                            type="radio"
                            name="gridRadios"
                            id={`gridRadios${index}`}
                            checked ={selectedAddress && selectedAddress._id === add._id}
                            onChange={()=>setSelectedAddress(add)}
                          />
                        </div>
                        <div className="detailsShow">
                          <p className="name fs-5">
                            {add.name}{" "}
                            <span className="fs-6"> {add.defaultAddress && <span className="badge bg-primary ms-2">default</span>}</span>
                          </p>
                          <p className="add">
                            {add.address} <br />
                            {add.city},{add.state}- {add.pincode}
                          </p>
                          <p className="phone">
                            Mobile: <span className="fs-5">{add.phone}</span>{" "}
                          </p>
                        </div>
                        <span>
                          <p className="placeType border border-success rounded-pill px-2">
                            {add.saveAddressAs}
                          </p>
                        </span>
                      </div>
                      <div className="buttons d-flex justify-content-end">
                        <button type="button" className="btn btn-sm btn-outline-dark" onClick={()=>deleteAddress(add._id)}>
                          Delete
                        </button>
                      </div>
                    </div>
                      
                    ))
                  )
                  :
                  (<div className='d-flex justify-content-center align-items-center'>No address added !</div>)
                  }
                  </div>

                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-outline-success rounded-pill w-100"
                    data-bs-toggle="modal"
                    data-bs-target="#newAddressModal"
                  >
                    Add New Address
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div
            className="modal fade"
            id="newAddressModal"
            aria-hidden="true"
            aria-labelledby="exampleModalToggleLabel2"
          >
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="heading">
                    ADD NEW ADDRESS
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <form id="addressForm" >
                    <div className="contactDetails">
                      <h6 className="px-3 text-success">CONTACT DETAILS</h6>
                      <div className="col py-3">
                        <input
                          type="text"
                          className="form-control p-3"
                          placeholder="Name*"
                          aria-label="Name"
                          onChange={(e) => setName(e.target.value)}
                          onBlur={() => validateField('name', name)}
                        />
                      </div>
                      <div className="col">
                        <input
                          type="number"
                          className="form-control p-3"
                          placeholder="Mobile Number*"
                          aria-label="Mobile Number"
                          onChange={(e)=>setPhone(e.target.value)}
                          onBlur={() => validateField('phone', phone)}
                        />
                      </div>
                    </div>
                    <div className="addressDetails mt-4">
                      <h6 className="px-3 text-success">ADDRESS DETAILS</h6>
                      <div className="col py-3">
                        <input
                          type="text"
                          className="form-control p-3"
                          placeholder="Pin Code*"
                          onChange={(e)=>setPincode(e.target.value)}
                          onBlur={() => validateField('pincode', pincode)}
                        />
                      </div>
                      <div className="col">
                        <input
                          type="text"
                          className="form-control p-3"
                          placeholder="Address (House No., Building, Street, Area)*"
                          onChange={(e)=>setAddress(e.target.value)}
                          onBlur={() => validateField('address', address)}
                        />
                      </div>
                      <div className="row g-3 py-3">
                        <div className="col">
                          <input
                            type="text"
                            className="form-control p-2"
                            placeholder="City/District*"
                            onChange={(e)=>setCity(e.target.value)}
                            onBlur={() => validateField('city', city)}
                          />
                        </div>
                        <div className="col">
                          <input
                            type="text"
                            className="form-control p-2 "
                            placeholder="State*"
                            onChange={(e)=>setState(e.target.value)}
                            onBlur={() => validateField('state', state)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="placeTypeDetails mt-3">
                      <h6 className="px-3 text-success">SAVE ADDRESS AS</h6>
                      <div className="col py-3">
                        <select className="form-select " 
                        onChange={(e)=>setSaveAddressAs(e.target.value)}
                        onBlur={() => validateField('saveAddressAs', saveAddressAs)}>
                          <option value="Select">Select</option>
                          <option value="Home" className="text-success">
                            Home
                          </option>
                          <option value="Work" className="text-success">
                            Work
                          </option>
                        </select>
                      </div>
                      <div className="col">
                        <div className="form-check text-secondary mx-2 ">
                          <input
                            className="form-check-input "
                            type="radio"
                            id="flexRadioDefault1"
                            checked={defaultAddress}
                            onChange={handleDefaultAddress}
                          />
                          <label
                            className="form-check-label"
                           htmlFor="flexRadioDefault1"
                          >
                            Make This My Default Address .
                          </label>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="submit"
                    className="btn btn-success"
                    data-bs-toggle="modal"
                    data-bs-target="#addressModal"
                    onClick={userAddress}
                  >
                    ADD ADDRESS
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
              </div>

              <div className="Payment-card">
                <div className="bg-light border border-success rounded  p-4">
                    <h4>Choose Payment Method</h4>

{/* payment details modal */}

<div className="d-grid mt-4">
<button type="button" className="btn btn-success fs-5 p-2" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
   PROCEED TO PAY
</button>
</div>

<div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false"tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="staticBackdropLabel">PAYMENT OPTIONS</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        ...
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary" onClick={addOrder}>Place Order</button>
      </div>
    </div>
  </div>
</div>


                </div>
                <NavLink to='/menu'> <button type="button" className='btn btn-sm btn-outline-primary mt-3'>CONTINUE ORDERING</button> </NavLink>
              </div>
            </div>

            <div className="col-12 col-md-5  bg-light "  >
                <div className="items-list px- mt-2" style={{ overflowY: "auto", maxHeight: "400px",scrollbarWidth:'none' }}>
               
                  <h3 className=' text-success'>CART</h3>
                  <hr className='mb-' />
                  {
                    cartItems.length > 0 ? (
                      <>
                      {cartItems.map((cart,index)=>(
                  <div key={index} className="show-item  border-bottom border-success-subtle mb-3  pb-2">
                    <div className="row">
                    <div className="col-3">
                    <h6>{cart.name}</h6>
                    </div>

                    <div className="col-3">
                    <div className="counter text-success fw-bold border border-success rounded  d-flex justify-content-evenly " style={{width:"70px"}}>
                      <span className='me-1'style={{cursor:"pointer"}} onClick={()=>handleDecrement(index)}>-</span>

                      <span>{cart.quantity}</span>

                      <span style={{cursor:"pointer"}} onClick={()=>handleIncrement(index)}>+</span>
                    </div>
                    </div>

                    <div className="col-3">
                    <div className="item-price fw-bold">
                    ₹ {cart.price}
                    </div>
                    </div>

                    <div className="col-3">
                    <div className="item-delete fw-bold" style={{cursor:"pointer"}}>
                    <i className="fa-solid fa-delete-left text-success fs-4" onClick={()=>deleteCartItem(cart._id)}></i>
                    </div>
                    </div>

                  </div>
                  </div>

                      ))}

                  <div className="d-grid">
                  <button className="btn btn-outline-secondary " style={{border:"2px dotted grey"}}  type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">
                  <i className="fa-solid fa-circle-check me-2"></i> <span > Apply Coupon </span>
                  </button>
                  </div>

<div className="offcanvas offcanvas-start" data-bs-scroll="true"tabIndex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
  <div className="offcanvas-header">
    <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">COUPONS</h5>
    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div className="offcanvas-body">
    <p>No Coupons Available !</p>
  </div>
</div>

<hr />

<div className="bill-details ">
  <h6>BILL DETAILS</h6>
  <div className="row border-bottom border-2 border-success">
    <div className="col-8 ">
     <p>Total </p>
     <p>Delivery Fee </p>
    </div>
    <div className="col-4">
      <p>₹ {calculateTotalPrice()}</p>
      <p>₹ {deliveryFee} </p>
    </div>
  </div>

  <div className="row fw-bold mt-3">
  <div className="col-8 ">
     <p>To Pay </p>
    </div>
    <div className="col-4">
      <p>₹ {payableTotalPrice()}</p>
    </div>
  </div>
</div>
</>
) : (
  <h5 className="show-item text-center">
    Cart is Empty !!!
  </h5>
)}
                </div>
            </div>
        </div>
      </div>
    </div>

    </>
  )
}

export default Cart 