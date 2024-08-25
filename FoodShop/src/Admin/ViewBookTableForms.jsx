import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BaseUrl } from '../config/Base_Url'

function ViewBookTableForms() {
    const [viewBookTableForm, setViewBookTableForm]=useState([])

    const handleBookTableForms =async()=>{
        try{
            const res= await axios.get(`${BaseUrl}/api/user/viewBookTableForm`)
            setViewBookTableForm(res.data)
        }
        catch (err){
            console.log('No forms found',err);
        }
    }

    useEffect(()=>{
        handleBookTableForms()
    },[])

    useEffect(()=>{
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    },[])

  return (
    <>
     <div className="bookTableFormsPage mb-3">
        <div className="bookTableFormsTable d-flex flex-column align-items-center me-2 rounded-3 border border-dark shadow " style={{ marginTop: "75px" , overflowY: "auto", maxHeight: "100vh",scrollbarWidth:'none' }}>
        <h3 className='text-primary'>BOOKTABLE FORMS LIST</h3>
        <div style={{ overflowX: 'auto', width: '100%' , overflowY: "auto", maxHeight: "100vh", scrollbarWidth:'none' }}>
          <table className="table table-striped ">
            <thead>
              <tr>
                <th scope="col">S.No.</th>
                <th scope="col">User_Id</th>
                <th scope="col">Name</th>
                <th scope="col">Phone</th>
                <th scope="col">Number Of Persons</th>
                <th scope="col">Date</th>
                <th scope="col">Time</th>
                <th scope="col">Message</th>
                {/* <th scope="col">Actions</th> */}
              </tr>
            </thead>
            <tbody>
              {viewBookTableForm.length > 0 ? (
                viewBookTableForm.map((table, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{table.userId}</td>
                    <td>{table.name}</td>
                    <td>{table.phone}</td>
                    <td className='text-center'>{table.numberOfPersons}</td>
                    <td>{new Date(table.date).toLocaleDateString()}</td>
                    <td>{table.time}</td>
                    <td>{table.message}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center">No forms found</td>
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

export default ViewBookTableForms