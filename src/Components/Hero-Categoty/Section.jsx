import { useState, useEffect } from 'react'
import "./style.css";
import categories from "../../data/categories.json";


export const Section = () => {








  return (
    <section className='home__page__second__section'>
      <span className='section__heading'>
        <h2>Top Ads Category.</h2>
        <p>These are the mose popular categories.</p>
      </span>
      <div className='grid__items '>
        {categories &&
          categories.map(({ id, src, alt, name, decs }) => {
            return (
              <>
                <div key={id} id={id} className="grid__item  flex  flex-aic">
                  <img src={process.env.PUBLIC_URL + src} alt={alt} className='svg' />
                  <span>
                    <p className='cat__name'>{name}</p>
                    <p className='cat__desc'>{decs}</p>
                  </span>
                </div>
              </>
            )
          })}
        <div className="grid__item  flex  flex-aic flex-jcc">
          <span style={{
            alignItems:"center"
          }}>
            <p className='cat__name'>More Category</p>
          </span>
        </div>
      </div>
    </section>
  )
}



// <div className="grid__item  flex  flex-aic">
// {/* <img src={Travel} alt="Tourism" className='svg' /> */}
// <span>
//   <p className='cat__name'>More Category</p>
// </span>
// </div>

