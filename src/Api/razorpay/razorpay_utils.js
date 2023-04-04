import axios from 'axios';
import { InvoiceNumber } from 'invoice-number'

export default class Payment_Provider {
    
    // class-variables
    static payment_script_class_ids = [];
    static payment_script_urls = [
        "https://checkout.razorpay.com/v1/checkout.js",
    ]

    static PAYMENT_ROUTES = {
        create_order: "http://172.20.10.2:5050/payment/create_order"
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
        if (new_order.status != 200) {
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


    



    // init_payment_box
    static init_payment_options = (new_order) => {
        const PAYMENT_OPTIONS = {
            key: process.env.REACT_APP_RAZORPAY_KEY_ID,
            amount: new_order?.amount,
            currency: new_order?.currency,
            name: "KSdesign",
            description: new_order?.description,
            handler: function (response) {
                //  store paymet_response into db insted of alert and then redirect to verify page.
                // retrive these details on that page and verify on server.
                alert(response.razorpay_payment_id);
                window.location.href = "http://172.20.10.2:3001";
            },
            image: "https://assets.stickpng.com/images/62cc1d95150d5de9a3dad5fa.png",
            // order_id: new_order.order_id,
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
}