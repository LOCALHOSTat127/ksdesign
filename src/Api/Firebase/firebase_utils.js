import axios from "axios";
export default class firebase_provider {
    static send_order_confirmation_self = async (orderID) => {
        let server_response = await axios({
            method: 'post',
            url: "http://172.20.10.2:5050/communication/new_order_self_mail",
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

        console.log(server_response.data);
        return server_response.data;
    }
}