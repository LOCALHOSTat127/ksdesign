import { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux';
import Payment_Provider from '../../../../Api/razorpay/razorpay_utils';
import CircularProgress from '@mui/material/CircularProgress';
import { ReactComponent as RightArrow } from "../../../../assets/svg/right-arrow.svg";



const PaymentSymmary = () => {

    const ad_state = useSelector((state) => state.ad_booking_config);
  

    const [paymentInitilising, setPaymentInitilized] = useState(false);

    // Handling-payment-initilization
    const checkOutPayment = async (e) => {
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
            amount: 50000,
            currency: 'INR',
            customer_name: "Sahil Joshi",
            customer_email: "sahiljoshi6378@gmail.com",
            customer_phone: "7852099185",
        });

       

        let options = Payment_Provider.init_payment_options(new_order);
        // opening-payment-box
        Payment_Provider.open_payment_window(options);
        Payment_Provider.unloadPaymentScript();
      
        setPaymentInitilized(false);
        


    }

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

                        <div className="ad_txt">
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

                                <button disabled={paymentInitilising === true ? true : false} onClick={checkOutPayment}
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
                                                        ₹{" "}4,790
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