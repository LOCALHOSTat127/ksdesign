import React from 'react'
import './style.css';


import { TypeAnimation } from 'react-type-animation';
import HeroImage from "../../assets/png/heroimg.png";
import {ReactComponent as RightArrow} from "../../assets/svg/right-arrow.svg";
import {Section as LogoSlider} from "../../Components/Hero-Slider/Section";

const HeroSection = () => {
  return (
    <section className='Hero__section__outer'>
      <div className="content__containor">
        {/* <h1 className="heading">
        <div className="headbg">Advertise IN</div>
          <span className='main'>
            Newspaper
            
            </span>
            
          <span  className='subhead'>
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

            

        <button className="bookad__box">
          Book AD online 
          <RightArrow className='btn__svg'/>
          <div className="hid__line"></div>
        </button>

         */}

          <div className="img__cover">
            <img src={HeroImage} alt="" srcset="" />
          </div>
      </div>
    </section>
  )
}

export default HeroSection;




// <div className="content__area">
//           <h1 className="heading">
//             Graphic<br/>Designing,<br />
           
//           </h1>
      





//         </div>
//         <div className="img__area">
//           <div className="img__bg"></div>
//           <img src={HeroImage} alt="Hero section image" />
//         </div>