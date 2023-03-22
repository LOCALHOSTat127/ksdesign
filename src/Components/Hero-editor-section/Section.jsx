import React from 'react'
import "./style.css";


import SnakeLine from "../../assets/svg/snakeline.svg";
import BgImg from "../../assets/svg/hero-editor.svg";

export const Section = () => {
    return (
        <div className='Hero__section__third '>
            <div className='contect__section flex fd-col  flex-jcfs'>
                <h2>Edit,Customise,
                    <br />
                    Preview.</h2>

                <p>Have the ability to Edit,Customise & Preview ads with our <span>AD-editor</span>.
                    Live Quotation results & Hassell free payment.</p>
                    <button id='editor__btn'>
                        Get Quotation online
                    </button>
                    <img src={SnakeLine} className='snake__line'/>
            </div>

            <div className='img__section'>
                <img src={BgImg} alt="SectionSvg" />
            </div>


        </div>
    )
}
