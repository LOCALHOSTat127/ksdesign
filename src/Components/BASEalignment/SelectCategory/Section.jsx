import React from 'react'
import "./style.css";
import { useNavigate } from 'react-router-dom';
import { Section as CategoryList } from "../../Hero-Categoty/Section";


export const Section = () => {
    let navigate = useNavigate();
    const alerrt = (e) => {
        navigate(`/ad/select/adtype?cat_id=${e.target.offsetParent.dataset.cid}&cat_name=${e.target.offsetParent.dataset.cname}`);
    }

    return (
        <section className="select__ad__category">
            <div className="text__heading">
                <h2 className="heading">Select AD Category</h2>
                <p className='pera'>Select Category which best suets your needs.</p>

            </div>

            <div className="category__list">
                <CategoryList padZero={1} ONCLICKHANDLER={alerrt} headingNone={1} mt={10} borderRadious={4} />
            </div>
        </section>
    )
};

