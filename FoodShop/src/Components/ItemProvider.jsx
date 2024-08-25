// import axios from 'axios';
// import React, { createContext , useEffect, useState} from 'react'
// import { BaseUrl } from '../config/Base_Url';


// export const ItemContext=createContext();

// function ItemProvider({children}) {
//     const [foodItemsList, setFoodItemsList] = useState([]);
//     // const [filteredList, setFilteredList] = useState([]);
  
//     axios.defaults.withCredentials = true;
  
//     useEffect(() => {
//       const handleFoodItems = () => {
//         axios.get(`${BaseUrl}/api/product/viewItems`)
//           .then((res) => {
  
//             setFoodItemsList(res.data);
//           })
//           .catch((err) => {
//             console.log(`Error in fetching data, error: ${err}`);
//           });
//       };
//       handleFoodItems();
//     }, []);
  
//     // useEffect(() => {
//     //   const filteredStarters = () => {
//     //     const filtered = foodItemsList.filter(object => object.category === "Starters");
//     //     setFilteredList(filtered);
//     //     console.log("starters list:", filteredList);
//     //   };
//     //   filteredStarters();
//     // }, [foodItemsList]);
  
  
//     const addToCart = async (product) => {
//       try {
//         if (!product) {
//           console.error('Product is undefined');
//           return;
//         }
  
//         const token = localStorage.getItem('token');
//         const userId = localStorage.getItem('userId'); 
  
//         if (!token) {
//           console.error('Token not found in local storage');
//           return;
//         }
  
//         if (!userId) {
//           console.error('User ID not found in local storage');
//           return;
//         }
  
//         const response = await axios.post(`${BaseUrl}/api/product/addToCart`, {
//           userId, 
//           productId: product._id,
//           name: product.name,
//           originalPrice: product.originalPrice
//         }, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           }
//         });
  
//         console.log(response.data);
//       } catch (error) {
//         console.error('Error adding to cart', error);
//       }
//     }

//   return (
//     <ItemContext.Provider value={{foodItemsList,addToCart,handleFoodItems}}>
//       {children}
//     </ItemContext.Provider>
//   )
// }

// export default ItemProvider




// import axios from 'axios';
// import React, { createContext, useEffect, useState } from 'react';
// import { BaseUrl } from '../config/Base_Url';

// export const ItemContext = createContext();

// function ItemProvider({ children }) {
//     const [foodItemsList, setFoodItemsList] = useState([]);

//     axios.defaults.withCredentials = true;

//     const handleFoodItems = () => {
//         axios.get(`${BaseUrl}/api/product/viewItems`)
//             .then((res) => {
//                 setFoodItemsList(res.data);
//             })
//             .catch((err) => {
//                 console.log(`Error in fetching data, error: ${err}`);
//             });
//     };

//     useEffect(() => {
//         handleFoodItems();
//     }, []);

//     const addToCart = async (product) => {
//         try {
//             if (!product) {
//                 console.error('Product is undefined');
//                 return;
//             }

//             const token = localStorage.getItem('token');
//             const userId = localStorage.getItem('userId'); 

//             if (!token) {
//                 console.error('Token not found in local storage');
//                 return;
//             }

//             if (!userId) {
//                 console.error('User ID not found in local storage');
//                 return;
//             }

//             const response = await axios.post(`${BaseUrl}/api/product/addToCart`, {
//                 userId,
//                 productId: product._id,
//                 name: product.name,
//                 originalPrice: product.originalPrice
//             }, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 }
//             });

//             console.log(response.data);
//         } catch (error) {
//             console.error('Error adding to cart', error);
//         }
//     };

//     return (
//         <ItemContext.Provider value={{ foodItemsList, addToCart, handleFoodItems }}>
//             {children}
//         </ItemContext.Provider>
//     );
// }

// export default ItemProvider;


import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { BaseUrl } from '../config/Base_Url';
import { toast } from "react-toastify";

export const ItemContext = createContext();

function ItemProvider({ children }) {
    const [foodItemsList, setFoodItemsList] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
  
    axios.defaults.withCredentials = true;
  
   
        const fetchFoodItems = async () => {
            try {
                const res = await axios.get(`${BaseUrl}/api/product/viewItems`);
                setFoodItemsList(res.data);
            } catch (err) {
                console.error('Error in fetching data:', err);
            }
        };

        const fetchSubCategories = async () => {
            try {
                const res = await axios.get(`${BaseUrl}/api/product/subcategories`);
                setSubCategories(res.data);
            } catch (err) {
                console.error('Error in fetching subcategories:', err);
            }
        };
    useEffect(() => {
        fetchFoodItems();
        fetchSubCategories();
    }, []);
  
    const addToCart = async (product) => {
        try {
            if (!product) {
                console.error('Product is undefined');
                return;
            }

            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId');

            if (!token || !userId) {
                console.error('Token or User ID not found in local storage');
                return;
            }

            const response = await axios.post(`${BaseUrl}/api/product/addToCart`, {
                userId,
                productId: product._id,
                name: product.name,
                originalPrice: product.originalPrice
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            // console.log(response.data);
            fetchFoodItems()
            toast.success("Added to cart successfully")
        } catch (error) {
            toast.error('Error adding to cart', error);
        }
    };

    useEffect(()=>{
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      },[])

    return (
        <ItemContext.Provider value={{ foodItemsList, subCategories, addToCart }}>
            {children}
        </ItemContext.Provider>
    );
}

export default ItemProvider;
