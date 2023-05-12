import { useEffect, useState } from 'react'

import { useSelector } from 'react-redux';
import Payment_Provider from '../../../../Api/razorpay/razorpay_utils';
import CircularProgress from '@mui/material/CircularProgress';
import { ReactComponent as RightArrow } from "../../../../assets/svg/right-arrow.svg";



const PaymentSymmary = () => {

    const ad_state = useSelector((state) => state.ad_booking_config);
    const [baseprice, setbaseprice] = useState(0);
    const [gst, setGst] = useState(0);
    const [specialEnhansmentPrice, SetpecialEnhansmentPrice] = useState(0);
    const [discountedBasePrice, setDisBasePrice] = useState(false);
    const [finalTotal, setFinalTotal] = useState(0);
    const [bgclrCharge, setbgClrCharge] = useState(0);
    const [tickCharge, setTickCharge] = useState(0);
    const [paymentInitilising, setPaymentInitilized] = useState(false);


    const check_for_errors = () =>{
        return false;
    }
 


    // Handling-payment-initilization
    const checkOutPayment = async (e) => {
     
        if (check_for_errors() === false) {
            if (window.navigator.onLine === false) {
                alert("Please Check your Internet Connection.");
                return;
            }

            setPaymentInitilized(true);
            if (Payment_Provider.loadPaymentScript() === false) {
                console.log("Some scripts couldn't be loaded.");
                return 0;
            }

         

            let new_order = await Payment_Provider.generateNewOrder({
                amount: finalTotal*100,
                currency: 'INR',
                customer_name: ad_state.THIRD_STEP.config_info.customer_contact_info.contact_person_name,
                customer_email: ad_state.THIRD_STEP.config_info.customer_contact_info.contact_email,
                customer_phone: ad_state.THIRD_STEP.config_info.customer_contact_info.contact_phone,
            });

            console.log(new_order);
            let options = Payment_Provider.init_payment_options(new_order);
            // opening-payment-box
            Payment_Provider.open_payment_window(options);
            Payment_Provider.unloadPaymentScript();

            setPaymentInitilized(false);
        }
    }







    const build_payment_summary = () => {
        let final_price = 0;
        let price_befor_tax = 0;
        let tax_payble = 0;
        let bgclr_charge = ad_state.SECOND_STEP.config_info.pallet_config.bg_color_charge;
        let marker_charge = ad_state.SECOND_STEP.config_info.pallet_config.marker_charge;
        let special_charges = 0;
     



        if (ad_state.SECOND_STEP.config_info.special_enhancement.isTranslation === true) {
            special_charges += ad_state.SECOND_STEP.config_info.special_enhancement.translation_charge
        }
        if (ad_state.SECOND_STEP.config_info.special_enhancement.isInBuildPhoto === true) {
            special_charges += ad_state.FIRST_STEP.PAPER_EDITION_SELECTION_STEP.config_info.selected_editions !== null ? 
            ad_state.FIRST_STEP.PAPER_EDITION_SELECTION_STEP.config_info.selected_editions[0].misc_config.isInBuiltPhoto : 
            ad_state.FIRST_STEP.PAPER_EDITION_SELECTION_STEP.config_info.selected_package.complete_package.misc_config.isInBuiltPhoto;
        }

        
      


     


        // checking for any discount
        if (ad_state.SECOND_STEP.config_info.special_enhancement.isDiscount === true) {
            final_price = ad_state.SECOND_STEP.config_info.discount.discount_type === "percent" ?
                (ad_state.SECOND_STEP.config_info.stats.base_price - Math.round((ad_state.SECOND_STEP.config_info.stats.base_price * ad_state.SECOND_STEP.config_info.discount.discount) / 100)) : ad_state.SECOND_STEP.config_info.stats.base_price - ad_state.SECOND_STEP.config_info.discount.discount;
            
                setDisBasePrice(final_price);
       
            } else {
            final_price = ad_state.SECOND_STEP.config_info.stats.base_price;
        }

        price_befor_tax = (final_price + bgclr_charge + marker_charge + special_charges);

        tax_payble = Math.round(price_befor_tax * 5 / 100);
        setbgClrCharge(bgclr_charge);
        setTickCharge(marker_charge);
        SetpecialEnhansmentPrice(special_charges);
        setbaseprice(ad_state.SECOND_STEP.config_info.stats.base_price);
        setGst(tax_payble);
        setFinalTotal(price_befor_tax + tax_payble);
    }




    useEffect(() => {
        if (ad_state) {
  
            build_payment_summary();
        }
    }, [])

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
                            <p className="ad_cat contant">{ad_state.FIRST_STEP.CATEGORY_SELECTION_STEP.config_info.category_name}</p>

                        </div>

                        <div className="ad_Txt">
                            <p className="ad_txt contant">{ad_state.SECOND_STEP.config_info.ad_text}</p>
                        </div>

                    </div>
                    <div className="payment__summary">
                        <div className="location_">
                            <div className="header">
                                <p>Newspaper - Location</p>
                            </div>
                            <div className="locations">
                                <ul>
                                    <li className="paper__editions">{ad_state.FIRST_STEP.PAPER_EDITION_SELECTION_STEP.config_info.selected_editions !== null ? `${ad_state.FIRST_STEP.PAPER_EDITION_SELECTION_STEP.config_info.newspaper_name} - ${ad_state.FIRST_STEP.PAPER_EDITION_SELECTION_STEP?.config_info?.selected_editions[0]?.edition_name}` : `Package - ${ad_state.FIRST_STEP.PAPER_EDITION_SELECTION_STEP.config_info.selected_package.pacakge_name}`}</li>
                                </ul>
                            </div>
                        </div>
                        <div className="payment__summary_info">

                            <div className="header">
                                <p>COST Summary</p>
                            </div>
                            <div className="cost__summary">
                                <span className="total__chars summary__item">
                                    <p>Base Price</p>
                                    <p id="base_price_int" className='int__value'>
                                        {discountedBasePrice === false ?
                                            <>
                                                ₹{" "}{baseprice}
                                            </>
                                            : <>
                                                <div style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: "12px"
                                                }}>
                                                    <p style={{
                                                        fontWeight: "400",
                                                        fontSize: "14px",
                                                        textDecoration: "line-through",
                                                        color: "#686868"
                                                    }} className="original__price"> ₹{" "}{baseprice}</p>
                                                    <p className="dis__price"> ₹{" "}{discountedBasePrice}</p>
                                                </div>
                                            </>}
                                    </p>
                                </span>
                                <span className="colors__marker__border summary__item">
                                    <p>Colors/Tick</p>
                                    <p id="pallet__enhancement__cost" className='int__value'>₹{" "}{bgclrCharge + tickCharge}</p>
                                </span>
                                <span className="special__enhancement summary__item">
                                    <p>Special Enhancement</p>
                                    <p id="special__enhancement__cost" className='int__value'>₹{" "}{specialEnhansmentPrice}</p>
                                </span>
                                <span className="cost__before__tax summary__item">
                                    <p>GST (5%)</p>
                                    <p id="cost__before__tax" className='int__value'>₹{" "}{gst}</p>
                                </span>

                                <button  onClick={checkOutPayment}
                                    className="payment__btn" id='payment_btn'>
                                    Total Price
                                    {
                                        paymentInitilising === true ?
                                            <>
                                                <CircularProgress size={20} />
                                            </> :
                                            <>
                                                <div className="heilight">

                                                    <p className="total__final__price">
                                                        ₹{" "}{finalTotal}
                                                    </p>
                                                    <RightArrow className='sm__svg' />
                                                </div>
                                            </>
                                    }
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