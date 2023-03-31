import React from 'react'
import "./style.css";
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';


const SelectAdType = () => {
  const NAVIGATE = useNavigate();

  return (
    <section className="selectADtype">
      <div className="text__heading">
        <h2 className="heading">Select AD Type</h2>
        <p className='pera'>Select AD Type which best suets your needs.</p>

      </div>
      <div className="adtypes__list">
        <div className="adtypeslider">
          <div className="adtype__card">
            <div
              style={{
                backgroundImage: `url(${` ${process.env.PUBLIC_URL}/Assets/png/ad_cat_1.png`})`,
                backgroundSize: "contain",
                backgroundPosition: "center center",
                backgroundRepeat: "no-repeat",
                objectFit: "contain"
              }}
              className="img__outer">

            </div>
            <div className="card__content">
              <h2 className="card__heading">Classified Text Ads</h2>
              <p className="card__desc">Text based Classified Ads are best to Advertise information in  with minimal charges yet impactful.</p>
              <Button sx={{
                padding: "10px 10px",
                width: "100%",
                borderRadious: "none",
                color: "white",
                backgroundColor: "black",
                textTransform: "uppercase",
                fontWeight: "600"

              }} id="display__sample"
                disableElevation
                variant="contained"
                onClick={((e) => {
                  NAVIGATE('/ad/compose/textad')
                })}

              >
                Select & Compose AD
              </Button>
            </div>
          </div>
          <div className="adtype__card">
            <div
              style={{
                backgroundImage: `url(${` ${process.env.PUBLIC_URL}/Assets/png/ad_cat_2.png`})`,
                backgroundSize: "contain",
                backgroundPosition: "center center",
                backgroundRepeat: "no-repeat",
                objectFit: "contain"
              }}
              className="img__outer">

            </div>
            <div className="card__content">
              <h2 className="card__heading">Classified Display Ads</h2>
              <p className="card__desc">Text based Classified Ads are best to Advertise information in  with minimal charges yet impactful.</p>
              <Button sx={{
                padding: "10px 10px",
                width: "100%",
                borderRadious: "none",
                color: "white",
                backgroundColor: "black",
                textTransform: "uppercase",
                fontWeight: "600"

              }} id="display__sample"
                disableElevation
                variant="contained"
                onClick={((e) => {
                  NAVIGATE('/ad/compose/textad')
                })}
              >
                Select & Compose AD
              </Button>
            </div>
          </div>
          <div className="adtype__card">
            <div
              style={{
                backgroundImage: `url(${` ${process.env.PUBLIC_URL}/Assets/png/ad_cat_3.png`})`,
                backgroundSize: "contain",
                backgroundPosition: "center center",
                backgroundRepeat: "no-repeat",
                objectFit: "contain"
              }}
              className="img__outer">

            </div>
            <div className="card__content">
              <h2 className="card__heading">Display Ads</h2>
              <p className="card__desc">Text based Classified Ads are best to Advertise information in  with minimal charges yet impactful.</p>
              <Button sx={{
                padding: "10px 10px",
                width: "100%",
                borderRadious: "none",
                color: "white",
                backgroundColor: "black",
                textTransform: "uppercase",
                fontWeight: "600"

              }}
                id="display__sample"
                disableElevation
                variant="contained"
                onClick={((e) => {
                  NAVIGATE('/ad/compose/textad')
                })}
              >
                Select & Compose AD
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SelectAdType