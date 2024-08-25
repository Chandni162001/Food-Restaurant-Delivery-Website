import React from 'react'
import moon from'../assets/thin-moon.png'

function Logo() {
  return (
    <>
    <div className="bg-dark vh-100"> 
        <div className="d-flex" >

    <img src={moon} alt="moon" height={150} width={150} style={{position:"absolute", top:"38%", left:"25%", filter:"drop-shadow(0 0 18px white)"}} />
    
    <div className="logo " style={{position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)" }} >
       <h2 className='text-light'datatext ='MoonDine' style={{fontSize:"6rem", letterSpacing:"2px"}}> MoonDine </h2>
       </div>
       </div>
       </div>
    </>
  )
}

export default Logo