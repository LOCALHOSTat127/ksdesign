import "./home.css";





import HeroSection from "../../Components/HeroSection/HeroSection";
import { Section as AdCategory } from "../../Components/Hero-Categoty/Section";
import { Section as ClassifiedCategory } from "../../Components/Hero-Classified-Category/Section";
import { Section as EditorAd } from "../../Components/Hero-editor-section/Section";
import ServicesSection from "../../Components/Hero-Services/ServicesSection";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { mark_ad_cat_step_status, set_ad_cat_step_config } from "../../app/features/ad_config/ad_booking_config_slice";
import Services from "../../Components/Services_page_section/Services";


const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const STEP_FORWARD_HANDLER = (e) => {
    if (!e.target.offsetParent.dataset.cid) {
      alert("Please select again.");
      return 0;
    }

    dispatch(set_ad_cat_step_config({
      cat_id: e.target.offsetParent.dataset.cid,
      cat_name: e.target.offsetParent.dataset.cname
    }))
    dispatch(mark_ad_cat_step_status(true));

    navigate(`/ad/select/adtype?cat_id=${e.target.offsetParent.dataset.cid}&cat_name=${e.target.offsetParent.dataset.cname}`);

  }


  return (
    <>
      <div className='Home__page__outer flex' >
        <div className='inter__container'>
          {/* Hero Section */}
          <HeroSection />
        </div>


      </div>
      {/* Home page other Sections */}
      <Services  paddown={true} isFull={false} />
      <AdCategory ONCLICKHANDLER={STEP_FORWARD_HANDLER} />
      <ClassifiedCategory />
      <EditorAd />
    </>
  )
}

export default Home;
