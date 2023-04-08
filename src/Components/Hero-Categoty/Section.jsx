import "./style.css";
import categories from "../../data/categories.json";


export const Section = ({ padZero, headingNone, mt, borderRadious, ONCLICKHANDLER, bgnone }) => {

  return (
    <section
      style={{
        padding: `${padZero === 1 ? "0px" : null}`,
      }}
      className={`home__page__second__section ${bgnone && 'transBG'}`} id='category'>
      <span style={{
        display: `${headingNone && "none"}`
      }} className='section__heading'>
        <h2>Top Ads Category in Newspaper.</h2>
        <p>These are the mose popular categories.</p>
      </span>
      <div style={{
        marginTop: `${mt && mt}px`,
      }} className='grid__items '>
        {categories &&
          categories.map(({ id, src, alt, name, decs, category__id }) => {
            return (
              <>
                <div key={id} style={{

                  borderRadius: `${borderRadious && borderRadious}px`,
                }}
                  onClick={ONCLICKHANDLER}
                  data-cid={category__id}
                  data-cname={name}
                  className="grid__item  flex  flex-aic">
                  <img src={process.env.PUBLIC_URL + src} alt={alt} className='svg' />
                  <span>
                    <p className='cat__name'>{name}</p>
                    <p style={{
                      width: "100%",

                    }} className='cat__desc'>{decs}</p>
                  </span>
                </div>
              </>
            )
          })}
        <div className="grid__item  flex  flex-aic flex-jcc">
          <span key={123} style={{
            alignItems: "center"
          }}>
            <p className='cat__name'>More Category</p>
          </span>
        </div>
      </div>
    </section>
  )
}



