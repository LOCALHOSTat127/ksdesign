import React from 'react'
import "./style.css";


import Auto from "../../assets/svg/auto.svg";
import Tv from "../../assets/svg/tv.svg";
import Radio from "../../assets/svg/radio.svg";
import Outdoor from "../../assets/svg/outdoor.svg";
import Newspaper from "../../assets/svg/newspaper.svg";


const ServicesSection = () => {
    return (
        <section className="services__section" id="services">
            <div className="services">
                <div className="service">
                    <img src={Newspaper} alt="" srcset="" />
                    <p className="txt">Newspaper</p>
                </div>
                <div className="service">
                    <img src={Auto} alt="" srcset="" />
                    <p className="txt">Auto/E-Riksha</p>
                </div>
                <div className="service">
                    <img src={Radio} alt="" srcset="" />
                    <p className="txt">Radio</p>
                </div>
                <div className="service">
                    <img src={Outdoor} alt="" srcset="" />
                    <p className="txt">Outdoor</p>
                </div>
                <div className="service">
                    <img src={Outdoor} alt="" srcset="" />
                    <p className="txt">Outdoor</p>
                </div>
                <div className="service">
                    <img src={Radio} alt="" srcset="" />
                    <p className="txt">Radio</p>
                </div>
                <div className="service">
                    <img src={Auto} alt="" srcset="" />
                    <p className="txt">Telivision</p>
                </div>
                <div className="service">
                    <img src={Newspaper} alt="" srcset="" />
                    <p className="txt">Newspaper</p>
                </div>
                <div className="service">
                    <img src={Auto} alt="" srcset="" />
                    <p className="txt">Telivision</p>
                </div>
                <div className="service">
                    <img src={Newspaper} alt="" srcset="" />
                    <p className="txt">Newspaper</p>
                </div>
            </div>
        </section>
    )
}

export default ServicesSection