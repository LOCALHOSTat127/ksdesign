import React from 'react'
import './style.css';


import { TypeAnimation } from 'react-type-animation';
import HeroImg from "../../assets/svg/hero-img.svg";

const HeroSection = () => {
  return (
    <section className='Hero__section__outer'>
      <div className="section__inner">
        <div className="content__area">
          <h1 className="heading">
            Graphic Designing,<br />
            <span>Digital marketing</span>

          </h1>
          <TypeAnimation
          className='type__txt'
            sequence={[
              // Same String at the start will only be typed once, initially
              'Advertise on Newspaper',
              1000,
              'Advertise on Auto/E-Riksha',
              1000,
              'Advertise on FM/Radio',
              1000,
            ]}
            speed={50}
            repeat={Infinity}
          >
             <div className="type_txt__before"></div>
          </TypeAnimation>



          <div className="onopage__newsapper__select__box">
            <h2>Book your ad in less then 5 min.</h2>
            <div className="inner__select__box">
            </div>
          </div>

          <p className="subhedding">
            Advertise your products,services and business on Digital as well as Print media platforms. We have covered all major Ad mediums at very minimal prices.
          </p>
        </div>
        <div className="img__area">
          <div className="img__bg"></div>
          <img src={HeroImg} alt="Hero section image" />
        </div>
      </div>
    </section>
  )
}

export default HeroSection;