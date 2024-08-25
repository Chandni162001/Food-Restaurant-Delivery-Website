import React from 'react'
import moon from'../assets/thin-moon.png'
import { NavLink } from 'react-router-dom'

function Footer() {
  return (
    <>

  <footer
          className="text-center text-lg-start text-light"
          style={{backgroundColor: "#111"}}
          >
    <div className=" p-4 pb-0">
      <section className="">
        <div className="row">
          <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
          <div className="brandDetail d-flex mb-5" >

<img src={moon} alt="moon" height={40} width={40} style={{marginTop:"2%" ,filter:"drop-shadow(0 0 30px white)"}} />

<div className="logo " >
   <h2 className='text-light'datatext ='MoonDine' style={{ letterSpacing:"2px"}}> MoonDine </h2>
   </div>
   </div>
            <p>
            Our mission is simple yet profound : <br /> To create memorable dining experiences that delight the senses and nourish the soul.
            </p>


          </div>

          <hr className="w-100 clearfix d-md-none" />

          <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
            <h6 className="text-uppercase mb-4 font-weight-bold">Useful Links</h6>
            <p>
            <NavLink to='/faqs' className="text-decoration-none text-light hover-underline " style={{textDecoration:"none" , color:"white"}}>FAQs</NavLink>
            </p>
            <p>
              <NavLink to='/contact' className="text-decoration-none text-light hover-underline" style={{textDecoration:"none" , color:"white"}} >Contact</NavLink>
            </p>
            <p>
            <NavLink to='/order'  className="text-decoration-none text-light hover-underline" style={{textDecoration:"none" , color:"white"}}>Track Orders</NavLink>
            </p>
            <p>
            <NavLink to='/terms' className="text-decoration-none text-light hover-underline" style={{textDecoration:"none" , color:"white"}}>Terms & Conditions</NavLink>
            </p>
           
          </div>

          <hr className="w-100 clearfix d-md-none" />

          <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
            <h6 className="text-uppercase mb-4 font-weight-bold">Contact</h6>
            <p><i className="fas fa-home mr-3"></i> <span>Lal Bahadur Nagar, Adinath Nagar <br /> Jaipur, Rajasthan 302018</span></p>
            <p><i className="fa-regular fa-clock fs-5"></i> 9:00 A.M. to 1 A.M.
            </p>
            <p><i className="fas fa-envelope mr-3"></i> 
            <NavLink to="https://mail.google.com/mail/?view=cm&fs=1&to=contact.moondine@gmail.com"  rel="noopener noreferrer" style={{color: "#fff",textDecoration: "none"}}> contact.moondine@gmail.com</NavLink>
            </p>
            <p><i className="fas fa-phone mr-3"></i> +91-9876543210</p>
          </div>

          <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
            <h6 className="text-uppercase mb-4 font-weight-bold">Follow us</h6>

            <a
               className="btn btn-primary btn-floating m-1"
               style={{backgroundColor: "#3b5998"}}
               href="#!"
               role="button"
               ><i className="fab fa-facebook-f"></i
              ></a>

            <a
               className="btn btn-primary btn-floating m-1"
               style={{backgroundColor: "#55acee"}}
               href="#!"
               role="button"
               ><i className="fab fa-twitter"></i
              ></a>

            <a
               className="btn btn-primary btn-floating m-1"
               style={{backgroundColor: "#ac2bac"}}
               href="#!"
               role="button"
               ><i className="fab fa-instagram"></i
              ></a>

          </div>
        </div>
      </section>
      
    </div>
  
    <div
         className="text-center p-3"
         style={{backgroundColor: "rgba(0, 0, 0, 0.2)"}}
         >
      © 2024, MoonDine Jaipur . All Rights are Reserved.
      
    </div>
  </footer>

    </>
  )
}

export default Footer
