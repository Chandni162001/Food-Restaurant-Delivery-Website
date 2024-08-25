import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BaseUrl } from '../config/Base_Url'

function ViewInquiries() {
    const [viewContactForm, setViewContactForm]=useState([])

    const handleContactForms =async()=>{
        try{
            const res= await axios.get(`${BaseUrl}/api/user/viewContactForm`)
            setViewContactForm(res.data)
        }
        catch (err){
            console.log('No contact forms found',err);
        }
    }

    useEffect(()=>{
        handleContactForms()
    },[])

    useEffect(()=>{
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    },[])
    
  return (
    <>
     <div className="contactFormsPage mb-3">
        <div className="contactFormsTable d-flex flex-column align-items-center me-2 rounded-3 border border-dark shadow " style={{ marginTop: "75px" }}>
        <h4 className='text-primary'>INQUIRIES/FEEDBACK FORMS LIST</h4>
        <div style={{ overflowX: 'auto', width: '100%' , overflowY: "auto", maxHeight: "100vh", scrollbarWidth:'none' }}>
          <table className="table table-striped ">
            <thead>
              <tr>
                <th scope="col">S.No.</th>
                <th scope="col">UserId</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Mobile</th>
                <th scope="col">Subject</th>
                <th scope="col">Message</th>
                {/* <th scope="col">Actions</th> */}
              </tr>
            </thead>
            <tbody>
              {viewContactForm.length > 0 ? (
                viewContactForm.map((user, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{user.userId}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.mobile}</td>
                    <td>{user.subject}</td>
                    <td>{user.message}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">No forms found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        </div>

      </div>

    </>
  )
}

export default ViewInquiries