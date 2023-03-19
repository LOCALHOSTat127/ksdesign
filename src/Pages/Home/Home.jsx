import React from 'react'

import "./home.css";

import Navbar from "../../Components/Navbar/Navbar";
import SectionTwo from '../../Components/Hero-section-two/SectionTwo';
import SectionThree from '../../Components/Hero-section-three/SectionThree';
import SectionFour from '../../Components/Hero-section-fourth/SectionFour';
import LogoSlider from '../../Components/Hero-section-slider/LogoSlider';



// import RajasthanPatrika from "../../assets/png/rajasthan-patrika-logo.png";
// import DainikBhasker from "../../assets/png/disnik-bhaskar-logo.png";
// import HindustanTimes from "../../assets/png/hindustan-times-logo.png";
// import NavbharatTimes from "../../assets/png/navbharat-times-logo.png";
// import LokSatta from "../../assets/png/lok-satta-logo.png";
// import PunjabKesri from "../../assets/png/punjab-kesri-logo.png";


import { TypeAnimation } from 'react-type-animation';


import { ReactComponent as RightArrow } from "../../assets/svg/right-arrow.svg";


const Home = () => {
  return (
    <>
      <div className='Home__page__outer flex' >
        <div className='gradiend'></div>
        <Navbar />
        <div className='content__section'>
          <h1 className='heading'>
            <span>Graphic</span><br />Designing,
            <TypeAnimation
              className="wrap"
              sequence={['Newspaper Ads', 1000, 'Holdings Adversiting', 1000, 'Business Cards',
                1000, 'Banner Design', 1000, 'Digital Marketing', 1000, 'Pamphlet', 500]}
              wrapper="div"
              repeat={Infinity}
              speed={1}
            />

          </h1>

          <p className='sub__heading'>
            Get your business advertised with, <span>Modern & attractive  </span><br />Digital and Print ADs.
          </p>



          <button className='btn__primery flex flex-aic flex-jcc'>
            Book your Ad online
            <RightArrow className='rarr_svg' />
          </button>
        </div>
      </div>

      {/* second section */}
      <SectionTwo />


      {/* SectionThree */}
      <SectionThree />


      {/* Brand logo slide */}
      <LogoSlider/>
    </>
  )
}

export default Home;