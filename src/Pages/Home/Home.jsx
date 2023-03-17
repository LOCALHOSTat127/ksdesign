import React from 'react'

import "./home.css";

import Navbar from "../../Components/Navbar/Navbar";
import SectionTwo from '../../Components/Hero-section-two/SectionTwo';
import SectionThree from '../../Components/Hero-section-three/SectionThree';

import { TypeAnimation } from 'react-type-animation';


import { ReactComponent as RightArrow } from "../../assets/svg/right-arrow.svg";


const Home = () => {
  return (
    <>
      <div className='Home__page__outer flex' >
        <Navbar />
        <div className='content__section'>
          <h1 className='heading'>
            <span>Graphic</span> Designing,<br />
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
            Get your business advertised with, <span>Modern & attractive  </span><br/>Digital and Print ADs.
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
      <SectionThree/>
    </>
  )
}

export default Home;