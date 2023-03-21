import React from 'react'
import "./sectionthree.css";

import SectionSvg from "../../assets/img/edit-customise-svg.png";
import SnakeLine from "../../assets/img/snakeline.svg";
const SectionThree = () => {
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
                <img src={SectionSvg} alt="SectionSvg" srcset="" />
            </div>


        </div>
    )
}

export default SectionThree;