export default class URLS {

    


    // payment_urls
    static PAYMENT_ROUTES = {
        create_order: `${process.env.REACT_APP_SERVER_URI}:${process.env.REACT_APP_SERVER_PORT}/payment/create_order`,
        payment_verification: `${process.env.REACT_APP_SERVER_URI}:${process.env.REACT_APP_SERVER_PORT}/payment/verify_payment`,
        payment_status_verification: `${process.env.REACT_APP_SERVER_URI}:${process.env.REACT_APP_SERVER_PORT}/payment/validate_payment_status`,
        generate_receite_id : `${process.env.REACT_APP_SERVER_URI}:${process.env.REACT_APP_SERVER_PORT}/payment/generate_receite_id`,
    }


    // databse_urls
    static COMMUNICATION_ROUTES = {
        send_order_confirmation_Self : `${process.env.REACT_APP_SERVER_URI}:${process.env.REACT_APP_SERVER_PORT}/communication/new_order_self_mail`
    }
}