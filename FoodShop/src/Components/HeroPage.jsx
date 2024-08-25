import React from 'react'
import Carousel from './Carousel'
import Menu from './Menu'
import About from './About'
import Testimonial from './Testimonial'
import { useEffect } from 'react'

function HeroPage() {

  useEffect(()=>{
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  },[])

  return (

    <>

    <Carousel/>
    <Menu/>
    <About/>
    <Testimonial/>
    </>
  )
}


export default HeroPage