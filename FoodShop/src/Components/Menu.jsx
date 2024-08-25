
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { BaseUrl } from "../config/Base_Url";
import shape1 from '../assets/shape-1.png';

function Menu() {
  const [category, setCategory] = useState([]);

  const handleCategories = async () => {
    try {
      const response = await axios.get(`${BaseUrl}/api/product/viewCategories`);
      setCategory(response.data);
    } catch (err) {
      console.error('Error in fetching categories:', err);
    }
  };

  useEffect(() => {
    handleCategories();
    AOS.init({ duration: 1000, easing: 'ease-in-sine' });
  }, []);

  return (
    <>
      {/* <div id="menu" className="menuPage">
        <div className="menuCont container">
          <div className="menuHeading mt-5">
            <h1 className="mb-1">MENU</h1>
            <hr className="mx-auto"/>
            <h1>We Offer Top Notch</h1>
          </div>

          <div className="menuCards py-3 my-5 position-relative">
            {category.length > 0 ? (
              category.map((category, index) => (
                <div key={index} className="menucard card text-bg-dark w-100" style={{ height: "300px" }}>
                  <img
                    src={category.image_url}
                    className="card-img img-fluid"
                    alt={category.name}
                  />
                  <div className="card-img-overlay">
                    <h5 className="card-title cardHeader" data-aos="slide-right">{category.name}</h5>
                    <NavLink to={`/${category.name.toLowerCase().replace(/\s+/g, '')}`} className="text-decoration-none">
                      <h5 className="card-text cardFooter" data-aos="slide-left">View Menu</h5>
                    </NavLink>
                  </div>
                </div>
              ))
            ) : (
              <div>No Categories</div>
            )}
          </div>
        </div>
      </div> */}

<div id="menu" className="menuPage d-flex justify-content-center align-items-center min-vh-100 d-none d-md-block mb-3">
        <div className="menuCont container d-flex flex-column justify-content-center align-items-center ">
          <div className="menuHeading text-center mt-5">
            <h1 className="mb-1">MENU</h1>
            <hr className="w-50 mx-auto" />
            <h1 className="mb-4">We Offer Top Notch</h1>
          </div>

          <div className="menuCards  position-relative">
            {/* categories card */}
            {category.length > 0 ? 
            (category.map((category, index) => (
              <div key={index} className="menucard card text-bg-dark w-25" style={{ height: "300px", overflow: "hidden" }}>
                <img
                  src={category.image_url}
                  className="card-img img-fluid"
                  
                  alt={category.name}
                />

                <div className="card-img-overlay">
                  <h5 className="card-title cardHeader" data-aos="slide-right" style={{ textTransform: "uppercase" }}>{category.name}</h5>
                  <NavLink to={`/${category.name.toLowerCase().replace(/\s+/g, '')}`} className="text-decoration-none">
                    <h5 className="card-text cardFooter position-absolute bottom-0 end-0 mb-3 px-3" data-aos="slide-left">
                      View Menu
                    </h5>
                  </NavLink>
                </div>
              </div>
            )))
            :
            (<div>No Categories</div>)}
          </div>
        </div>
      </div>

{/* for smaller screens */}
      <div id="menu" className="menuPage min-vh-100 d-md-none ">
        <div className="menuCont mt-5">
          <div className="menuHeadingNew text-center">
            <h1 className="mb-1">MENU</h1>
            <hr className="mx-auto w-25" />
            <h1>We Offer Top Notch</h1>
          </div>

          <div className="menuCards d-flex gap-3 mt-5 mb-2 ">
            {category.length > 0 ? (
              category.map((category, index) => (
                <div key={index} className="menucard card text-bg-dark" style={{ height: "200px", width: "200px" }}>
                  <img
                    src={category.image_url}
                    className="card-img img-fluid"
                    alt={category.name}
                  />
                  <div className="card-img-overlay">
                    <h5 className="card-title cardHeader" data-aos="slide-right">{category.name}</h5>
                    <NavLink to={`/${category.name.toLowerCase().replace(/\s+/g, '')}`} className="text-decoration-none">
                      <h5 className="card-text cardFooter position-absolute bottom-0 end-0 mb-3 px-3" data-aos="slide-left">View Menu</h5>
                    </NavLink>
                  </div>
                </div>
              ))
            ) : (
              <div>No Categories</div>
            )}
          </div>
        </div>
      </div>

      <img src={shape1} alt="shape-1" className="position-absolute end-0 top-100 p-5 mt-5 d-none d-sm-block"  />
      <img src={shape1} alt="shape-1" className="position-absolute start-0 top-100 px-3 d-none d-sm-block " style={{ marginTop: '520px' }} />
    </>
  );
}

export default Menu;
