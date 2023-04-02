import { useState } from 'react'

import { ReactComponent as BoltSvg } from "../../../../assets/svg/deal.svg";
import { ReactComponent as CutSvg } from "../../../../assets/svg/cut.svg";

const SelectDateSection = () => {
    const [dates, setDates] = useState([{date : "11/02/2023"},{date : "11/05/2023"},{date : "11/05/2023"}]);
    const removeDate = (e) =>{
        let localDates = [];
        const ID = e.target.offsetParent.id;

        localDates = dates.filter((dateobj,index) =>{
           if(index != ID){
            return dateobj;
           }
        })

        setDates((prev) => prev = localDates);
    }

    return (
        <>
            <div className="section__date__selector component__div">
                <div className="heading__outer">
                    <h2>CHOOSE YOUR DATES & INSERTIONS</h2>
                    <p>Select from any Special Insertion Offer(s) if applicable.</p>
                </div>
                <div className="date__inner inner__section">
                    <div className="calender">

                    </div>
                    <div className="offers">
                        <div className="flatter__row">
                            <BoltSvg className='sm__svg' />
                            <p>Special Offer(s) - Select to apply</p>
                        </div>
                        {/* offers here... */}
                    </div>
                    <div className="selected__dates__row">
                        {dates.map((({date},index) => {
                            console.log(index);
                            return (
                                <div id={index} key={index} className="date" onClick={removeDate}>
                                    <CutSvg  className='sm__svg' />
                                    <p className="date__meta">{date}</p>
                                </div>
                            )
                        }))}

                    </div>
                </div>
            </div>
        </>
    )
}

export default SelectDateSection