import {useState,useEffect} from 'react'
import './style.css';
import Navbar from "../../Components/Navbar/Navbar";
import Alignment from '../../Components/BASEalignment/Alignment/Alignment';
import Footer from "../../Components/Footer/Footer";

const ADbaseComponent = () => {
  return (
    <section className="base_page__outer">
        {/* AdComponent-Alignment Component */}
        <Alignment/>    
    </section>
  )
}

export default ADbaseComponent;