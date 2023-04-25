export default class URLS {




    // payment_urls
    static PAYMENT_ROUTES = {
        create_order: `${process.env.REACT_APP_SERVER_URI}:${process.env.REACT_APP_SERVER_PORT}/payment/create_order`,
        payment_verification: `${process.env.REACT_APP_SERVER_URI}:${process.env.REACT_APP_SERVER_PORT}/payment/verify_payment`,
        payment_status_verification: `${process.env.REACT_APP_SERVER_URI}:${process.env.REACT_APP_SERVER_PORT}/payment/validate_payment_status`,
        generate_receite_id: `${process.env.REACT_APP_SERVER_URI}:${process.env.REACT_APP_SERVER_PORT}/payment/generate_receite_id`,
    }


    // communication_routes
    static COMMUNICATION_ROUTES = {
        send_order_confirmation_Self: `${process.env.REACT_APP_SERVER_URI}:${process.env.REACT_APP_SERVER_PORT}/communication/new_order_self_mail`
    }

    // database_routes
    static DATABASE_ROUTES = {
        get_newspapers: `${process.env.REACT_APP_SERVER_URI}:${process.env.REACT_APP_SERVER_PORT}/db/get_newspapers`,
        get_editions_by_nid: `${process.env.REACT_APP_SERVER_URI}:${process.env.REACT_APP_SERVER_PORT}/db/get_editions`,
        get_editions_list: `${process.env.REACT_APP_SERVER_URI}:${process.env.REACT_APP_SERVER_PORT}/db/get_editions_price_list`,
        get_packages_list: `${process.env.REACT_APP_SERVER_URI}:${process.env.REACT_APP_SERVER_PORT}/db/get_packages_list`,
    }
}
