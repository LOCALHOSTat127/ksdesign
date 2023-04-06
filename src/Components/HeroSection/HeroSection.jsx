import React from 'react'
import './style.css';
import { useNavigate } from 'react-router-dom';


import { TypeAnimation } from 'react-type-animation';
import HeroImage from "../../assets/png/heroimgfinal.png";
import { ReactComponent as RightArrow } from "../../assets/svg/right-arrow.svg";


const HeroSection = () => {
  const NAVIGATE = useNavigate();
  return (
    <section className='Hero__section__outer'>
      <div className="content__containor">
        <h1 className="heading">
          <div className="headbg">Advertise IN</div>
          <span className='main'>
            Newspaper

          </span>

          <span className='subhead'>
            <TypeAnimation
              className='type__txt'
              sequence={[
                'On Digital Media',
                1300,
                'On Telivision',
                1300,
                'On FM/Radio',
                1300,
                'On Bilboards',
                1300,
              ]}
              speed={10}
              repeat={Infinity}
            >

            </TypeAnimation>
          </span>
        </h1>


        <div className="services__grid">

        </div>



        <p className="subhedding">
          Advertise your products,services and business on Digital as well as Print media platforms. We have covered all major Ad mediums at very minimal prices.
        </p>


        <div className="hero__controlls">
          <a href="#services">
            <button className="bookad__box browes__collection">
              Brwose Services
              <RightArrow className='btn__svg' />
              <div className="hid__line"></div>
            </button>
          </a>
          <button
          onClick={((e) =>{
            NAVIGATE('/ad/select/category')
          })} 
          className="bookad__box">
            Book AD online
            <RightArrow className='btn__svg' />
            <div className="hid__line"></div>
          </button>
        </div>

      </div>
      <div
        style={{
          width: "100%"
        }} className="img__containor">
        <img style={{
          width: "auto",
          height: "100%",
          transform: 'translateX(-45px)',
          maxHeight: "600px",
        }} src={HeroImage} alt="Hero_image"  />
      </div>
    </section>
  )
}

export default HeroSection;



