import { useEffect } from 'react'
import "./style.css";
import Button from '@mui/material/Button';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { mark_ad_type_step_status, set_ad_type_step_config } from "../../../app/features/ad_config/ad_booking_config_slice";
const SelectAdType = () => {
  const NAVIGATE = useNavigate();
  const dispatch = useDispatch();
  const ad_state = useSelector((state) => state.ad_booking_config);

  const AD_TYPES = [
    {
      ad_type_name: "Classified Text Ads",
      ad_type_desc: "Text based Classified Ads are best to Advertise information in  with minimal charges yet impactful.",
      ad_type_img: "/Assets/png/ad_cat_1.png",
      ad_type: "classified_text"
    },
    {
      ad_type_name: "Classified Display Ads",
      ad_type_desc: "Text based Classified Ads are best to Advertise information in  with minimal charges yet impactful.",
      ad_type_img: "/Assets/png/ad_cat_2.png",
      ad_type: "classified_display"
    },
    {
      ad_type_name: "Display Ads",
      ad_type_desc: "Text based Classified Ads are best to Advertise information in  with minimal charges yet impactful.",
      ad_type_img: "/Assets/png/ad_cat_3.png",
      ad_type: "display_ad"
    }
  ]



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
            AD_TYPES.map((({ ad_type_name, ad_type_desc, ad_type_img, ad_type }) => {
              return (
                <>
                  <div className="adtype__card">
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