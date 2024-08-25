import React, { useEffect, useState } from "react";
import axios from "axios";
import { BaseUrl } from "../config/Base_Url";

function Carousel() {
  const [allBanners, setAllBanners] = useState([]);

  axios.defaults.withCredentials = true;

  const handleAllBanners = () => {
    axios
      .get(`${BaseUrl}/api/product/viewBanners`)
      .then((res) => {
        setAllBanners(res.data);
      })
      .catch((err) => {
        console.log(`Error in fetching data, error: ${err}`);
      });
  };

  useEffect(() => {
    handleAllBanners();
  }, []);

  return (
    <div
      id="carouselExampleCaptions"
      className="carousel slide"
      data-bs-ride="carousel"
      data-bs-interval="5000" 
    >
      <div className="carousel-indicators">
        {allBanners.map((banner, index) => (
          <button
            key={index}
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to={index}
            className={index === 0 ? "active" : ""}
            aria-current={index === 0 ? "true" : ""}
            aria-label={`Slide ${index + 1}`}
          ></button>
        ))}
      </div>
      <div className="carousel-inner">
        {allBanners.length > 0 ? (
          allBanners.map((banner, index) => (
            <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
              <img src={banner.bannerImage} className="d-block w-100" alt="bannerImage" />
              {/* <div className="carousel-caption d-none d-md-block">
                <p>{banner.description}</p>
              </div> */}
            </div>
          ))
        ) : (
          <div>
            <p className="text-white">No Banners Found</p>
          </div>
        )}
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

export default Carousel;
