import "./home.css";


import Navbar from "../../Components/Navbar/Navbar";
import HeroSection from "../../Components/HeroSection/HeroSection";


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
    </>
  )
}

export default Home;