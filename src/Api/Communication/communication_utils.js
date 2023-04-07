import axios from "axios";
import URLS from "../urls/urls_config";
export default class Communication_provider {
    static send_order_confirmation_self = async (orderID) => {
        let server_response = await axios({
            method: 'post',
            url: URLS.COMMUNICATION_ROUTES.send_order_confirmation_Self,
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