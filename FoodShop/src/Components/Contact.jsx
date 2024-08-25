import React, { useEffect, useState } from 'react'
import banner from '../assets/contact-banner-2.png'
import facebook from '../assets/facebook.png'
import instagram from '../assets/instagram.png'
import twitter from '../assets/twitter.png'
import gmail from '../assets/gmail.png'
import phone from '../assets/phone-call.png'
import address from '../assets/map.png'
import { NavLink } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { BaseUrl } from '../config/Base_Url'
import axios from 'axios'

const Contact = () => {
 const [name, setName]=useState('')
 const [mobile, setMobile]=useState('')
 const [email, setEmail]=useState('')
 const [subject, setSubject]=useState('')
 const [message, setMessage]=useState('')
 
 const [nameError, setNameError] = useState('');
 const [emailError, setEmailError] = useState('');
 const [phoneError, setPhoneError] = useState('');
 const [subjectError, setSubjectError] = useState('');
 const [messageError, setMessageError] = useState('');

const resetForm= async()=>{
  try{
    setName('');
    setEmail('');
    setMobile('');
    setSubject('');
    setMessage('');
    setNameError('');
    setEmailError('');
    setPhoneError('');
    setSubjectError('');
    setMessageError('');
  }
  catch(err){
    console.log(err);
  }
 }


 const validateName = () => {
   if (!name.trim()) {
     setNameError("Name cannot be empty.");
   } else if (name.trimStart().length < name.length) {
     setNameError("Name cannot start with spaces.");
   } else if (name.trim().length < 2) {
     setNameError("Name should be at least 2 characters long");
   } else if (!/^[A-Za-z\s]+$/.test(name)) {
     setNameError("Name should only contain letters and spaces");
   } else if (name.length > 20) {
     setNameError("Name should not exceed 20 characters");
   } else {
     setNameError('');
   }
 };

 const validateEmail = () => {
   const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z]+\.[a-zA-Z]+$/;
   if (!emailPattern.test(email)) {
     setEmailError("Valid Email is required.");
   } else if (email.trimStart().length < email.length) {
     setEmailError("Email cannot start with spaces.");
   } else {
     setEmailError('');
   }
 };

 const validatePhone = () => {
   const phonePattern = /^[6-9]\d{9}$/;
   if (!phonePattern.test(mobile)) {
     setPhoneError("Valid Phone Number is required (10 digits) & must start with 6,7,8, or 9.");
   } else {
     setPhoneError('');
   }
 };

 const handlePhoneChange = (e) => {
   const value = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
   if (value.length <= 10) {
     setMobile(value);
     setPhoneError('');
   } else {
     setPhoneError('Phone number should be exactly 10 digits.');
   }
 };

 const validateSubject = () => {
   if (!subject) {
     setSubjectError("Please select 'Subject' option.");
   } else {
     setSubjectError('');
   }
 };

 const validateMessage = () => {
   if (!message.trim()) {
     setMessageError("Message Box cannot be empty.");
   } else if (message.trimStart().length < message.length) {
    setMessageError("Message cannot start with spaces.");
   } else if (message.trim().length < 5) {
    setMessageError("Message should be at least 5 characters long");
   } else {
     setMessageError('');
   }
 };

 const validateForm = () => {
   validateName();
   validateEmail();
   validatePhone();
   validateSubject();
   validateMessage();

   const hasError = nameError || phoneError || emailError || subjectError || messageError;
   if (hasError) {
     toast.error('Please fix the errors in the form.');
     return false;
   }
   return true;
 };

 
 axios.defaults.withCredentials = true;

 const handleContactForm= async(e)=>{
  e.preventDefault();
  const token=localStorage.getItem('token')
  const userId=localStorage.getItem('userId')
  if (!validateForm()) return;
  const formData={userId,name,mobile,email,subject,message}

  try{
    await axios.post(`${BaseUrl}/api/user/contactForm`,formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    resetForm()
    toast.success('Thankyou, your form is successfully submitted !')
  }
  catch (err){
    toast.error("Form submission fail !")
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

<div className="contactPage d-flex justify-content-center align-items-center">
  <div className="banner container-fluid">
    <div className="row">
      <div className="contactCont col-md-6 mb-sm-3 mb-md-0 d-flex flex-column gap-5 justify-content-center align-items-center">
        <h1 className='p-1 mt-5' style={{fontSize:"4rem" , letterSpacing:"3px", color:"white",textShadow:"5px 5px 5px indigo"}}>CONTACT US</h1>
        <h5 className='' style={{ letterSpacing:"1px", maxWidth:"550px"}}>
          We’d love to hear from you! <br /><br />
          Whether you have a question about our menu, need assistance with a reservation, or <br /><br />
          Just want to share your dining experience, our team is here to help.
        </h5>
      </div>
      <div className="col-md-6 bannerPage bg-light rounded-start-5 d-flex flex-column justify-content-center align-items-center" style={{height:"90vh"}}>
        <img src={banner} alt="banner" className="img-fluid"/>
        <h1 className='typewriter-heading'>
          <span className="typewriter thick"></span>
        </h1>
      </div>
    </div>
  </div>
</div>
<div className="contactt d-flex align-items-center" style={{minHeight:"70vh"}}>
  <div className="contactDetails my-3 container d-flex gap-5 flex-column flex-md-row justify-content-center" style={{color:"indigo"}}>
    <div className="social box bg-light p-3 text-center mb-4 mb-md-0 ">
      <h3>GET IN TOUCH</h3>
      <div className="icons d-flex flex-column mt-4 gap-4 justify-content-center align-items-center">
        <NavLink to=""> 
          <img src={facebook} alt="facebook" height={"40px"} width={"40px"} />
        </NavLink>
        <NavLink to=""> 
          <img src={instagram} alt="instagram" height={"40px"} width={"40px"} />
        </NavLink>
        <NavLink to=""> 
          <img src={twitter} alt="twitter" height={"40px"} width={"40px"} />
        </NavLink>
      </div>
    </div>
    <div className="inquiry box bg-light d-flex flex-column gap-4 p-3  align-items-center mb-4 mb-md-0">
      <h4>DROP US YOUR <br />INQUIRY or FEEDBACK</h4>
      <h5 className='text-black mb-4'>Please Fill the Form:</h5>
      <button type="button" className="btn btn-outline-primary w-75" data-bs-toggle="modal" data-bs-target="#form-button">CONTACT FORM</button>
      <div className="modal fade contact-form" id="form-button" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        {/* <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">Inquiry / Feedback Form</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body p-3">

              <div className="mb-3">
                <input type="text" className="form-control border border-dark rounded" id="name" placeholder="Full Name" value={name} 
                onChange={(e)=> setName(e.target.value)} 
                onBlur={validateName} />
                {nameError && <div className="text-danger"><small><i className="bi bi-exclamation-diamond-fill "></i> {nameError}</small></div>}
              </div>

              <div className="mb-3">
                <input type="number" className="form-control border border-dark rounded" id="phoneNumber" placeholder="Phone Number" value={mobile} onChange={handlePhoneChange}
                onBlur={validatePhone} />
                {phoneError && <div className="text-danger"><small><i className="bi bi-exclamation-diamond-fill "></i> {phoneError}</small></div>}
              </div>

              <div className="mb-3">
                <input type="email" className="form-control border border-dark rounded" id="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)}
                onBlur={validateEmail} />
                {emailError && <div className="text-danger"><small><i className="bi bi-exclamation-diamond-fill "></i> {emailError}</small></div>}
              </div>

              <select className="form-select  border border-dark rounded" aria-label="Default select example" value={subject} 
              onChange={(e) => setSubject(e.target.value)}
              onBlur={validateSubject} >
                <option value="Subject">Subject</option>
                <option value="Feedback">Feedback</option>
                <option value="General Inquiry">General Inquiry</option>
                <option value="Reservation">Reservation</option>
                <option value="Other">Other</option>
              </select>
              {subjectError && <div className="text-danger"><small><i className="bi bi-exclamation-diamond-fill "></i> {subjectError}</small></div>}

              <div className="mt-3 border border-dark rounded">
                <textarea className="form-control" placeholder="Message" id="message" style={{height: "100px"}} value={message} onChange={(e) => setMessage(e.target.value)} 
                onBlur={validateMessage} >
                </textarea>
              </div>
                {messageError && <div className="text-danger"><small><i className="bi bi-exclamation-diamond-fill "></i> {messageError}</small></div>}
            </div>
            <div className="modal-footer">
              <button type="reset" className="btn btn-secondary" onClick={resetForm}>RESET</button>
              <button type="submit" className="btn btn-outline-primary" onClick={handleContactForm}>SUBMIT</button>
            </div>
          </div>
        </div> */}

<div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="staticBackdropLabel">Inquiry / Feedback Form</h1>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body p-3">
          <form onSubmit={handleContactForm}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control border border-dark rounded"
                id="name"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={validateName}
              />
              {nameError && (
                <div className="text-danger">
                  <small><i className="bi bi-exclamation-diamond-fill"></i> {nameError}</small>
                </div>
              )}
            </div>

            <div className="mb-3">
              <input
                type="number"
                className="form-control border border-dark rounded"
                id="phoneNumber"
                placeholder="Phone Number"
                value={mobile}
                onChange={handlePhoneChange}
                onBlur={validatePhone}
              />
              {phoneError && (
                <div className="text-danger">
                  <small><i className="bi bi-exclamation-diamond-fill"></i> {phoneError}</small>
                </div>
              )}
            </div>

            <div className="mb-3">
              <input
                type="email"
                className="form-control border border-dark rounded"
                id="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={validateEmail}
              />
              {emailError && (
                <div className="text-danger">
                  <small><i className="bi bi-exclamation-diamond-fill"></i> {emailError}</small>
                </div>
              )}
            </div>

            <div className="mb-3">
              <select
                className="form-select border border-dark rounded"
                aria-label="Default select example"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                onBlur={validateSubject}
              >
                <option value="">Subject</option>
                <option value="Feedback">Feedback</option>
                <option value="General Inquiry">General Inquiry</option>
                <option value="Reservation">Reservation</option>
                <option value="Other">Other</option>
              </select>
              {subjectError && (
                <div className="text-danger">
                  <small><i className="bi bi-exclamation-diamond-fill"></i> {subjectError}</small>
                </div>
              )}
            </div>

            <div className="mt-3 border border-dark rounded">
              <textarea
                className="form-control"
                placeholder="Message"
                id="message"
                style={{ height: "100px" }}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onBlur={validateMessage}
              />
              {messageError && (
                <div className="text-danger">
                  <small><i className="bi bi-exclamation-diamond-fill"></i> {messageError}</small>
                </div>
              )}
            </div>

            <div className="modal-footer">
              <button type="reset" className="btn btn-secondary" onClick={resetForm}>RESET</button>
              <button type="submit" className="btn btn-outline-primary">SUBMIT</button>
            </div>
          </form>
        </div>
      </div>
    </div>
      </div>
    </div>
    <div className="visit box bg-light p-3 text-center">
      <h3>VISIT US</h3>
      <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3559.6885392486925!2d75.7967011!3d26.849857!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db5e8554f72ff%3A0x3610605e03ef562!2sFort%20Restaurant%20Jaipur!5e0!3m2!1sen!2sin!4v1716051225044!5m2!1sen!2sin" width="300" height="200" style={{border:"0", boxShadow:"0 0 5px indigo"}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
    </div>
  </div>
</div>


      {/* <div className="contactPage1 " style={{height:"40vh"}}>
          <div className="otherDetails  d-flex justify-content-center align-items-center">
            <div className="container-fluid fw-bold   d-flex justify-content-around  ">

            <div className="detail d-flex text-white  flex-column justify-content-center align-items-center ">
              <h4 className='py-2'>Opening Hours</h4>
              <p>Monday-Sunday  <br/> 
              <i className="fa-regular fa-clock fs-5"></i> 9:00 A.M. to 1 A.M.
              </p>
            </div>

            <div className="detail d-flex text-white flex-column gap-3 justify-content-center align-items-center">
             <i className="fa-solid fa-phone fs-5"></i> 
             <p>+91-9876543210 </p>
            </div>

            <div className="detail d-flex  flex-column justify-content-center align-items-center">
              <img src={address} alt="address" height={"35px"} width={"35px"}/>
              <p>Lal Bahadur Nagar, Adinath Nagar <br /> Jaipur, Rajasthan 302018</p>
            </div>

            <div className="detail d-flex flex-column justify-content-center align-items-center">
              <img src={gmail} alt="gmail" height={"35px"} width={"35px"}/>
              <p> logo@gmail.com </p>
            </div>
            </div>
          </div>
      </div> */}
    </>
  )
}

export default Contact