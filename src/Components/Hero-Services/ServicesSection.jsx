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
            <span className='section__heading'>
                <h2>Services we offer.</h2>
                <p>Explore from our wide range of services.</p>
            </span>

            <div className="services">
                <div className="service">
                    <img src={Newspaper} alt="Newspaper" />
                    <p className="txt">Newspaper</p>
                </div>
                <div className="service">
                    <img src={Auto} alt="Auto/E-Riksha" />
                    <p className="txt">Auto/E-Riksha</p>
                </div>
                <div className="service">
                    <img src={Radio} alt="Radio" />
                    <p className="txt">Radio</p>
                </div>
                <div className="service">
                    <img src={Tv} alt="Telivision" />
                    <p className="txt">Telivision</p>
                </div>
                <div className="service">
                    <img src={Outdoor} alt="Outdoor" />
                    <p className="txt">Outdoor</p>
                </div>
                <div className="service">
                    <img src={Radio} alt="Radio" />
                    <p className="txt">Radio</p>
                </div>
                <div className="service">
                    <img src={Auto} alt="Telivision" />
                    <p className="txt">Telivision</p>
                </div>
                <div className="service">
                    <img src={Newspaper} alt="Newspaper" />
                    <p className="txt">Newspaper</p>
                </div>
                <div className="service">
                    <img src={Auto} alt="Telivision" />
                    <p className="txt">Telivision</p>
                </div>
                <div className="service">
                    <img src={Newspaper} alt="Newspaper" />
                    <p className="txt">Newspaper</p>
                </div>
            </div>
        </section>
    )
}

export default ServicesSection