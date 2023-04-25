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
                emailID: emailID
            }
        });


        return server_response.data;
    }



    // check_recent_cotacts
    static check_active_contact = () => {
        const storage_data = localStorage.getItem("CONTACT_INSTANCE");
        const contact_instance = JSON.parse(storage_data);
        const date = new Date();

        if (!contact_instance) {
            return false;
        }



        if ((date.getTime() / 1000) > contact_instance.expire_time) {
            localStorage.removeItem("CONTACT_INSTANCE");
            return false;
        } else {
            console.log(contact_instance);
            return true;
        }
    }



    // create_new_contact_instance
    static create_new_contact_instance = () => {
        const INSTANCE = {
            hasContacted: true,
            expire_time: null,
        };

        const date = new Date();

        if (this.check_active_contact() === false) {
            let timestamp = new Date(Date.UTC(date.getFullYear(), date.getMonth(), (date.getDate() + 2), date.getHours(), date.getMinutes(), date.getSeconds()));
            INSTANCE.expire_time = timestamp.getTime() / 1000;

            localStorage.setItem("CONTACT_INSTANCE",JSON.stringify(INSTANCE));
            return true;
        }else{
            return false;
        }
    }
}