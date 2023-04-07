import "./home.css";





import HeroSection from "../../Components/HeroSection/HeroSection";
import {Section as AdCategory} from "../../Components/Hero-Categoty/Section";
import {Section as ClassifiedCategory} from "../../Components/Hero-Classified-Category/Section";
import {Section as EditorAd} from "../../Components/Hero-editor-section/Section";
import ServicesSection from "../../Components/Hero-Services/ServicesSection";



const Home = () => {
 

  return (
    <>
      <div className='Home__page__outer flex' >
        <div className='inter__container'>  
        {/* Hero Section */}
        <HeroSection/>
        </div>
      
      
      </div>
      {/* Home page other Sections */}
      <AdCategory/>
      <ClassifiedCategory/>
      <EditorAd/>
      <ServicesSection/>
    </>
  )
}

export default Home;