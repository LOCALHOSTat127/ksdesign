import React from 'react'
import "./sections.css";

import {ReactComponent as Newspaper} from "../../assets/svg/newspaper-blue-svg.svg";
import {ReactComponent as Radio} from "../../assets/svg/radio-blue-svg.svg";
import {ReactComponent as Outdoor} from "../../assets/svg/outdoor-blue-svg.svg";
import {ReactComponent as Tv} from "../../assets/svg/tv-blue-svg.svg";


const section = () => {
  return (
    <section className='home__page__second__section'>
      <span>
        <h2>Top Ads Category.</h2>
        <p>These are the mose popular categories.</p>
      </span>
      <div className='grid__items '>
        <div className="grid__item  flex fd-col flex-aic flex-jcc">
          <Newspaper className='svg'/>
          <p>Newspaper</p>
        </div>
        <div className="grid__item flex fd-col flex-aic flex-jcc">
          <Radio className='svg'/>
          <p>Radio</p>
        </div>
        <div className="grid__item flex fd-col flex-aic flex-jcc">
          <Outdoor className='svg'/>
          <p>Outdoor</p>
        </div>
        <div className="grid__item flex fd-col flex-aic flex-jcc">
          <Tv className='svg'/>
          <p>Telivision</p>
        </div>
        <div className="grid__item flex fd-col flex-aic flex-jcc">
          <Radio className='svg'/>
          <p>Radio</p>
        </div>
        <div className="grid__item flex fd-col flex-aic flex-jcc">
          <Outdoor className='svg'/>
          <p>Outdoor</p>
        </div>
        <div className="grid__item flex fd-col flex-aic flex-jcc">
          <Newspaper className='svg'/>
          <p>Newspaper</p>
        </div>
        <div className="grid__item flex fd-col flex-aic flex-jcc">
          <Tv className='svg'/>
          <p>Telivision</p>
        </div>
      </div>
    </section>
  )
}

export default section;