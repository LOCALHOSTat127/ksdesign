import { configureStore } from "@reduxjs/toolkit";
import adBookingReducer from "./features/ad_config/ad_booking_config_slice";

export const store = configureStore({
    reducer :{
        ad_booking_config : adBookingReducer,
    }
})