
import React from 'react';
import table from '../assets/table.avif';
import chef from '../assets/chef.jpg';

function About() {
  return (
    <>
      <div id="about" className="aboutPage min-vh-100">
        <div className="aboutCont d-flex justify-content-center align-items-center ">

        <div className="row w-100 mx-2">
        <div className=" col-md-3 d-flex justify-content-center align-items-center d-none d-md-block">
              <img 
                src={chef} 
                className="chef rounded img-fluid" 
                alt="restaurant chef" 
                style={{ height: 'auto', minHeight: "250px", maxHeight: '420px', width: "100%" }} 
              />
            </div>
          

            <div className="col-12 col-md-6 d-flex flex-column justify-content-center align-items-center text-center mb-3 mb-md-0">
              <div className="about-content py-sm-5 py-md-0">
                <h4 className="text-white ">" Our Story "</h4>
                <hr className="w-25 mx-auto text-white border-2 " />
                <h1 className="mb-4">What We Are...</h1>
                <p className="fw-bold">
                  Welcome to MoonDine Restaurant, where culinary excellence meets unparalleled hospitality. Our mission is simple yet profound: to create memorable dining experiences that delight the senses and nourish the soul.
                  <br /><br />
                  We uphold values of sustainability, community engagement, and culinary innovation. Our signature dishes, curated by our talented chefs, are a testament to our commitment to quality and creativity.
                  <br /><br />
                  <span className="d-none d-md-block">We take pride in our positive impact on the local community, supporting local farms and initiatives for a sustainable future. With your support, we aim to continue growing.</span> 
                  Join us on this delicious journey and experience the magic of MoonDine Restaurant.
                </p>
              </div>
            </div>

            
            <div className="col-12 col-md-3 d-flex justify-content-center align-items-center mb-3 mb-md-0">
              <img 
                src={table} 
                className="interior rounded img-fluid" 
                alt="restaurant interior" 
                style={{ height: 'auto', minHeight: "250px", maxHeight: '410px', width: "100%" }} 
              />
            </div>

            
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
