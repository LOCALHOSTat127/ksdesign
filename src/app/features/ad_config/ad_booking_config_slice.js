import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    FIRST_STEP: {
        isDone: false,
        parent_step_name: "AD_CONFIG_SELECTION",

        CATEGORY_SELECTION_STEP: {
            isDone: false,
            child_step_name: "AD_CATEGORY_SELECTION",
            step_url: "http://172.20.10.2:3001/ad/select/category",
            prev_step: null,
            next_step: "AD_TYPE",

            config_info: {
                category_name: null,
                category_id: null,
            }
        },

        AD_TYPE_SELECTION_STEP: {
            isDone: false,
            child_step_name: "AD_TYPE_SELECTION",
            step_url: "http://172.20.10.2:3001/ad/select/adtype",
            prev_step: "AD_CATEGORY",
            next_step: "PAPER_PACKAGE_EDITION",

            config_info: {
                ad_type: null,
            }
        },

        PAPER_EDITION_SELECTION_STEP: {
            isDone: false,
            child_step_name: "AD_EDITION_SELECTION",
            step_url: "http://172.20.10.2:3001/ad/select/newspaper",
            prev_step: "AD_TYPE",
            next_step: "SECOND_STEP_COMPOSE_AD",


            config_info: {
                newspaper_name: null,
                newspaper_id: null,
                selected_editions: [
                    {
                        edition_name: null,
                        edition_id: null,
                        edition_seperator: null,
                        edition_per_sep_price: null,
                        edition_extra_price: null,
                    }
                ],
                selected_package: {
                    package_name: null,
                    package_id: null,
                    package_sep: null,
                    package_per_sep_price: null,
                    package_extra_price: null
                },
            }
        }

    },
    SECOND_STEP: {
        isDone: false,
        parent_step_name: "COMPOSE_AD",
        prev_step: "PAPER_PACKAGE_EDITION",
        next_step: "PAYMENT_PAGE",

        config_info: {
            ad_text: null,
            pallet_config: {
                isBgClr: false,
                bg_color_charge: null,
                isBorder: false,
                border_charge: null,
                isMarker: false,
                marker_charge: null,
            },
            stats: {
                words_count: 0,
                chars_count: 0,
                price_before_payment_page: 0,
                base_price: 0,
            },
            special_enhancement: {
                isEmail: false,
                email_id_charge: 0,
                isPhone: true,
                phone_number_charge: 0,
            },
            heading_config: {
                major_heading: null,
                minor_heading: null,
                sub_heading: null,
            }
        }


    },
    THIRD_STEP: {
        isDone: false,
        parent_step_name: "PAYMENT_PAGE",
        prev_step: "SECOND_STEP_COMPOSE_AD",
        next_step: null,

        config_info: {
            selected_dates: [],
            customer_contact_info: {
                contact_email: null,
                contact_person_name: null,
                contact_phone: null,
            },
            selected_offer: null,
            documents: {
                bucket_uri : null,
                docs : []
            },
            cost_summary: {
                base_price: 0,
                special_enhancement_charge: 0,
                colors_borders_charge: 0,
                tax_amount: 0,
                total_price: 0
            },
            payment_config: {
                isPaymentDone: false,
                isVerified: false,
                response: {
                    razorpay_payment_id: null,
                    razorpay_order_id: null,
                    razorpay_signature: null,
                }

            }

        }

    },

}


export const ad_booking_config = createSlice({
    name: "ad_booking_config",
    initialState,
    reducers: {
        // first_step_reducers
        // 1 :
        mark_first_step_status: (state, action) => {
            state.FIRST_STEP.isDone = action.payload;
        },
        // 1.1
        mark_ad_cat_step_status: (state, action) => {
            state.FIRST_STEP.CATEGORY_SELECTION_STEP.isDone = action.payload;
        },
        set_ad_cat_step_config: (state, action) => {
            state.FIRST_STEP.CATEGORY_SELECTION_STEP.config_info.category_id = action.payload.cat_id;
            state.FIRST_STEP.CATEGORY_SELECTION_STEP.config_info.category_name = action.payload.cat_name;
        },
        // 1.2
        mark_ad_type_step_status: (state, action) => {
            state.FIRST_STEP.AD_TYPE_SELECTION_STEP.isDone = action.payload;
        },
        set_ad_type_step_config: (state, action) => {
            state.FIRST_STEP.AD_TYPE_SELECTION_STEP.config_info.ad_type = action.payload.ad_type;
        },
        // 1.3
        mark_paper_info_step_status: (state, action) => {
            state.FIRST_STEP.PAPER_EDITION_SELECTION_STEP.isDone = action.payload;
        },
        set_paper_basic_info: (state, action) => {
            state.FIRST_STEP.PAPER_EDITION_SELECTION_STEP.config_info.newspaper_id = action.payload.nid;
            state.FIRST_STEP.PAPER_EDITION_SELECTION_STEP.config_info.newspaper_name = action.payload.paperName;
        },
        set_paper_editions: (state, action) => {
            state.FIRST_STEP.PAPER_EDITION_SELECTION_STEP.config_info.selected_editions = action.payload;
        },
        set_paper_package: (state, action) => {
            state.FIRST_STEP.PAPER_EDITION_SELECTION_STEP.config_info.selected_package = action.payload;
        },
        // 2
        mark_compose_step_status: (state, action) => {
            state.SECOND_STEP.isDone = action.payload;
        },
        // 2.1
        set_compose_step_config: (state, action) => {
            state.SECOND_STEP.config_info.ad_text = action.payload.ad_textFieldClasses;

            if (action.payload.pallet?.isBgClr === true) {
                state.SECOND_STEP.config_info.pallet_config.isBgClr = action.payload.pallet.isBgClr;
                state.SECOND_STEP.config_info.pallet_config.bg_color_charge = action.payload.pallet.bg_color_charge;
            }


            if (action.payload.pallet?.isBorder === true) {
                state.SECOND_STEP.config_info.pallet_config.isBorder = action.payload.pallet.isBorder;
                state.SECOND_STEP.config_info.pallet_config.border_charge = action.payload.pallet.border_charge;
            }

            if (action.payload.pallet?.isMarker === true) {
                state.SECOND_STEP.config_info.pallet_config.isMarker = action.payload.pallet.isMarker;
                state.SECOND_STEP.config_info.pallet_config.marker_charge = action.payload.pallet.marker_charge;
            }
        },

        // 2.2
        set_ad_stats: (state, action) => {
            state.SECOND_STEP.config_info.stats.base_price = action.payload.base_price;
            state.SECOND_STEP.config_info.stats.price_before_payment_page = action.payload.price_before_payment_page;
            state.SECOND_STEP.config_info.stats.words_count = action.payload.words_count;
            state.SECOND_STEP.config_info.stats.chars_count = action.payload.chars_count;
        },
        // 2.3
        set_special_enhancement: (state, action) => {
            if (action.payload?.isEmail != null) {
                state.SECOND_STEP.config_info.special_enhancement.isEmail = action.payload?.isEmail;
                state.SECOND_STEP.config_info.special_enhancement.email_id_charge = action.payload.email_id_charge;
            }

            if (action.payload?.isPhone != null) {
                state.SECOND_STEP.config_info.special_enhancement.isPhone = action.payload?.isPhone;
                state.SECOND_STEP.config_info.special_enhancement.phone_number_charge = action.payload.phone_number_charge;
            }
        },
        // 2.4
        set_heading_config: (state, action) => {
            state.SECOND_STEP.config_info.heading_config.major_heading = action.payload?.major_heading ? action.payload?.major_heading : null;
            state.SECOND_STEP.config_info.heading_config.minor_heading = action.payload?.minor_heading ? action.payload?.minor_heading : null;
            state.SECOND_STEP.config_info.heading_config.sub_heading = action.payload?.sub_heading ? action.payload?.sub_heading : null;
        },

        // 3
        mark_payment_step_status: (state, action) => {
            state.THIRD_STEP.isDone = action.payload;
        },
        // 3.1
        set_paymet_page_config: (state, action) => {
            state.THIRD_STEP.config_info.selected_dates = action.payload.selected_dates;
            state.THIRD_STEP.config_info.customer_contact_info = action.payload.customer_contact_info;
            state.THIRD_STEP.config_info.selected_offer = action.payload?.selected_offer;
            state.THIRD_STEP.config_info.documents = action.payload?.documents;
            state.THIRD_STEP.config_info.cost_summary = action.payload.cost_summary;
        },

        // 3.2
        isPaymentDone: (state, action) => {
            state.THIRD_STEP.config_info.payment_config.isPaymentDone = action.payload;
        },
        isPaymentVerified: (state, action) => {
            state.THIRD_STEP.config_info.payment_config.isVerified = action.payload;
        },
        set_payment_response: (state, action) => {
            state.THIRD_STEP.config_info.payment_config.response = action.payload;
        },
        set_bucket_uri : (state,action) =>{
            state.THIRD_STEP.config_info.documents.bucket_uri = action.payload;
        },
        get_bucket_uri : (state) =>{
            return (state.THIRD_STEP.config_info.documents.bucket_uri);
        },
        push_bucket_doc : (state,action) =>{
            state.THIRD_STEP.config_info.documents.docs.push(action.payload);
        }
    }
})


export const { mark_first_step_status, mark_ad_cat_step_status, set_ad_cat_step_config, mark_ad_type_step_status, set_ad_type_step_config, mark_paper_info_step_status, set_paper_basic_info, set_paper_editions, set_paper_package, mark_compose_step_status, set_compose_step_config, set_ad_stats, set_special_enhancement, set_heading_config, mark_payment_step_status, set_paymet_page_config, isPaymentDone, isPaymentVerified, set_payment_response,set_bucket_uri,get_bucket_uri,push_bucket_doc } = ad_booking_config.actions;
export default ad_booking_config.reducer;




