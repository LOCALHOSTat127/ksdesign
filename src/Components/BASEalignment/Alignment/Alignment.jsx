import React from 'react'
import './style.css';


import StepsBar from '../smComponents/StepsBar/StepsBar';
import EditorText from '../TextAdEDITOR/EditorText';
import {Section as SelectADcategory} from "../SelectCategory/Section";



const Alignment = () => {
    const [isActive,setActive] = React.useState(0);

    return (
        <section className="alignment__outer">
            <div className="alignment__inner">
                <div className="stepsbar__outer area flex flex-aic">
                    <StepsBar currentStep  isLongLable={true} />
                </div>
                <div className="layout__section__outer area">
                    {isActive === 1 ? <EditorText/> : <SelectADcategory/>} 
                    
                </div>
            </div>
        </section>
    )
}

export default Alignment;