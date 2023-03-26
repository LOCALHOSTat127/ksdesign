import React from 'react'
import "./style.css";
import { Section as CategoryList } from "../../Hero-Categoty/Section";


export const Section = () => {

    const alerrt = (e) =>{
        alert(e.target.offsetParent.dataset.cname);
    }

    return (
        <section className="select__ad__category">
            <h2 className="heading">Select AD category</h2>
            <p className='pera'>Select Category which best suets your needs.</p>

            <div className="category__list">
                <CategoryList padZero={1} ONCLICKHANDLER={alerrt} headingNone={1} mt={10} borderRadious={4} />
            </div>
        </section>
    )
};

