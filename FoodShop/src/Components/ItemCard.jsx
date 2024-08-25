import React, { useContext } from 'react';
import { ItemContext } from './ItemProvider';

function ItemCard({ item }) {
    const { addToCart } = useContext(ItemContext);

    if (!item) {
        return null;
    }

    return (
        <>
            <div className="itemcard" >
                <div className="card card-hover h-100 " style={{ width: "100%", height: "100%",overflow:'hidden' }}>
                    <div className="row g-0">
                        <div className="col-md-4 left-content" style={{overflow:'hidden'}}>
                            <img
                                src={item.image_url}
                                className="img-fluid rounded-start"
                                alt={item.name}
                                style={{ height: "100%", objectFit: "cover", width: "100%", aspectRatio:'6/6' }}
                            />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body right-content">
                                <div className="d-flex justify-content-between">
                                    <h4 className="card-title">{item.name}</h4>
                                    <p className="card-text d-flex gap-1 fs-5 mt-1">
                                        <i className="fa-solid fa-star text-warning"></i>
                                        <i className="fa-solid fa-star text-warning"></i>
                                        <i className="fa-solid fa-star text-warning"></i>
                                        <i className="fa-solid fa-star-half-stroke text-warning"></i>
                                        <i className="fa-regular fa-star text-warning"></i>
                                    </p>
                                </div>
                                <p className="card-text">
                                    <div className="d-flex gap-2">
                                        <span className="badge rounded-pill text-bg-success p-2">{item.description1}</span>
                                        <span className="badge rounded-pill text-bg-success p-2">{item.description2}</span>
                                    </div>
                                    <div className="price-cart mt-4 d-flex justify-content-between">
                                        <span className="fs-5 fw-bold">₹ {item.originalPrice}</span>
                                        <div className="cart">
                                            <button className="btn btn-outline-success py-1 px-2 fw-bold" onClick={() => addToCart(item)}>
                                                ADD
                                                <i className="fa-solid fa-cart-shopping text-success ms-2"></i>
                                            </button>
                                        </div>
                                    </div>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ItemCard;
