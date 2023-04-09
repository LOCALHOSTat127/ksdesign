

import { ReactComponent as BoltSvg } from "../../../../assets/svg/deal.svg";
import { ReactComponent as OfferSvg } from "../../../../assets/svg/offer.svg";
import Calender from '../calender/calender';
import "./style.css";

const SelectDateSection = () => {

    return (
        <>
            <div className="section__date__selector component__div">
                <div className="heading__outer">
                    <h2>CHOOSE YOUR DATES & INSERTIONS</h2>
                    <p>Select from any Special Insertion Offer(s) if applicable.</p>
                </div>
                <div className="date__inner inner__section">
                    <div className="calender">
                        <Calender />
                    </div>
                    <div className="offers">
                        <div className="flatter__row">
                            <BoltSvg className='sm__svg' />
                            <p>Special Offer(s) - Select to apply</p>
                        </div>
                        {/* offers here... */}

                        <div className="offers__list">
                            <div className="offer_wrapper">
                                <OfferSvg className='sm__svg' />
                                <p >Buy ads for 7 Days & get 2 Days free</p>
                            </div>
                            <div className="offer_wrapper">
                                <OfferSvg className='sm__svg' />
                                <p >Buy ads for 7 Days & get 2 Days free</p>
                            </div>
                            <div className="offer_wrapper">
                                <OfferSvg className='sm__svg' />
                                <p >Buy ads for 7 Days & get 2 Days free</p>
                            </div>
                        
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default SelectDateSection