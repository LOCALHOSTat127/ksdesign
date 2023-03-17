import React from 'react'
import "./sections.css";

import PngOne from "../../assets/png/rajasthan-patrika-logo.png";
import PngTwo from "../../assets/png/disnik-bhaskar-logo.png";
import PngThree from "../../assets/png/navbharat-times-logo.png";
import PngFour from "../../assets/png/amar-ujala-logo.png";
import PngFive from "../../assets/png/hindustan-times-logo.png";
import PngSix from "../../assets/png/lok-satta-logo.png";
import PngSeven from "../../assets/png/the-hindu-logo.png";
import PngEight from "../../assets/png/punjab-kesri-logo.png";


const section = () => {
  return (
    <section className='home__page__second__section'>
      <span>
        <h2>Top Newspapers covered.</h2>
        <p>Post your Ads in most popular Newspapers.</p>
      </span>
      <div className='grid__items'>
        <div className="grid__item">
          <img src={PngOne}  />
        </div>
        <div className="grid__item">
          <img src={PngTwo} />
        </div>
        <div className="grid__item">
          <img src={PngThree} />
        </div>
        <div className="grid__item">
          <img src={PngFour} />
        </div>
        <div className="grid__item">
          <img src={PngFive} />
        </div>
        <div className="grid__item">
          <img src={PngSix} />
        </div>
        <div className="grid__item">
          <img src={PngSeven} />
        </div>
        <div className="grid__item">
          <img src={PngEight} />
        </div>
      </div>
    </section>
  )
}

export default section;