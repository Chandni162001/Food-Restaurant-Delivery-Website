import React, { useEffect } from 'react'

function AdminDashboard() {
  useEffect(()=>{
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  },[])
  return (
    <>
        <div id='dashboard' className="dashboardPage ">
            <div className="dashboard-heading d-flex justify-content-center align-items-center vh-100">
                <h3>DASHBOARD</h3>
            </div>
        </div>
    </>
  )
}

export default AdminDashboard