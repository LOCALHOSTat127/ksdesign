import "./home.css";


import Navbar from "../../Components/Navbar/Navbar";
import HeroSection from "../../Components/HeroSection/HeroSection";
import {Section as AdCategory} from "../../Components/Hero-Categoty/Section";
import {Section as ClassifiedCategory} from "../../Components/Hero-Classified-Category/Section";
import {Section as EditorAd} from "../../Components/Hero-editor-section/Section";
import {Section as LogoSlider} from "../../Components/Hero-Slider/Section";
import Footer from "../../Components/Footer/Footer";


const Home = () => {


  return (
    <>
      <div className='Home__page__outer flex' >
        <div className='inter__container'>
        {/* App Navbar */}
        <Navbar />

        
        {/* Hero Section */}
        <HeroSection/>
        </div>
      
      
      </div>
      {/* Home page other Sections */}
      <AdCategory/>
      <ClassifiedCategory/>
      <EditorAd/>
      <LogoSlider/>

      {/* Footer */}
      <Footer/>
    </>
  )
}

export default Home;