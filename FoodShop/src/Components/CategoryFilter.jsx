import React, { useContext, useState, useEffect } from 'react';
import { ItemContext } from './ItemProvider';
import ItemCard from './ItemCard';

function CategoryFilter({ category }) {
    const { foodItemsList } = useContext(ItemContext);
    const [activeSubCategory, setActiveSubCategory] = useState(null);
    const [categorySubCategories, setCategorySubCategories] = useState([]);

    useEffect(() => {
        // Define specific subcategories for each category
        const subCategoriesMap = {
            'Main Course': ['Bread', 'Curry', 'Dal', 'Rice'],
            'Deserts & Drinks': ['Deserts', 'Drinks'],
            'Starters': []
        };

        setCategorySubCategories(subCategoriesMap[category] || []);
    }, [category]);

    const filteredItems = foodItemsList.filter(item => item.category === category && (!activeSubCategory || item.subCategory === activeSubCategory));

    const handleSubCategory = (subCategory) => {
        setActiveSubCategory(subCategory);
    };

    useEffect(()=>{
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      },[])

    return (
        <div className=" custom-bg " >
        <div className="container  d-flex justify-content-center align-items-center flex-column min-vh-100 mt-3">
            <h1 className="categoryHeading my-5" style={{ letterSpacing: "5px", fontSize: "50px", textTransform: "uppercase" }}>{category}</h1>

            {categorySubCategories.length > 0 && (
                <div className="categories d-flex align-items-center gap-4 justify-content-center mb-5">
                    {categorySubCategories.map((sub) => (
                        <div className="category d-flex flex-column text-center" key={sub} onClick={() => handleSubCategory(sub)}>
                            
                                <button className=" btn btn-outline-light  fw-bold">{sub}</button>
                        </div>
                    ))}
                </div>
            )}
            <div className="row">
                {filteredItems.map(item => (
                    <div className="col-md-6 mb-5 " key={item._id} >
                        <ItemCard item={item} />
                    </div>
                ))}
            </div>
        </div>
        </div>
    );
}

export default CategoryFilter;


