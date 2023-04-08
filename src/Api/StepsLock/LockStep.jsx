import { useNavigate, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";


import React from 'react'

const LockStep = ({ component, TYPE }) => {
  const ad_state = useSelector((state) => state.ad_booking_config);

  if (TYPE === "PAYMENT_PAGE") {
    if (ad_state.FIRST_STEP.isDone === true && ad_state.SECOND_STEP.isDone === true) {
      return (
        component
      )
    } else {
      return (
        < Navigate to="/" />
      )
    }
  } else if (TYPE === "COMPOSE_AD") {
    if (ad_state.FIRST_STEP.isDone === true) {
      return (
        component
      )
    } else {
      return (
        < Navigate to="/ad/select/category" />
      )
    }
  } else if (TYPE === "SELECT_AD_NEWSPAPER") {
    if (ad_state.FIRST_STEP.CATEGORY_SELECTION_STEP.isDone === true && ad_state.FIRST_STEP.AD_TYPE_SELECTION_STEP.isDone === true) {
      return (
        component
      )
    } else {

      if (ad_state.FIRST_STEP.CATEGORY_SELECTION_STEP.isDone === true && ad_state.FIRST_STEP.AD_TYPE_SELECTION_STEP.isDone === false) {
        return (
          <Navigate to="/ad/select/adtype" />
        )
      } else if (ad_state.FIRST_STEP.CATEGORY_SELECTION_STEP.isDone === false && ad_state.FIRST_STEP.AD_TYPE_SELECTION_STEP.isDone === true) {
        return (
          <Navigate to="/ad/select/category" />
        )
      } else {
        return (
          <Navigate to="/ad/select/category" />
        )
      }
    }
  } else {
    return (component)
  }







}

export default LockStep;