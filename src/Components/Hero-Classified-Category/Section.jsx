import "./style.css";
import AD_TYPES from "../../data/classified_cards.json";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { mark_ad_type_step_status, set_ad_type_step_config } from "../../app/features/ad_config/ad_booking_config_slice";

export const Section = () => {
    const NAVIGATE = useNavigate();
    const dispatch = useDispatch();
    const ad_state = useSelector((state) => state.ad_booking_config);


    const STEP_FORWARD_HANDLER = (e) => {
        let card = document.getElementById(e.target.dataset.cardId);
        dispatch(set_ad_type_step_config(card.dataset.adType));
        dispatch(mark_ad_type_step_status(true));


        if (ad_state.FIRST_STEP.CATEGORY_SELECTION_STEP.isDone === true) {
            window.scrollTo(0, 0);
            NAVIGATE(`/ad/select/newspaper`, { replace: true })
        } else {
            window.scrollTo(0, 0);
            NAVIGATE(`/ad/select/category`);
        }

    }

    return (
        <div className='category__outer'>
            <span className='section__heading'>
                <h2>Book Classified Text Ads</h2>
                <p>Classified Text/Display ads to promote your serivces or products.</p>
            </span>
            <div className="cards">
                {AD_TYPES &&
                    AD_TYPES.map(({ id, ad_type_name, ad_type_desc, ad_type_img, ad_type }) => {
                        return (
                            <>
                                <div id={`${ad_type}_${id}`} data-ad-type={ad_type} onClick={STEP_FORWARD_HANDLER} key={id} data-card-id={`${ad_type}_${id}`} className="card">
                                    <div
                                        data-card-id={`${ad_type}_${id}`}
                                        style={{
                                            backgroundImage: `url(${process.env.PUBLIC_URL + ad_type_img})`
                                        }} className="img">
                                    </div>
                                    <h2 data-card-id={`${ad_type}_${id}`}>{ad_type_name}</h2>
                                    <p data-card-id={`${ad_type}_${id}`}>{ad_type_desc}</p>
                                </div>
                            </>
                        )
                    })
                }
            </div>
        </div>
    )
}


