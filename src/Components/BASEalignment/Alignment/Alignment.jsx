import React from 'react'
import './style.css';


import StepsBar from '../smComponents/StepsBar/StepsBar';
import EditorText from '../TextAdEDITOR/EditorText';



const Alignment = () => {


 



    return (
        <section className="alignment__outer">
            <div className="alignment__inner">
                <div className="stepsbar__outer area flex flex-aic">
                    <StepsBar  isLongLable={true} />
                </div>
                <div className="editor__window__outer area">
                    <EditorText/>
                </div>
                {/* requird-info */}
                <div className="required__info__outer area">
                    requird info
                </div>
            </div>
        </section>
    )
}

export default Alignment;