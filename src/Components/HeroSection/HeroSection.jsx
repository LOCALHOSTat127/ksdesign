import React from 'react'
import './style.css';
import { useNavigate } from 'react-router-dom';


import { TypeAnimation } from 'react-type-animation';
import HeroImage from "../../assets/png/heroimgfinal.png";
import HeroImageSecond from "../../assets/png/hero_image_mobile.png";
import { ReactComponent as RightArrow } from "../../assets/svg/right-arrow.svg";



// Controlls_section
const HeroControlls = ({ type }) => {
  const NAVIGATE = useNavigate();
  return (
    <>
      <p className={`subhedding ${type}`}>
        Advertise your products,services and business on Digital as well as Print media platforms. We have covered all major Ad mediums at very minimal prices.
      </p>


      <div className={`hero__controlls ${type}`}>

        <button onClick={(e) =>{
          NAVIGATE('/services');
        }} className="bookad__box browes__collection">
          Brwose Services
          <RightArrow className='btn__svg' />
          <div className="hid__line"></div>
        </button>

        <button
          onClick={((e) => {
            NAVIGATE('/ad/select/category')
          })}
          className="bookad__box">
          Book AD online
          <RightArrow className='btn__svg' />
          <div className="hid__line"></div>
        </button>
      </div>

    </>
  )
}


const HeroSection = () => {

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
                'Or Digital Media',
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
          <p>in Just 3 Steps</p>
          <div className="steps_display">
            <ul>
              <li className="step">
                Select
                <div className="step_line"></div>
              </li>
              <li className="step">
                Compose
                <div className="step_line"></div>
              </li>
              <li className="step">
                Publish

              </li>
            </ul>
          </div>
        </div>
        <HeroControlls type={"desktop"} />




      </div>
      <div className="image_outer">
        <div
          className="img__containor">
          <img src={HeroImage} alt="Hero_image" />
        </div>
        <div className="wrapper">
          <HeroControlls type={"mobile"} />
        </div>
      </div>
    </section>
  )
}

export default HeroSection;


