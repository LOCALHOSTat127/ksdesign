export default class Firebase_Utils {
    static get_bucket_uri = (user_first_name,user_phone) => {
        let date = new Date();
        const temp_bucket_uri = (user_first_name + "_" + user_phone + date.getDate() + '' + (date.getMonth() + 1) + '' + date.getFullYear() + '' + date.getHours() + '' + date.getMinutes() + '' + date.getSeconds());
        return temp_bucket_uri;
    }
}