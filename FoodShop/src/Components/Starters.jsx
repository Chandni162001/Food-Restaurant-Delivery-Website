import React, { useEffect } from 'react';
import CategoryFilter from './CategoryFilter';

function Starters() {

    useEffect(()=>{
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      },[])
      
    return (
        <>
          <div className=" custom-bg bg-dark" >
            <CategoryFilter/>
            </div>
        </>
    );
}

export default Starters;
