import React, { useEffect } from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'
import AdminDashboard from './AdminDashboard'
import AddFoodItem from './AddFoodItem'
import AddBanner from './AddBanner'
import ViewBanners from './ViewBanners'
import ViewFoodItems from './ViewFoodItems'
import ManageCustomers from './ManageCustomers'
import ViewOrders from './ViewOrders'
import ViewCategories from './ViewCategories'
import AddCategory from './AddCategory'
import ViewInquiries from './ViewInquiries'
import ViewBookTableForms from './ViewBookTableForms'


function AdminPanel() {
  useEffect(()=>{
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  },[])
  return (
    <>
    {/* <AdminNavbar/> */}
      <div className="adminPage ">
        <div className="row ">
          <div className="admin-categories col-12 col-sm-3 col-md-2 d-flex flex-column align-items- justify-content- bg-dark min-vh-100 " >
            {/* <div className="admin-profile d-flex gap-4 mt-5 p-1">
              <img src={myImage} alt="admin-image" height="80px" width="80px" style={{ borderRadius: "50%", boxShadow: "0 0 5px white" }} />
              <span className='text-white d-flex align-items-center justify-content-center'>Chandni Sodani <br /> (Admin)</span>
            </div> */}
            <div style={{marginTop:"100px"}}>
            <div className="adminHeading mb-5 fw-bold  ps-1 border rounded-end-pill me-auto">
              <NavLink to='/dashboard' className="text-decoration-none text-dark">
                <h4>ADMIN DASHBOARD</h4>
              </NavLink>
            </div>
            <div className="category-buttons mt-4 d-flex flex-column gap-4  px-2">
              <button className="btn btn-outline-light w-100">Analytics</button>
              <div className="dropdown">
                <button className="btn btn-outline-light w-100 dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Menus
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <NavLink className="dropdown-item" to="/addCategory">Add Menu Category</NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/viewCategory">Menu Catalogue</NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/add">Add Food Item</NavLink>
                  </li>
                  <li><NavLink className="dropdown-item" to="/viewItem">View Food Items</NavLink></li>
                </ul>
              </div>
              <div className="dropdown">
                <button className="btn btn-outline-light w-100 dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Banner
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <NavLink className="dropdown-item" to="/banner">Add Banner</NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/viewBanner">View Banners</NavLink>
                  </li>
                </ul>
              </div>

              <NavLink to="/customers">
              <button className="btn btn-outline-light w-100">
                Manage Customers
              </button>
              </NavLink>

              <NavLink to="/orders">
              <button className="btn btn-outline-light w-100">
                Manage Orders
              </button>
              </NavLink>

              <div className="dropdown">
                <button className="btn btn-outline-light w-100 dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Forms
                </button>
                <ul className="dropdown-menu ">
                  <li>
                    <NavLink className="dropdown-item drop-hover text-decoration-none" to="/viewInquiries" > FeedBacks & Inquiries</NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item drop-hover text-decoration-none" to="/viewBookTableForms">Book Table Forms</NavLink>
                  </li>
                </ul>
              </div>
              
            </div>
          </div>
          </div>
          <div className="col-12 col-md-10 col-sm-9 bg-secondary-subtle">
            <Routes>
              <Route path='/dashboard' element={<AdminDashboard />}></Route>
              <Route path='/add' element={<AddFoodItem />}></Route>
              <Route path='/banner' element={<AddBanner />}></Route>
              <Route path='/viewBanner' element={<ViewBanners />}></Route>
              <Route path='/viewItem' element={<ViewFoodItems />}></Route>
              <Route path='/customers' element={<ManageCustomers/>}></Route>
              <Route path='/orders' element={<ViewOrders/>}></Route>
              <Route path='/addCategory' element={<AddCategory/>}></Route>
              <Route path='/viewCategory' element={<ViewCategories/>}></Route>
              <Route path='/viewInquiries' element={<ViewInquiries/>}></Route>
              <Route path='/viewBookTableForms' element={<ViewBookTableForms/>}></Route>
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminPanel;
