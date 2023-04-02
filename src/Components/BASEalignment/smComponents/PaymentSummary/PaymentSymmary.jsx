import React from 'react'


import { ReactComponent as RightArrow } from "../../../../assets/svg/right-arrow.svg";
const PaymentSymmary = () => {
    return (
        <>
            <div className="section__summary__payment component__div">
                <div className="heading__outer">
                    <h2>BOOKING SUMMARY</h2>
                    <p>Please verify your Ad Booking details before proceeding for payment.</p>
                </div>
                <div className="payment__inner inner__section">
                    <div className="ad__symmary">

                        <div className="upper">
                            <p>AD Category</p>

                        </div>
                        <div className="lower">
                            <p>AD text</p>
                        </div>


                        <div className="ad_Cat">
                            <p className="ad_cat contant">Obituary , Shraadh</p>

                        </div>

                        <div className="ad_txt">
                            <p className="ad_txt contant">(Name) left for (His/Her) heavenly abode on (Date) at (Location). He will be deeply remembered for his dsdmsk ms. He is mourned by his (Names of Family Members/ Friends/ Relatives).</p>
                        </div>

                    </div>
                    <div className="payment__summary">
                        <div className="location_">
                            <div className="header">
                                <p>Newspaper - Location</p>
                            </div>
                            <div className="locations">
                                <ul>
                                    <li className="paper__editions">Telegraph - Siliguri</li>
                                    <li className="paper__editions">Telegraph - Siliguri</li>
                                    <li className="paper__editions">Telegraph - Siliguri</li>
                                </ul>
                            </div>
                        </div>
                        <div className="payment__summary_info">

                            <div className="header">
                                <p>COST Summary</p>
                            </div>
                            <div className="cost__summary">
                                <span className="total__chars summary__item">
                                    <p>Total Chars</p>
                                    <p id="total__chars__int" className='int__value'> 180</p>
                                </span>
                                <span className="colors__marker__border summary__item">
                                    <p>Colors/Border</p>
                                    <p id="pallet__enhancement__cost" className='int__value'>₹{" "}231</p>
                                </span>
                                <span className="special__enhancement summary__item">
                                    <p>Special Enhancement</p>
                                    <p id="special__enhancement__cost" className='int__value'>₹{" "}100</p>
                                </span>
                                <span className="cost__before__tax summary__item">
                                    <p>Cost Before GST</p>
                                    <p id="cost__before__tax" className='int__value'>₹{" "}511</p>
                                </span>

                                <button className="payment__btn">
                                    Total Price
                                    <div className="heilight">
                                        <p className="total__final__price">
                                            ₹{" "}4,790
                                        </p>
                                        <RightArrow className='sm__svg' />
                                    </div>
                                </button>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PaymentSymmary