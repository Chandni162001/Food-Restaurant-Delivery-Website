import React, { useEffect, useRef } from 'react';
import image1 from '../assets/gallery-image1.jpg';
import image2 from '../assets/gallery-image2.jpg';
import image3 from '../assets/gallery-image3.jpg';
import image4 from '../assets/gallery-image4.jpg';
import image5 from '../assets/gallery-image5.jpg';
import image6 from '../assets/gallery-image6.jpg';
import image7 from '../assets/gallery-image7.jpg';
import image8 from '../assets/gallery-image8.jpg';

function Gallery() {
    const gallerySliderRef = useRef(null);

    useEffect(() => {
        if (gallerySliderRef.current) {
            const copy = gallerySliderRef.current.querySelector('.gallery-images').cloneNode(true);
            gallerySliderRef.current.appendChild(copy);
        }
    }, []);

    return (
        <div className="galleryPage">
            <div className="gallery-heading">
                <h1>GALLERY</h1>
            </div>
            <div className="gallery-slider" ref={gallerySliderRef}>
                <div className="gallery-images">
                    <img src={image1} alt="image1" />
                    <img src={image2} alt="image2" />
                    <img src={image3} alt="image3" />
                    <img src={image4} alt="image4" />
                    <img src={image5} alt="image5" />
                    <img src={image6} alt="image6" />
                    <img src={image7} alt="image7" />
                    <img src={image8} alt="image8" />
                </div>
            </div>
        </div>
    );
}

export default Gallery;
