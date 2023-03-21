import React from 'react'
import "./sections.css";


import JobSeeker from "../../assets/svg/job-seeker.png";
import Wedding from "../../assets/svg/wedding-rings.png";
import Death from "../../assets/svg/death.png";
import House from "../../assets/svg/house.png";
import Business from "../../assets/svg/business.png";
import Education from "../../assets/svg/education.png";
import Astrology from "../../assets/svg/astrology.png";
import LostnFound from "../../assets/svg/lostnfind.png";
import Tender from "../../assets/svg/tender.png";
import NameChange from "../../assets/svg/namechange.png";
import Vehicle from "../../assets/svg/vehical.png";
import Travel from "../../assets/svg/travel.png";

const section = () => {
  return (
    <section className='home__page__second__section'>
      <span className='section__heading'>
        <h2>Top Ads Category.</h2>
        <p>These are the mose popular categories.</p>
      </span>
      <div className='grid__items '>
        <div className="grid__item  flex  flex-aic">
          <img src={JobSeeker} alt="job seeker" className='svg' />
          <span>
            <p className='cat__name'>Recruitment / job</p>
            <p className='cat__desc'>Publish your Classified Text/Display Ads in any Popular Newspaper</p>
          </span>
        </div>
        <div className="grid__item  flex  flex-aic">
          <img src={Wedding} alt="Metrimonial" className='svg' />
          <span>
            <p className='cat__name'>Metrimonial</p>
            <p className='cat__desc'>Publish your Classified Text/Display Ads in any Popular Newspaper</p>
          </span>
        </div>
        <div className="grid__item  flex  flex-aic">
          <img src={Death} alt="Obituary" className='svg' />
          <span>
            <p className='cat__name'>Obituary (Death)</p>
            <p className='cat__desc'>Publish your Classified Text/Display Ads in any Popular Newspaper</p>
          </span>
        </div>
        <div className="grid__item  flex  flex-aic">
          <img src={House} alt="Property Sale" className='svg' />
          <span>
            <p className='cat__name'>Property Sale</p>
            <p className='cat__desc'>Publish your Classified Text/Display Ads in any Popular Newspaper</p>
          </span>
        </div>
        <div className="grid__item  flex  flex-aic">
          <img src={Business} alt="Business" className='svg' />
          <span>
            <p className='cat__name'>Business</p>
            <p className='cat__desc'>Publish your Classified Text/Display Ads in any Popular Newspaper</p>
          </span>
        </div>
        <div className="grid__item  flex  flex-aic">
          <img src={Education} alt="Education" className='svg' />
          <span>
            <p className='cat__name'>Education</p>
            <p className='cat__desc'>Publish your Classified Text/Display Ads in any Popular Newspaper</p>
          </span>
        </div>
        <div className="grid__item  flex  flex-aic">
          <img src={Astrology} alt="Astrology" className='svg' />
          <span>
            <p className='cat__name'>Astrology</p>
            <p className='cat__desc'>Publish your Classified Text/Display Ads in any Popular Newspaper</p>
          </span>
        </div>
        <div className="grid__item  flex  flex-aic">
          <img src={LostnFound} alt="Lost & Found" className='svg' />
          <span>
            <p className='cat__name'>Lost & Found</p>
            <p className='cat__desc'>Publish your Classified Text/Display Ads in any Popular Newspaper</p>
          </span>
        </div>
        <div className="grid__item  flex  flex-aic">
          <img src={Tender} alt="Tender / Notice" className='svg' />
          <span>
            <p className='cat__name'>Tender / Notice</p>
            <p className='cat__desc'>Publish your Classified Text/Display Ads in any Popular Newspaper</p>
          </span>
        </div>
        <div className="grid__item  flex  flex-aic">
          <img src={NameChange} alt="Name Change" className='svg' />
          <span>
            <p className='cat__name'>Name Change</p>
            <p className='cat__desc'>Publish your Classified Text/Display Ads in any Popular Newspaper</p>
          </span>
        </div>
        <div className="grid__item  flex  flex-aic">
          <img src={Vehicle} alt="Vehical Sale" className='svg' />
          <span>
            <p className='cat__name'>Vehical Sale</p>
            <p className='cat__desc'>Publish your Classified Text/Display Ads in any Popular Newspaper</p>
          </span>
        </div>

        <div className="grid__item  flex  flex-aic">
          <img src={Travel} alt="Tourism" className='svg' />
          <span>
            <p className='cat__name'>Tourism</p>
            <p className='cat__desc'>Publish your Classified Text/Display Ads in any Popular Newspaper</p>
          </span>
        </div>




      </div>
    </section>
  )
}

export default section;