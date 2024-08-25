import React, { useState, useEffect } from 'react';
import quoteStart from '../assets/double-quote-start.png';
import quoteEnd from '../assets/double-quotes-end.png';
import myImage from '../assets/image7.png';

const testimonials = [
  {
    quote:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore pariatur temporibus incidunt veritatis! Eaque nostrum excepturi doloribus natus veritatis ratione.',
    image: myImage,
    name: 'Chandni Sodani',
  },
  {
    quote:
      'Another testimonial goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    image: "https://images.unsplash.com/photo-1615109398623-88346a601842?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fG1hbnxlbnwwfHwwfHx8MA%3D%3D",
    name: 'Mr. Sain',
  },
  {
    quote:
      'Yet another testimonial. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    image: "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bWFufGVufDB8fDB8fHww",
    name: 'Rohit Yadav',
  },
];

function Testimonial() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((index) =>
        index === testimonials.length - 1 ? 0 : index + 1
      );
    }, 5000); 

    return () => clearInterval(interval);
  }, []);

  const testimonial = testimonials[currentTestimonial];

  return (
    <>
      <div className="testimonial-page d-flex justify-content-center align-items-center vh-100">
        <div className="testimonial-container container d-flex justify-content-center align-items-center vh-100 flex-column">
          <div className="testimonial-content d-flex flex-column align-items-center text-white text-center p-3 slide-in-out">
            <div className="quote-start position-absolute" style={{left: '200px' }}>
              <img src={quoteStart} alt="quote-start" height="40px" width="40px" className="d-none d-md-block"/>
            </div>

            <div className="quote-text w-75 position-relative">
              <h4>{testimonial.quote}</h4>
            </div>

            <div className="quote-end position-absolute" style={{right: '200px' }}>
              <img src={quoteEnd} alt="quote-end" height="40px" width="40px" className="d-none d-md-block"/>
            </div>
          </div>

          <hr className="w-25 border text-white" />

          <div className="testimonial-image mb-3" style={{ borderRadius: '50%', boxShadow: "0 0 10px white" }}>
            <img src={testimonial.image} alt="myImage" height="120px" width="120px" style={{ borderRadius: '50%' }} />
          </div>

          <div className="testimonial-name text-white">
            <span>{testimonial.name}</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Testimonial;
