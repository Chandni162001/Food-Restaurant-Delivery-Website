import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { CartContext } from './CartProvider';
import { NavLink, useNavigate } from "react-router-dom";
import { BaseUrl } from "../config/Base_Url";
import Cart from "../assets/grocery-cart (4).png"
import moon from'../assets/thin-moon.png'
import { toast } from "react-toastify";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { cartLength } = useContext(CartContext) || { cartLength: 0 };

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navigate = useNavigate();

  const handleLogout = () => {
    axios.get(`${BaseUrl}/logout`);
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/");
    window.location.reload();
    toast.success("LogOut successfully !!")
  };

  const isAuthenticated = localStorage.getItem("token");

  const handleCartPage=()=>{
    navigate("/cart")
  }

  return (
    <>
      <div>
        <nav
          className={`navbar navbar-expand-lg fixed-top ${
            scrolled ? "bg-change" : "bg-color"
          }`}
        >
          <div className="container-fluid px-4 ">
            <NavLink
              to="/"
              className="navbar-brand text-decoration-none text-light"
            >
              <div className="brandDetail d-flex" >

<img src={moon} alt="moon" height={40} width={40} style={{marginTop:"2%" ,filter:"drop-shadow(0 0 30px white)"}} />

<div className="logo " >
   <h2 className='text-light'datatext ='MoonDine' style={{ letterSpacing:"2px"}}> MoonDine </h2>
   </div>
   </div>
            </NavLink>

            <button
              className="navbar-toggler text-light"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasNavbar"
              aria-controls="offcanvasNavbar"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="offcanvas offcanvas-end text-bg-dark "
             tabIndex="-1"
              id="offcanvasNavbar"
              aria-labelledby="offcanvasNavbarLabel"
            >
              <div className="offcanvas-header ">
                <h5 className="offcanvas-title " id="offcanvasNavbarLabel">
                <div className="brandDetail d-flex" >

<img src={moon} alt="moon" height={40} width={40} style={{marginTop:"2%" ,filter:"drop-shadow(0 0 30px white)"}} />

<div className="logo " >
   <h2 className='text-light'datatext ='MoonDine' style={{ letterSpacing:"2px"}}> MoonDine </h2>
   </div>
   </div>
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
              </div>
              <div className="offcanvas-body">
                <ul className="navbar-nav justify-content-end flex-grow-1 pe-3 gap-3">
                  <li className="nav-item">
                    <NavLink to="/" className="text-decoration-none nav-link hover-underline text-white">
                        HOME
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <a
                      className="nav-link  hover-underline text-white"
                      href="#menu"
                    >
                      MENU
                    </a>
                  </li>

                  <li className="nav-item">
                    <a
                      className="nav-link  hover-underline text-white"
                      href="#about"
                    >
                      ABOUT
                    </a>
                  </li>

                  <li className="nav-item">
                    <NavLink
                      to="/contact"
                      className="nav-link  hover-underline text-white"
                    >
                      CONTACT
                    </NavLink>
                  </li>
            
                       <li className="nav-item dropdown">
          <a className="nav-link  hover-underline text-white dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          JOIN Us
          </a>
          <ul className="dropdown-menu">
          {isAuthenticated ? (
                          <div>
                          <li>
                              <NavLink
                                to="/profile"
                                className="dropdown-item   "
                              >
                                Profile
                              </NavLink>
                            </li>
                          <li>
                              <NavLink
                                to="/order"
                                className="dropdown-item   "
                              >
                                Orders
                              </NavLink>
                            </li>

                          <li className="dropdown-item "
                          onClick={handleLogout}
                          style={{cursor:"pointer"}}
                          >
                          Log-Out
                            
                          </li>
                          </div>
                        ) : (
                          <div>
                            <li>
                              <NavLink
                                to="/register"
                                className="dropdown-item   "
                              >
                                Create Account
                              </NavLink>
                            </li>
                            <li>
                              <NavLink to="/login" className="dropdown-item   ">
                                Log-In
                              </NavLink>
                            </li>
                          </div>
                        )}
          </ul>
        </li>

                  <li  className=" me-1  position-relative " type="button">
                  <img src={Cart} alt="cart" height={35} width={35} onClick={handleCartPage}/>
                    <span className="badge bg-danger rounded-circle position-absolute top-0  translate-middle" style={{ fontSize: "13px" }}>{cartLength}</span>
                  </li>

                  <li className="bookTab nav-item">
                    <NavLink
                      to="/booktable"
                      className="nav-link hover-btn text-white px-2"
                    >
                      Book Table
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Navbar;
