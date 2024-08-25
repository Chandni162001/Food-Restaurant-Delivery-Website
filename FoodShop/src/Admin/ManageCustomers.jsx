import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BaseUrl } from '../config/Base_Url';
import { toast } from 'react-toastify';

function ManageCustomers() {
  const [userData, setUserData] = useState([]);

  axios.defaults.withCredentials = true;

  const handleAllUsers = () => {
    axios.get(`${BaseUrl}/api/user/getAllUsers`)
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => {
        console.log('Error:', err.message);
      });
  };

  
  const handleDelete = async (userId) => {
    try {
      await axios.delete(`${BaseUrl}/api/user/delUser/${userId}`);
      setUserData(prevData => prevData.filter(user => user._id !== userId));
      toast.success('UserData is deleted successfully.')
    } catch (error) {
      toast.error('Cannot delete userData', error.message);
    }
  };
  

  const handleMakeAdmin = async (userId) => {
    try {
      await axios.put(`${BaseUrl}/api/user/isAdmin/${userId}`);
      setUserData(prevData =>
        prevData.map(user =>
          user._id === userId ? { ...user,role:"admin", adminn: true } : user
        )
      );
      toast.success('Role is changed successfully.')
      handleAllUsers()
    } catch (error) {
      toast.error('Role cannot be changed', error.message);
    }
  };

  // console.log(userData);

  useEffect(() => {
    handleAllUsers();
  }, []);

  useEffect(()=>{
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  },[])

  return (
    <>
      <div className="usersPage mb-3">
        <div className="usersTable d-flex flex-column align-items-center me-2 rounded-3 border border-dark shadow " style={{ marginTop: "75px"}}>
        <h3 className='text-primary'>USERS LIST</h3>
        <div style={{ overflowX: 'auto', width: '100%' , overflowY: "auto", maxHeight: "100vh", scrollbarWidth:'none' }}>
          <table className="table table-striped ">
            <thead>
              <tr>
                <th scope="col">S.No.</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Mobile</th>
                <th scope="col">Role</th>
                <th scope="col">Admin</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {userData.length > 0 ? (
                userData.map((user, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.role}</td>
                    {/* <td>{user.adminn?"true" :"false" }</td> */}

                    <td>
              {user.adminn ? (
                <span role="img" aria-label="Admin">
                  👨‍💼 Yes
                </span>
              ) : (
                <span role="img" aria-label="User">
                  👤 No
                </span>
              )}
            </td>

                    <td>
                      <button type="button" className="btn btn-outline-danger btn-sm w-100 mb-1" onClick={() => handleDelete(user._id)}>Delete</button> <br />
                      <button type="button" className="btn btn-warning btn-sm w-100" onClick={() => handleMakeAdmin(user._id)}>{user.role==='admin'?'Remove Admin':'Make Admin'}</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">No users found</td>
                </tr>
              )}
            </tbody>
          </table>
          </div>
        </div>

      </div>
    </>
  );
}

export default ManageCustomers;