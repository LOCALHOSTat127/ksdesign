import React from 'react'
import './style.css';


import StepsBar from '../smComponents/StepsBar/StepsBar';
import EditorText from '../TextAdEDITOR/EditorText';
import {Section as SelectADcategory} from "../SelectCategory/Section";
import { Outlet } from 'react-router-dom';



const Alignment = () => {


    return (
        <section className="alignment__outer">
            <div className="alignment__inner">
                <div className="stepsbar__outer area flex flex-aic">
                    <StepsBar currentStep  isLongLable={true} />
                </div>
                <div className="layout__section__outer area">
                    <Outlet/>
                </div>
            </div>
        </section>
    )
}

export default Alignment;