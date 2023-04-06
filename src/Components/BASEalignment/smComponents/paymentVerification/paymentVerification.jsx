import "./style.css";
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import Payment_Provider from "../../../../Api/razorpay/razorpay_utils";
import firebase_provider from '../../../../Api/Firebase/firebase_utils';
import StatusStep from '../StepsBar/statusStep';


import send_mail_png from "../../../../assets/png/send_mail_notify.png";
import order_not_found from "../../../../assets/png/order_not_found.jpg"


const steps = ["Payment Verification", "Sending Confirmation Email", "AD Published"];
const order_state = ["CONFIRMING", "CONFIRMED", "ORDER_NOT_FOUND", "ALL_SET"];

const PaymentVerification = () => {

    const [orderState, setOrderState] = useState(order_state[0]);
    const [isLoading, setLoading] = useState([true, true, true]);
    const [orderId, setOrderId] = useState(null);
    const [isStill, setStill] = useState([false, true, true]);
    const [startTimer, setTimer] = useState(false);
    const [timerCount, setTImerCount] = useState(10);
    let [searchParams, setSearchParams] = useSearchParams();



    const start_timer = () => {
        setTimer(true);
        setInterval(() => {
            setTImerCount((prev) => prev - 1);

        }, 1000);

        setTimeout(() => {
            window.location.replace("http://172.20.10.2:3000");
        }, 10000)
    }





    // verify_payment_flow
    const validate_payment_flow = async () => {
        const orderID = searchParams.get("orderID");
        setOrderId(orderID);

        if (orderID === null) {
            setOrderState("ORDER_NOT_FOUND");
        } else {
            let response = await Payment_Provider.verify_payment_status(orderID);

            if (response === false) {
                setOrderState("ORDER_NOT_FOUND");
                return;
            }

            if (response.status === 200) {
                setLoading([false, true, true]);
                setStill([true, true, true]);

                if (response.is_order_active === true && response.is_order_confirmation_done === false) {
                    setLoading([false, true, true]);
                    setStill([true, false, true]);

                    const response_status = await firebase_provider.send_order_confirmation_self(orderID);

                    if (response_status.status === 200) {
                        setLoading([false, false, false]);
                        setStill([true, true, true]);

                        start_timer();
                    }
                } else {
                    // order_already_confirmed
                    setOrderState("CONFIRMED");
                }
            } else {
                setOrderState("ORDER_NOT_FOUND");
            }
        }
    }



    useEffect(() => {
        validate_payment_flow();
    }, [searchParams])


    return (
        <section className='payment_verification' >
            <div className="heading__outer">
                <h2>Payment is Being Confirmed.</h2>
                <p>Please Do not refresh Page.</p>
            </div>
            <div className="payment_status_component">
                <div className='status_indigator'>
                    {
                        orderState === "CONFIRMING" ?
                            <>
                                {
                                    steps.map(((step, index) => {
                                        return (
                                            <StatusStep
                                                key={index}
                                                stepTxt={step}
                                                isStill={isStill[index]}
                                                isLoading={isLoading[index]}
                                                isLast={index === (steps.length - 1) ? true : false}
                                            />
                                        )
                                    }))
                                }
                            </> : orderState === "CONFIRMED" ?
                                <>
                                    <strong>Your Order is Already Verified</strong>
                                    <p style={{
                                        fontSize: "13px",
                                        display: "flex",
                                        alignItems: "center"
                                    }}>Please contact Team if have any questions regarding your order :<p style={{
                                        background: "#95cbed",
                                        fontWeight: "500",
                                        padding: "5px 8px",
                                        borderRadius: "4px",
                                    }}>{orderId}</p></p>
                                </> :
                                orderState === "ORDER_NOT_FOUND" ?
                                    <>
                                        <strong>No order found!</strong>
                                        <p style={{
                                            fontSize: "13px",
                                            display: "flex",
                                            alignItems: "center"
                                        }}>Please contact Team if have any questions regarding your order :<p style={{
                                            background: "#95cbed",
                                            fontWeight: "500",
                                            padding: "5px 8px",
                                            borderRadius: "4px",
                                        }}>{orderId ? orderId : "no_order_id"}</p></p>
                                    </> : null
                    }

                    <p style={{
                        display: `${startTimer === true ? "flex" : "none"}`
                    }} className="redirect_timer">Redirecting in {timerCount}</p>
                </div>
                <div className="img">
                    <img alt='side_image' src={orderState === "ORDER_NOT_FOUND" ? order_not_found : send_mail_png} />
                </div>
            </div>
        </section >
    )
}

export default PaymentVerification
// {noOrderFound === false ?




