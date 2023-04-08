import { useEffect } from 'react'
import "./style.css";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Section as CategoryList } from "../../Hero-Categoty/Section";
import {mark_ad_cat_step_status,set_ad_cat_step_config} from "../../../app/features/ad_config/ad_booking_config_slice";


export const Section = () => {
    const dispatch = useDispatch();
    const ad_state = useSelector((state) => state.ad_booking_config);

    let navigate = useNavigate();
    const STEP_FORWARD_HANDLER = (e) => {
        if(!e.target.offsetParent.dataset.cid || !e.target.offsetParent.dataset.cname){
            alert("Please Select again.");
            return 0;
        }

        dispatch(set_ad_cat_step_config({
            cat_id : e.target.offsetParent.dataset.cid,
            cat_name : e.target.offsetParent.dataset.cname
        }))
        dispatch(mark_ad_cat_step_status(true));
        if (ad_state.FIRST_STEP.AD_TYPE_SELECTION_STEP.isDone === true) {
            navigate(`/ad/select/newspaper`);
        } else {
            navigate(`/ad/select/adtype?cat_id=${e.target.offsetParent.dataset.cid}&cat_name=${e.target.offsetParent.dataset.cname}`);
        }
    }

    return (
        <section className="select__ad__category">
            <div className="text__heading">
                <h2 className="heading">Select AD Category</h2>
                <p className='pera'>Select Category which best suets your needs.</p>

            </div>

            <div className="category__list">
                <CategoryList padZero={1} ONCLICKHANDLER={STEP_FORWARD_HANDLER} headingNone={1} mt={10} borderRadious={4} bgnone={true} />
            </div>
        </section>
    )
};

