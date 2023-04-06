
import axios from 'axios';
import { InvoiceNumber } from 'invoice-number'
import { store } from "../../app/store";

import { set_payment_response } from "../../app/features/ad_config/ad_booking_config_slice";

export default class Payment_Provider {

    // class-variables
    static payment_script_class_ids = [];
    static payment_script_urls = [
        "https://checkout.razorpay.com/v1/checkout.js",

    ]

    static PAYMENT_ROUTES = {
        create_order: "http://172.20.10.2:5050/payment/create_order",
        payment_verification: "http://172.20.10.2:5050/payment/verify_payment",
        payment_status_verification: "http://172.20.10.2:5050/payment/validate_payment_status"
    }



    // Load-payment-script
    static loadPaymentScript = () => {
        this.payment_script_urls.forEach((url, index) => {
            let script = document.createElement("script");
            script.className = `payment_script_${index}`;
            script.src = url;

            script.onload = () => {
                this.payment_script_class_ids.push(`payment_script_${index}`);
                console.log(`payment_script_${index} Loaded.`);
            }

            script.onerror = () => {
                console.log(`Error while loading payment_script_${index}  removing it`);
                document.body.removeChild(script);
            }


            document.body.appendChild(script);
        })
        console.clear();
        return true;
    }


    // unload-payment-script
    static unloadPaymentScript = () => {
        this.payment_script_class_ids.forEach((ids, index) => {
            ;
            document.getElementsByClassName(ids)[0].remove();
            console.log(`payment_script_${index} unloaded`);
        })

        console.clear();
    }


    // generate-recept-number
    static genetateReeptNumber = () => {
        // fetch last used recept number here...
        return InvoiceNumber.next('2023/04/ABC001');
    }


    // generate-order
    static generateNewOrder = async (order_config) => {
        // Fetching new order from the Server.
        let new_order = await axios({
            method: 'post',
            url: this.PAYMENT_ROUTES.create_order,
            headers: {
                "Content-Type": "Application/json",
                "Accept": "Application/json",

                // API_KEY_INCREPTED
                Authorization: 'Bearer ' + process.env.REACT_APP_BACKEND_API_KEY,
            },
            data: {
                amount: order_config.amount,
                currency: order_config.currency,
                receipt: this.genetateReeptNumber(),
            }
        });


        // Validating status
        if (new_order.status !== 200) {
            return {
                isOrderCreated: false,
            }
        } else {
            return {
                isOrderCreated: true,
                order_id: new_order.data.id,
                portel_type: new_order?.data.entity,
                amount: new_order.data.amount,
                currency: new_order?.data?.currency,
                payment_status: new_order?.data?.status,
                customer_name: order_config?.customer_name,
                customer_email: order_config?.customer_email,
                customer_phone: order_config?.customer_phone,
                description: "Test Transisation",
                cb_url: "http://172.20.10.2:3000",
                on_popup_close: this.handle_popup_closed,
                handler_function: this.handle_payment_verification_order_creation,
            }
        }
    }


    // on_popup_closed
    static handle_popup_closed = () => {
        // display error on screen 
        // and ask for payment retry.
        // if yes. reinitiate_payment.
        // else, redirect
        alert("Popup closed by you...");

        // store paymet config in globle store
        // re-initiate payment with same order_id if user says yes otherwise redirect.

    }


    static handle_payment_verification_order_creation = async (ad_config) => {


        const response = await axios({
            method: "post",
            url: this.PAYMENT_ROUTES.payment_verification,
            headers: {
                "Content-Type": "Application/json",
                "Accept": "Application/json",

                // API_KEY_INCREPTED
                Authorization: 'Bearer ' + process.env.REACT_APP_BACKEND_API_KEY,
            },
            data: {
                ad_config: ad_config

            }
        });

        
        console.log(response);
        return response.data;


    }





    // init_payment_box
    static init_payment_options = (new_order) => {
        const PAYMENT_OPTIONS = {
            key: process.env.REACT_APP_RAZORPAY_KEY_ID,
            amount: new_order?.amount,
            currency: new_order?.currency,
            name: "KSdesign",
            description: new_order?.description,
            image: "https://assets.stickpng.com/images/62cc1d95150d5de9a3dad5fa.png",
            // order_id: new_order.order_id,
            "handler": async function (response) {
               
                const payment_data = {
                    payment_id: "pay_29QQoUBi66xm2f",
                    order_id: "order_9A33XWu170gUtm",
                    signature: "9ef4dffbfd84f1318f6739a3ce19f9d85851857ae648f114332d8401e0949a3d"
                };

                store.dispatch(set_payment_response(payment_data));
                let ad_config = store.getState().ad_booking_config;
                const ad_config_data = {
                    cat_id: ad_config.FIRST_STEP.CATEGORY_SELECTION_STEP.config_info.category_id,
                    cat_name: ad_config.FIRST_STEP.CATEGORY_SELECTION_STEP.config_info.category_name,
                    ad_type: ad_config.FIRST_STEP.AD_TYPE_SELECTION_STEP.config_info.ad_type,
                    newspaper_configuration: ad_config.FIRST_STEP.PAPER_EDITION_SELECTION_STEP.config_info,
                    ad_compose_configuration: ad_config.SECOND_STEP.config_info,
                    payment_configuration: {
                        dates: ad_config.THIRD_STEP.config_info.selected_dates,
                        contact_detaild: ad_config.THIRD_STEP.config_info.customer_contact_info,
                        offers: ad_config.THIRD_STEP.config_info.selected_offer,
                        documents_bucket: ad_config.THIRD_STEP.config_info.documents,
                        captured_payment: ad_config.THIRD_STEP.config_info.payment_config.response
                    }
                }

                let server_response = await new_order.handler_function(ad_config_data);


                let url = `http://172.20.10.2:3000/ad/publish/paymentVerification?orderID=${server_response.orderID}`;
                window.location.replace(url);

            },
            prefill: {
                name: new_order?.customer_name || null,
                email: new_order?.customer_email || null,
                contact: new_order?.customer_phone || null
            },
            notes: {
                address: "KSdesign Corporate Office"
            },
            theme: {
                color: "#3399cc"
            },
            "modal": {
                "ondismiss": function () {
                    new_order.on_popup_close();
                }
            }
        }

        return PAYMENT_OPTIONS;
    }



    // open_payment_box
    static open_payment_window = (payment_options) => {
        let rzp_window = window.Razorpay(payment_options);
        rzp_window.open();
    }



    // verify_payment_status
    static verify_payment_status = async (orderID) => {
  
        let server_response = await axios({
            method: 'post',
            url: "http://172.20.10.2:5050/payment/validate_payment_status",
            headers: {
                "Content-Type": "Application/json",
                "Accept": "Application/json",

                // API_KEY_INCREPTED
                Authorization: 'Bearer ' + process.env.REACT_APP_BACKEND_API_KEY,
            },
            data: {
                orderID: orderID
            }
        });

      
        // handling_error
        if (server_response.data?.error) {
            return false;
        }
        return server_response.data;

    }
}