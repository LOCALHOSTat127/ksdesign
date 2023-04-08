import { useEffect } from 'react'
import "./style.css";
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { mark_ad_type_step_status, set_ad_type_step_config } from "../../../app/features/ad_config/ad_booking_config_slice";

import AD_TYPES from "../../../data/classified_cards.json";


const SelectAdType = () => {
  const NAVIGATE = useNavigate();
  const dispatch = useDispatch();
  const ad_state = useSelector((state) => state.ad_booking_config);




  // STEP_FORWARD_HANDLER
  const STEP_FORWARD_HANDLER = (e) => {
    dispatch(set_ad_type_step_config(e.target.dataset.adType));
    dispatch(mark_ad_type_step_status(true));

    if (ad_state.FIRST_STEP.CATEGORY_SELECTION_STEP.isDone === true) {
     
      NAVIGATE(`/ad/select/newspaper`,{replace:true})
    } else {
      NAVIGATE(`/ad/select/category`);
    }

  }


  return (
    <section className="selectADtype">
      <div className="text__heading">
        <h2 className="heading">Select AD Type</h2>
        <p className='pera'>Select AD Type which best suets your needs.</p>

      </div>
      <div className="adtypes__list">
        <div className="adtypeslider">
          {
            AD_TYPES.map((({ id,ad_type_name, ad_type_desc, ad_type_img, ad_type }) => {
              return (
                <>
                  <div key={id} className="adtype__card">
                    <div
                      style={{
                        backgroundImage: `url(${` ${process.env.PUBLIC_URL}${ad_type_img}`})`,
                        backgroundSize: "contain",
                        backgroundPosition: "center center",
                        backgroundRepeat: "no-repeat",
                        objectFit: "contain"
                      }}
                      className="img__outer">

                    </div>
                    <div className="card__content">
                      <h2 className="card__heading">{ad_type_name}</h2>
                      <p className="card__desc">{ad_type_desc}</p>
                      <Button
                        data-ad-type={ad_type}
                        sx={{
                          padding: "10px 10px",
                          width: "100%",
                          borderRadious: "none",
                          color: "white",
                          backgroundColor: "#bd0975",
                          textTransform: "uppercase",
                          fontWeight: "600"

                        }} id="display__sample"
                        disableElevation
                        variant="contained"
                        onClick={STEP_FORWARD_HANDLER}

                      >
                        Select & Compose AD
                      </Button>
                    </div>
                  </div>
                </>
              )
            }))
          }
        </div>
      </div>
    </section>
  )
}

export default SelectAdType