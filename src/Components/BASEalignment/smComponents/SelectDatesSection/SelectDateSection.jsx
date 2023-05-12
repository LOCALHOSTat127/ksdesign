import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ReactComponent as BoltSvg } from "../../../../assets/svg/deal.svg";
import { ReactComponent as OfferSvg } from "../../../../assets/svg/offer.svg";
import Calender from '../calender/calender';
import "./style.css";

const SelectDateSection = () => {
    const ad_state = useSelector((state) => state.ad_booking_config);
    const [selectedOffer, setOfferSelected] = useState(null);
    const [OFFERS, SETOFFERS] = useState(null);


    const renderOffers = () => {
        let offer_items = 0;
        let offers_list = [];

        if (ad_state.FIRST_STEP.PAPER_EDITION_SELECTION_STEP.config_info.selected_editions[0] !== null) {
            offer_items = ad_state.FIRST_STEP.PAPER_EDITION_SELECTION_STEP.config_info.selected_editions[0].schemes.length;
            for (let i = 0; i < offer_items; i++) {
                offers_list.push(ad_state.FIRST_STEP.PAPER_EDITION_SELECTION_STEP.config_info.selected_editions[0].schemes[i]);
            }

            SETOFFERS(offer_items > 0 ? offers_list : null);
        }
    }


    const availOffer = (e) => {
        if (e) {
            let selectedofferid = e.target.dataset.id;
            let offers_wrapper = document.getElementsByClassName('offers__list')[0].childNodes;
            if (e.target.classList.contains("selected") === true) {
                e.target.classList.remove("selected");
                e.target.offsetParent.style = "background : #ffffff";
                e.target.offsetParent.childNodes[2].style = 'display : flex';
                e.target.offsetParent.childNodes[3].style = 'display : none';
                setOfferSelected(null);
            } else {
                offers_wrapper.forEach((offer, index) => {
                    if (index == selectedofferid) {
                        offer.childNodes[0].classList.add("selected");
                        offer.style = "background : #004cff3b";
                        offer.childNodes[2].style = 'display : none';
                        offer.childNodes[3].style = 'display : flex';
                        setOfferSelected(OFFERS[index]);
                    } else {
                        offer.childNodes[0].classList.remove("selected");
                        offer.style = "background : #ffffff";
                        offer.childNodes[2].style = 'display : flex';
                        offer.childNodes[3].style = 'display : none';
                    }
                })
            }

        }
    }


    useEffect(() => {
        renderOffers();
    }, [])

    return (

        <div className="section__date__selector component__div">
            <div className="heading__outer">
                <h2>CHOOSE YOUR DATES & INSERTIONS</h2>
                <p>Select from any Special Insertion Offer(s) if applicable.</p>
            </div>
            <div className="date__inner inner__section">

                <div className="calender">
                    <Calender OFFER_CONFIG={selectedOffer} />
                </div>
                <div className="offers">
                    <div className="flatter__row">
                        <BoltSvg className='sm__svg' />
                        <p>Special Offer(s) - Select to apply</p>
                    </div>
                    {/* offers here... */}

                    <div className="offers__list">
                        {
                            OFFERS !== null ?
                                OFFERS.map(((offer, index) => {
                                    return (

                                        <div key={index} data-id={index} className="offer_wrapper">
                                            <div onClick={availOffer} data-id={index} className="over__board"></div>
                                            <OfferSvg data-id={index} className='sm__svg' />
                                            <p className='offer_line' data-id={index} >{offer.schem_desc} @  ₹{" "}{offer.basePrice}</p>
                                            <p className="selected_offer_line">Offer Selected</p>
                                        </div>
                                    )
                                })) :
                                <p style={{
                                    color: "#1e1c1c",
                                    fontSize: "16px",
                                }} >No offers found!</p>
                        }
                    </div>
                </div>
            </div>

        </div>

    )
}

export default SelectDateSection