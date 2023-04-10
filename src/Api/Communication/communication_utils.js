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

        return server_response.data;
    }


    // send_full_mail_query
    static send_full_mail_query = async (query_details) => {
        let server_response = await axios({
            method: 'post',
            url: 'http://172.20.10.2:5000/communication/full_contact_query',
            headers: {
                "Content-Type": "Application/json",
                "Accept": "Application/json",

                // API_KEY_INCREPTED
                Authorization: 'Bearer ' + process.env.REACT_APP_BACKEND_API_KEY,
            },
            data: {
                first_name: query_details.first_name,
                last_name: query_details.last_name,
                phone: query_details.phone,
                user_email: query_details.emailid,
                reason_to_contact: query_details.reason_to_contact
            }
        });


        return server_response.data;
    }




    // send_full_mail_query
    static send_small_mail_query = async (emailID) => {
        let server_response = await axios({
            method: 'post',
            url: 'http://172.20.10.2:5000/communication/small_contact_query',
            headers: {
                "Content-Type": "Application/json",
                "Accept": "Application/json",

                // API_KEY_INCREPTED
                Authorization: 'Bearer ' + process.env.REACT_APP_BACKEND_API_KEY,
            },
            data: {
                emailID : emailID
            }
        });


        return server_response.data;
    }
}