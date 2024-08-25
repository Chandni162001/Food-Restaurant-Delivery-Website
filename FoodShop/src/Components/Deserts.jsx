import React, { useEffect } from 'react';
import CategoryFilter from './CategoryFilter';

function DesertsDrinks() {
    
    useEffect(()=>{
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      },[])

    return (
        <div>
            <CategoryFilter />
        </div>
    );
}

export default DesertsDrinks;
