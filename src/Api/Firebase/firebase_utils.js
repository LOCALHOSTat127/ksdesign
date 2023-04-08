import axios from 'axios';
import URLS from "../urls/urls_config";
export default class Firebase_Utils {
    static get_bucket_uri = (user_first_name, user_phone) => {
        let date = new Date();
        const temp_bucket_uri = (user_first_name + "_" + user_phone + date.getDate() + '' + (date.getMonth() + 1) + '' + date.getFullYear() + '' + date.getHours() + '' + date.getMinutes() + '' + date.getSeconds());
        return temp_bucket_uri;
    }


    // get_newspapers_list
    static get_newspapers = async () => {
        let server_response = await axios({
            method: 'get',
            url: URLS.DATABASE_ROUTES.get_newspapers,
            headers: {
                "Content-Type": "Application/json",
                "Accept": "Application/json",

                // API_KEY_INCREPTED
                Authorization: 'Bearer ' + process.env.REACT_APP_BACKEND_API_KEY,
            },
        });
        return server_response.data;
    }

    // fetch_editions_by_nid
    static fetch_editions_by_nid = async (NID) => {
        let server_response = await axios({
            method: 'post',
            url: URLS.DATABASE_ROUTES.get_editions_by_nid,
            headers: {
                "Content-Type": "Application/json",
                "Accept": "Application/json",

                // API_KEY_INCREPTED
                Authorization: 'Bearer ' + process.env.REACT_APP_BACKEND_API_KEY,
            },
            data: {
                NID: NID
            }
        });

        return server_response.data;
    }
}